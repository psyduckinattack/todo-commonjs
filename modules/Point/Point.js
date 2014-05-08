/**
 * Пункт списка дел
 * @param {Object} params
 * @param {String} params.description
 * @param {String} [params.id]
 * @param {Boolean} [params.isChecked]
 * @constructor
 */
function Point(params) {
    if (!params.description) {
        throw 'Invalid argument';
    }

    this._id = params.id;
    this._description = params.description;
    this._isChecked = Boolean(params.isChecked);
}

Point.prototype.toJSON = function () {
    return {
        id: this._id,
        description: this._description,
        isChecked: this._isChecked
    };
}

/**
 * @param {String} id
 */
Point.prototype.setId = function (id) {
    if (!id) {
        throw 'Invalid argument';
    }
    this._id = id;
}

/**
 * @returns {String}
 */
Point.prototype.getId = function () {
    return this._id;
}

Point.prototype.check = function () {
    this._isChecked = true;
}

Point.prototype.uncheck = function () {
    this._isChecked = false;
}

/**
 * @returns {Boolean}
 */
Point.prototype.getIsChecked = function () {
    return this._isChecked;
}

/**
 * @returns {String}
 */
Point.prototype.getDescription = function () {
    return this._description;
}

module.exports = Point;