const path = require('path');
const users = require('../routes/users');
const auth = require('../routes/auth')
const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.static('public'));
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}