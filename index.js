const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./models/Translate')
require('./models/Tags')
require('./models/Notification')
require('./models/Answer')
require('./models/Comment')
require('./service/passport')


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const app = express();

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, //max 1 day
        keys: [keys.cookieKey]
    })
)

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

// initialize socket 


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/translateRoutes')(app);
require('./routes/answerRoutes')(app)
require('./routes/notificationRoutes')(app)
require('./routes/commentsRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
require('./socket').initialize(server)