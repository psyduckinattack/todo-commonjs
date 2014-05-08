var express = require('express');
var router = express.Router();

router.param(function(name, fn){
    if (fn instanceof RegExp) {
        return function(req, res, next, val){
            var captures;
            if (captures = fn.exec(String(val))) {
                req.params[name] = captures;
                next();
            } else {
                next('route');
            }
        }
    }
});

router.param('module', /^list$/);

router.post('/list/addPoint', function (req, res, next) {
    var Point = require('../modules/Point'),
        point;

    req.apiParams = [];

    try {
        point = new Point(JSON.parse(req.param('point')));
        req.apiParams.push(point);
    } catch (e) {}

    next();
});

router.post('/list/checkPoint', function (req, res, next) {
    req.apiParams = [req.param('pointId')];

    next();
});

router.use('/:module/:method', function (req, res) {
    var module = require('../modules/' + req.params.module),
        method = module[req.params.method];

    if (!method) {
        res.send(405);
        return;
    }

    method.apply(module, req.apiParams)
        .then(function (data) {
            res.json(data);
        }, function (err) {
            res.send(400, JSON.stringify(err));
        });
});

module.exports = router;
