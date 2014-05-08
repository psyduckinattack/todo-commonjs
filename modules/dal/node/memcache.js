var vow = require('vow');
var _ = require('lodash');

var memcache = require('memcache');
var client = new memcache.Client(21201, 'localhost');

var clientDefer = new vow.Promise(function(resolve, reject) {
    client
        .on('connect', resolve)
        .on('close', reject)
        .on('timeout', reject)
        .on('error', reject)
        .connect();
});

/**
 * Выполнить запрос к Memcache
 * @see {@link https://github.com/elbart/node-memcache#usage}
 * @param {String} clientMethod
 * @param {String} key
 * @param {*} [value]
 * @returns {vow.Promise} resolve with {String}
 */
function request(clientMethod, key, value) {
    var requestParams = [key];

    if (!_.isUndefined(value)) {
        requestParams.push(value);
    }

    return new vow.Promise(function (resolve, reject) {
        requestParams.push(function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

        clientDefer.then(function () {
            client[clientMethod].apply(client, requestParams);
        }, reject);
    });
}

/**
 * Установить значение для ключа
 * @param {String} key
 * @param {*} value
 * @returns {vow.Promise}
 */
module.exports.set = function (key, value) {
    return request('set', key, value);
}

/**
 * Получить значение по ключу
 * @param {String } key
 * @returns {vow.Promise} resolve with {String}
 */
module.exports.get = function (key) {
    return request('get', key);
}