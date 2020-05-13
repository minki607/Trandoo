module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/google')
    }
    else return next();
}