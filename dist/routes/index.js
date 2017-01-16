'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var routes = (0, _express.Router)();

routes.get('/test', function (req, res) {
  res.end('test');
});

exports.default = routes;
//# sourceMappingURL=index.js.map