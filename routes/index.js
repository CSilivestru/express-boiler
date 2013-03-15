function bind(app, passport) {
    var user = require('./user'),
    map = require('./map');

    app.get('/', ensureAuthenticated, function(res, req) {
        res.send(req.user);
    });
    app.post("/api/user", user.create);
    app.get('/api/user/checkAuth', ensureAuthenticated, function(req, res) {res.send(req.user);});
    app.post("/api/user/login", passport.authenticate("local"), user.loginSuccess);
    app.get("/api/map/basic", ensureAuthenticated, map.getBasic);
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
      res.send(null);
}

module.exports = {
    bind: bind,
};

