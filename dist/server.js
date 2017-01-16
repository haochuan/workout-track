'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// webpack
var app = (0, _express2.default)();

// const router = express.Router({
// 	caseSensitive: app.get('case sensitive routing'),
// 	strict: app.get('strict routing')
// });

/*===========================================
=            Baic Authentication            =
===========================================*/

// app.use(require('node-basicauth')({'haochuan': 'password'}));

/*=====  End of Baic Authentication  ======*/

/*===========================
=            COR            =
===========================*/

// app.use(require('cors')());

/*=====  End of COR  ======*/

app.use((0, _morgan2.default)('tiny'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, "../favicon.ico")));
// app.use(router);

var port = isProduction ? process.env.PORT : 3000;
var isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
	(function () {
		var compiler = (0, _webpack2.default)(_webpack4.default);
		var webpackMiddleware = (0, _webpackDevMiddleware2.default)(compiler, {
			publicPath: _webpack4.default.output.publicPath,
			quite: true,
			contentBase: 'src',
			stats: {
				colors: true,
				hash: false,
				timings: true,
				chunks: false,
				chunkModules: false,
				modules: false
			}
		});

		app.use(webpackMiddleware);
		app.use((0, _webpackHotMiddleware2.default)(compiler));
		app.get('/', function response(req, res) {
			res.write(webpackMiddleware.fileSystem.readFileSync(_path2.default.join(__dirname, '../frontend/dist/index.html')));
			res.end();
		});
	})();
} else {
	app.use(_express2.default.static(_path2.default.join(__dirname, '../frontend/build')));
	app.get('/', function response(req, res) {
		res.sendFile(_path2.default.join(__dirname, '../frontend/build/index.html'));
	});
}

var server = app.listen(port, function () {

	var host = server.address().address;
	var port = server.address().port;

	var envString = isProduction ? "Production" : "Development";

	console.log(envString + ' server listening at http://%s:%s', host, port);
});

// Routes
app.use('/', _routes2.default);
//# sourceMappingURL=server.js.map