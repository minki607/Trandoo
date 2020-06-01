
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose');
const Translate = mongoose.model('translation')


module.exports = app => {

    app.get('/api/translate', async (req,res) => {
        const translations = await Translate.find({})
        res.send(translations)
    })

    app.get('/api/translate/view/:id', async (req,res) => {
        let id = req.params.id
        const translation = await Translate.findById(id)
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