function bind(app, passport) {
    //Put all routes in here
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(null)
}

module.exports = {
    bind: bind,
};

