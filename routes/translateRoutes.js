
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys')


module.exports = (app) => {
    app.post('/translate', requireLogin, async (req, res) => {
    })
}