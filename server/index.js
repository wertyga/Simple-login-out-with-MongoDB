import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.dev.config';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';

import ValidateInput from '../client/components/common/ValidateInput';
import User from './models/User';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/SimpleLoginApp');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('success connect to MongoDB')
});
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configJwt from './configJwt';


const app = express();
let compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.post('/new-user', (req, res) => {
    let {isValid, errors} = ValidateInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
        return;
    };
    const {name, email, password} = req.body;
    const  password_digest = bcrypt.hashSync(password, 10);

   User.find({ $or: [{name: req.body.name}, {email: req.body.email}] })
       .then(result => {
           if(result.length > 0) {
               let errors = {};
               result.forEach(item => {
                   if(item.name === req.body.name) errors.name = 'Name already exist';
                   if(item.email === req.body.email) errors.email = 'E-mail already exist';
                   res.status(400).json(errors)
               });
           } else {
               let user = new User({name, email,  password_digest});
               user.save().then(result => {
                   let token = jwt.sign({
                       id: user._id,
                       name: user.name
                   }, configJwt.configJwt);
                   res.json({token});
               }).catch(err => res.status(500).json({ global: 'Cant save new user' }))
           }
       }).catch(err => res.status(500).json({ global: 'Cant connect to DataBase' }));
});

app.post('/login', (req, res) => {
    let {isValid, errors} = ValidateInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
        return;
    };

    const {name, password} = req.body;
    User.find({ $or: [{name: name}, {email: name}] })
        .then(result => {
            if(result.length > 0) {
                result.forEach(user => {
                    if(bcrypt.compareSync(password, user.password_digest)) {
                        let token = jwt.sign({
                            id: user._id,
                            name: user.name
                        }, configJwt.configJwt);
                        res.json({token});
                    } else {
                        res.status(401).json({password: 'Password is not correct'})
                    }
                })
            } else {
                res.status(401).json({ global: 'This user is not exist' })
            }
        }).catch(err => res.status(500).json({ global: 'Cant connect to DataBase' }))
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});


app.listen(3000, () => console.log('Server run on 3000 port'));





