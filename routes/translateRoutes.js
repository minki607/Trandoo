
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose');
const Tag = mongoose.model('tag')
const Translate = mongoose.model('transRequest')




module.exports = app => {

    app.get('/api/translate', async (req,res) => {
        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 20 ,
            }
            const translations = await Translate.paginate({}, options)
            res.send(translations)
        } catch (err) {
            return res.status(500).send(err)
        }
       
        
    })

    app.get('/api/translate/view/:id', async (req,res) => {
        let id = req.params.id
        const translation = await Translate.findById(id)
        res.send(translation)
    })

    app.get('/api/query/:query', async (req,res) => {

        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 20 ,
            }
            const result = await Translate.paginate({'$or':[{title:new RegExp(req.params.query,'i')},{body:new RegExp(req.params.query,'i')}]}, options)
            res.send(result)
        } catch (err) {
            return res.status(500).send(err)
        }
       
        
       
    })

    app.post('/api/translate', requireLogin, async (req, res) => {
        const {title, language, completeIn, body, tags} = req.body
    
        const translation = new Translate({
            title,
            body,
            language,
            completeIn,
            tags,
            dateSent: Date.now()
        })
        
        try {
            await translation.save()
            //req.user.credits -=1; 
            const user = await req.user.save()
            res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
    })

    app.get('/api/tags', async (req,res) => {
        const tag = await Tag.find({})
        res.send(tag)
    })

    app.post('/api/tags', async (req, res) => {
        const { name, description} = req.body

        const tag = new Tag({
            name,
            description
        })
        
        try {
            await tag.save();
            res.send(tag);
        } catch (err) {
            res.status(422).send(err)
        }
    })
   //find all post which contains the tag
    app.get('/api/tagpost/:name', async (req,res) => {
        let name = req.params.name
        const tagpost = await Translate.find({tags: {$elemMatch: {name}}})
        res.send(tagpost)
    })

}