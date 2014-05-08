var storage = require('../../dal/browser/sessionStorage');

var key = 'todo_user_id';

/**
 * Сгенерировать случайный id
 * @returns {String}
 */
function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var i;

    for (i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

module.exports = {

    /**
     * @returns {String}
     */
    getId: function () {
        var userId = storage.get(key);

        if (!userId) {
            userId = makeId();
            storage.set(key, userId);
        }

        return userId;
    }

};