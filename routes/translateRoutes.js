
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose');
const Tag = mongoose.model('tag')
const Translate = mongoose.model('transRequest')
const qs = require('qs');


module.exports = app => {

    app.get('/api/translate', async (req, res) => {
        try {
            const { page, perPage } = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10,
                populate: 'answers'
            }
            const translations = await Translate.paginate({}, options)
            res.send(translations)
        } catch (err) {
            return res.status(500).send(err)
        }


    })

    app.get('/api/translate/view/:id', async (req, res) => {
        let id = req.params.id
        const translation = await Translate.findById(id).populate({
            path: 'answers', populate: [{
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: '_user',
                    model: 'users'
                }
            }, {
                path: '_user',
                model: 'users'
            }]
        }).populate('_user')
        res.send(translation)
    })

    app.get('/api/query/:query', async (req, res) => {

        try {
            const { page, perPage } = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 20,
            }

            var tagQuery = req.params.query.match(/\[(.*?)\]/);
            var languageRegex = /\s*->\s*/
            //check if query contains []. if it does, do a tag regex search
            if (tagQuery) {
                var tagValue = tagQuery[1];
                const tagResult = await Translate.paginate({ tags: { $elemMatch: { name: { $regex: tagValue, $options: "$i" } } } })
                res.send(tagResult)
            }
            else if (languageRegex.test(req.params.query)) {
                const language = req.params.query.split(languageRegex)
                const original = language[0]
                const target = language[1]
                const languageResult = await Translate.paginate({
                    $or: [
                        //search by name or
                        {
                            $and: [{ 'originalLanguage.name': { $regex: original, $options: "$i" } },
                            { 'targetLanguage.name': { $regex: target, $options: "$i" } }]
                        },

                        //search by code or
                        {
                            $and: [{ 'originalLanguage.code': { $regex: original, $options: "$i" } },
                            { 'targetLanguage.code': { $regex: target, $options: "$i" } }]
                        },

                        //seary by native name
                        {
                            $and: [{ 'originalLanguage.nativeName': { $regex: original, $options: "$i" } },
                            { 'targetLanguage.nativeName': { $regex: target, $options: "$i" } }]
                        }
                    ]

                })

                res.send(languageResult)

            } else {
                const result = await Translate.paginate({ '$or': [{ title: new RegExp(req.params.query, 'i') }, { body: new RegExp(req.params.query, 'i') }] }, options)
                res.send(result)
            }

        } catch (err) {
            return res.status(500).send(err)
        }



    })

    app.get('/api/translate/today', async (req, res) => {

        var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        try {
            const { page, perPage } = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 20,
            }
            const todayList = await Translate.paginate({ dateSent: { $gte: start, $lt: end } }, options)
            res.send(todayList)
        } catch (err) {
            return res.status(500).send(err)
        }


    })

    app.get('/api/translate/recommended', async (req,res) => {
        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 3 ,
            }

            const language = req.user.prefLanguage
            let condition = []
            
            language.forEach((langSet) => {
                let targetLanguage = langSet.translate.map(lang => lang.name)
        
                condition.push({
                    $and: [
                        {
                          'originalLanguage.name': langSet.title.name         
                        },
                        {
                          'targetLanguage.name': {$in: targetLanguage}
                        }    
                    ]
                })
            })

            const recommendedList = await Translate.paginate({$or: condition}, options)
            res.send(recommendedList)

        } catch (err) {
            return res.status(500).send(err)
        }       
    })


    app.get('/api/translate/recommended/:filter', async (req,res) => {
        try {
      
            const queryString = qs.parse(req.params.filter) 
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 9 ,
            }
            let condition = []

        
                queryString.languageSet.translate.forEach((target) => {
            
                condition.push({
                    $and: [
                        {
                          'originalLanguage.name': queryString.languageSet.title.name         
                        },
                          {'targetLanguage.name' : target.name}
                    ]
                })
                })

            const recommendedList = await Translate.paginate({$or: condition}, options)
            res.send(recommendedList)

        } catch (err) {
            return res.status(500).send(err)
        }       
    })

    app.post('/api/translate', requireLogin, async (req, res) => {
        const { title, originalLanguage, targetLanguage, completeIn, body, tags } = req.body

        const translation = new Translate({
            title,
            body,
            originalLanguage,
            targetLanguage,
            completeIn,
            tags,
            dateSent: Date.now()
        })

        try {
            translation._user = req.user._id

            await translation.save()
            //req.user.credits -=1; 
            const user = await req.user.save()
            res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
    })

    app.get('/api/tags', async (req, res) => {
        const tag = await Tag.find({})
        res.send(tag)
    })

    app.post('/api/tags', async (req, res) => {
        const { name, description } = req.body

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
    app.get('/api/tagpost/:name', async (req, res) => {
        let name = req.params.name
        const tagpost = await Translate.find({ tags: { $elemMatch: { name } } })
        res.send(tagpost)
    })

}