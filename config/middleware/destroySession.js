module.exports = function(req, res, next) {
    req.logOut();
    req.session.destroy();
    res.redirect("/");
}