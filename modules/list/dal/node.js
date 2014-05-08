var _ = require('lodash');

var memcache = require('../../dal/node/memcache');

var Point = require('../../Point');

/**
 * Получить ключ для списка указанного пользователя
 * @param {User} user
 * @returns {String}
 */
function getListKey(user) {
    return 'list_' + user.getId();
}

module.exports = {

    /**
     * @param {User} user
     * @returns {vow.Promise} resolve with {Point[]}
     */
    getPoints: function (user) {
        return memcache.get(getListKey(user))
            .then(function (points) {
                if (points) {
                    try {
                        points = _.map(JSON.parse(points), function (point) {
                            return new Point(point);
                        });
                    } catch (e) {
                        points = [];
                    }
                } else {
                    points = [];
                }
                return points;
            });
    },

    /**
     * @param {User} user
     * @param {Point} point
     * @returns {vow.Promise} resolve with {Point}
     */
    addPoint: function (user, point) {
        return this.getPoints(user)
            .then(function (points) {
                point.setId('point_' + (new Date().getTime()));
                points.push(point);

                return memcache.set(getListKey(user), JSON.stringify(points))
                    .then(function () {
                        return point;
                    });
            });
    },

    /**
     * @param {User} user
     * @param {Point} point
     * @returns {vow.Promise}
     */
    checkPoint: function (user, point) {
        return this.getPoints(user)
            .then(function (points) {
                var p = _.find(points, function (p) {
                    return p.getId() === point.getId();
                });

                if (!p) {
                    throw 'Point not found';
                }

                p.check();
                return memcache.set(getListKey(user), JSON.stringify(points));
            });
    }

};