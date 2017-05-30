'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDev = require('../webpack.dev.config');

var _webpackDev2 = _interopRequireDefault(_webpackDev);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ValidateInput3 = require('../client/components/common/ValidateInput');

var _ValidateInput4 = _interopRequireDefault(_ValidateInput3);

var _User = require('./models/User');

var _User2 = _interopRequireDefault(_User);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _configJwt = require('./configJwt');

var _configJwt2 = _interopRequireDefault(_configJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');

_mongoose2.default.connect('mongodb://localhost/SimpleLoginApp');
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('success connect to MongoDB');
});


var app = (0, _express2.default)();
var compiler = (0, _webpack2.default)(_webpackDev2.default);

app.use((0, _webpackDevMiddleware2.default)(compiler, {
    hot: true,
    publicPath: _webpackDev2.default.output.publicPath,
    noInfo: true
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));
app.use(_bodyParser2.default.json());

app.post('/new-user', function (req, res) {
    var _ValidateInput = (0, _ValidateInput4.default)(req.body),
        isValid = _ValidateInput.isValid,
        errors = _ValidateInput.errors;

    if (!isValid) {
        res.status(400).json(errors);
        return;
    };
    var _req$body = req.body,
        name = _req$body.name,
        email = _req$body.email,
        password = _req$body.password;

    var password_digest = _bcrypt2.default.hashSync(password, 10);

    _User2.default.find({ $or: [{ name: req.body.name }, { email: req.body.email }] }).then(function (result) {
        if (result.length > 0) {
            var _errors = {};
            result.forEach(function (item) {
                if (item.name === req.body.name) _errors.name = 'Name already exist';
                if (item.email === req.body.email) _errors.email = 'E-mail already exist';
                res.status(400).json(_errors);
            });
        } else {
            var user = new _User2.default({ name: name, email: email, password_digest: password_digest });
            user.save().then(function (result) {
                var token = _jsonwebtoken2.default.sign({
                    id: user._id,
                    name: user.name
                }, _configJwt2.default.configJwt);
                res.json({ token: token });
            }).catch(function (err) {
                return res.status(500).json({ global: 'Cant save new user' });
            });
        }
    }).catch(function (err) {
        return res.status(500).json({ global: 'Cant connect to DataBase' });
    });
});

app.post('/login', function (req, res) {
    var _ValidateInput2 = (0, _ValidateInput4.default)(req.body),
        isValid = _ValidateInput2.isValid,
        errors = _ValidateInput2.errors;

    if (!isValid) {
        res.status(400).json(errors);
        return;
    };

    var _req$body2 = req.body,
        name = _req$body2.name,
        password = _req$body2.password;

    _User2.default.find({ $or: [{ name: name }, { email: name }] }).then(function (result) {
        if (result.length > 0) {
            result.forEach(function (user) {
                if (_bcrypt2.default.compareSync(password, user.password_digest)) {
                    var token = _jsonwebtoken2.default.sign({
                        id: user._id,
                        name: user.name
                    }, _configJwt2.default.configJwt);
                    res.json({ token: token });
                } else {
                    res.status(401).json({ password: 'Password is not correct' });
                }
            });
        } else {
            res.status(401).json({ global: 'This user is not exist' });
        }
    }).catch(function (err) {
        return res.status(500).json({ global: 'Cant connect to DataBase' });
    });
});

app.get('/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, 'index.html'));
});

app.listen(3000, function () {
    return console.log('Server run on 3000 port');
});
//# sourceMappingURL=index.js.map