
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose');
const Translate = mongoose.model('translation')


module.exports = app => {

    app.get('/api/translate', async (req,res) => {
        const translation = await Translate.find({})
        res.send(translation)
    })

    app.post('/api/translate', requireLogin, requireCredits, async (req, res) => {
        const {title, language, completeIn, body } = req.body

        const translation = new Translate({
            title,
            language,
            completeIn,
            body,
            _user: req.user.id,
            dateSent: Date.now()
        })
        
        try {
            await translation.save();
            req.user.credits -=1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err)
        }
    })

}