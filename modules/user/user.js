var dal = require('./dal');

function User() {

}

/**
 * @returns {String}
 */
User.prototype.getId = function () {
    return dal.getId();
}

module.exports = new User();