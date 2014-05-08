var app = require('../../../app');

module.exports = {

    /**
     * @returns {String}
     */
    getId: function () {
        return app.get('userId');
    }

};