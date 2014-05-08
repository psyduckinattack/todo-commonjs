(function () {
    var console = require('console');
    var _ = require('lodash');

    var list = require('../modules/list');
    var Point = require('../modules/Point');

    var listContainer = document.getElementById('todo_list');
    var newPointContainer = document.getElementById('todo_new_point_description');

    var tmpl = '<ul>'
        + '<% _.forEach(points, function(point) { %>'
        + '<li data-id="<%- point.getId() %>" data-checked="<%- point.getIsChecked() ? 1 : \'\' %>" class="<% if (point.getIsChecked()) { %>todo_point_checked <% }; %>">'
        + '<%- point.getDescription() %>'
        + '</li><% }); %>'
        + '</ul>';

    var todo = {
        addPoint: function (description) {
            var point = new Point({
                description: description
            });

            list.addPoint(point)
                .then(todo.render, todo.error);
        },
        checkPoint: function (pointId) {
            list.checkPoint(pointId)
                .then(todo.render, todo.error);
        },
        render: function () {
            list.getPoints()
                .then(function (points) {
                    listContainer.innerHTML = _.template(tmpl, { points: points });
                });
        },
        error: function (err) {
            alert(err);
        }
    };

    newPointContainer.addEventListener('keyup', function (ev) {
        if (ev.keyCode == 13 && ev.ctrlKey && newPointContainer.value) {
            todo.addPoint(newPointContainer.value);
            newPointContainer.value = '';
        }
    });

    listContainer.addEventListener('click', function (ev) {
        var targetData = ev.target.dataset;

        if (!targetData.checked) {
            console.debug(targetData.checked);
            todo.checkPoint(targetData.id);
        }
    });

    todo.render();

})();