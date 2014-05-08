var _ = require('lodash');
var vow = require('vow');
var console = require('console');

var dal = require('./dal');

var Point = require('../Point');
var user = require('../user');

var list = {};
var cache = {};

var MAX_POINTS = 5;

/**
 * Добавить новый пункт в список дел
 * @param {Point} newPoint
 * @returns {vow.Promise} resolve with {Point}
 */
list.addPoint = function (newPoint) {
    console.log('list / addPoint', newPoint);

    return new vow.Promise(function (resolve, reject) {
        if (!(newPoint instanceof Point)) {
            reject('Invalid argument');
            return;
        }

        list.getPoints()
            .then(function (points) {
                if (points.length >= MAX_POINTS) {
                    reject('Max list size');
                    return;
                }

                dal.addPoint(user, newPoint)
                    .then(function (newPoint) {
                        points.push(newPoint);

                        console.log('list / addPoint: resolve', cache.points);
                        resolve(newPoint);
                    }, reject);
            }, reject);
    });
}

/**
 * Отметить пункт как выполненный
 * @param {String} pointId
 * @returns {vow.Promise}
 */
list.checkPoint = function (pointId) {
    console.log('list / checkPoint', pointId);

    return new vow.Promise(function (resolve, reject) {
        if (!pointId) {
            reject('Empty point id');
        }

        list.getPoints()
            .then(function (points) {
                var point = _.find(points, function (p) {
                    return p.getId() === pointId;
                });

                if (!point) {
                    reject('Point not found');
                    return;
                }

                dal.checkPoint(user, point)
                    .then(function () {
                        point.check();

                        console.log('list / checkPoint: resolve', cache.points);
                        resolve();
                    }, reject);
            }, reject);
    });
}

/**
 * Получить все пункты в списке
 * @returns {vow.Promise} resolve with {Point[]}
 */
list.getPoints = function () {
    console.log('list / getPoints');

    return new vow.Promise(function (resolve, reject) {
        var userId = user.getId();

        if (_.isArray(cache[userId])) {
            resolve(cache[userId]);
            return;
        }

        dal.getPoints(user)
            .then(function (points) {
                cache[userId] = points;

                console.log('list / getPoints: resolve', cache[userId]);
                resolve(points);
            }, reject);
    });
}

module.exports = list;