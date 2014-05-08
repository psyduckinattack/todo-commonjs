module.exports.set = function () {
    sessionStorage.setItem.apply(sessionStorage, arguments);
}

module.exports.get = function () {
    return sessionStorage.getItem.apply(sessionStorage, arguments);
}