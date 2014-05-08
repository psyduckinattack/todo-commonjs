var _ = require('lodash');

var rest = require('../../dal/browser/rest');

var Point = require('../../Point');

module.exports = {

    /**
     * @param {User} user
     * @returns {vow.Promise} resolve with {Point[]}
     */
    getPoints: function (user) {
        return rest.request('list', 'getPoints', {userId: user.getId()}, 'GET')
            .then(function (points) {
                return _.map(points, function (point) {
                    return new Point(point);
                });
            });
    },

    /**
     * @param {User} user
     * @param {Point} point
     * @returns {vow.Promise} resolve with {Point}
     */
    addPoint: function (user, point) {
        var requestParams = {
            userId: user.getId(),
            point: JSON.stringify(point)
        };

        return rest.request('list', 'addPoint', requestParams, 'POST')
            .then(function (point) {
                return new Point(point);
            });
    },

    /**
     * @param {User} user
     * @param {Point} point
     * @returns {vow.Promise}
     */
    checkPoint: function (user, point) {
        var requestParams = {
            userId: user.getId(),
            pointId: point.getId()
        };

        return rest.request('list', 'checkPoint', requestParams, 'POST');
    }

};