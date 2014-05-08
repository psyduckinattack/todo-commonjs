var vow = require('vow');
var _ = require('lodash');

/**
 * Выполнить запрос к REST API
 * @param {String} moduleName - вызываемый модуль
 * @param {String} methodName - вызываемый метод
 * @param {Object} params - параметры запроса
 * @param {String} method - тип запроса
 * @returns {vow.Promise} resolve with {Object} xhr.response
 */
module.exports.request = function (moduleName, methodName, params, method) {
    var url = '/api/' + moduleName + '/' + methodName + '/?',
        paramsData = null;

    if (_.isObject(params)) {
        paramsData = _.map(params, function (param, paramName) {
            return paramName + '=' + encodeURIComponent(param);
        }).join('&');
    }

    if (method !== 'POST' && paramsData) {
        url += paramsData;
        paramsData = null;
    }

    return new vow.Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.onload = function() {
            if(xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.response || xhr.statusText);
            }
        };

        xhr.send(paramsData);
    });
}