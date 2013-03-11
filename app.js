var express = require('express'),
    routes = require('./routes'),
    conf = require('./conf'),
    db = require('./db'),
    repl = require('repl'),
    passport = require('passport');

function run(opts) {
    var app = express(),
        port = opts.port || conf.ports.server;
       
    app.configure(function() {
        app.use(express.bodyParser()),
        app.use(express.static(conf.dirs.client));
        app.use(express.methodOverride());
        app.use(express.cookieParser("Insert Cookie Code"));
        app.use(express.session());
        app.use(passport.initialize());
        app.use(passport.session());

        db.init(passport);
        routes.bind(app, passport);
    });
    app.listen(port);

    console.log("INFO: Running server on:", port);

/* used for debugging so we'll turn it off
    setTimeout(function(){
        repl.start(
            {
                prompt:">>", 
                input: process.stdin, 
                output: process.stdout
            }).context.utils = utils;
    }, 1000);
*/
}

module.exports = {
    run: run
};;
