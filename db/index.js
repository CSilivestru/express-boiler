var jWorkflow = require('jWorkflow'),
    mongoose = require('mongoose'),
    bootstrap = require("./bootstrap"),
    passport,
    LocalStrategy = require('passport-local').Strategy,
    User,
    Setting,
    isMappedAlready;

var MONGOURL = "mongodb://heroku:rush@ds035147.mongolab.com:35147/heroku_app11055689";


function createDb(initialValue, baton) {
    baton.take();
    passport = initialValue;
    isMappedAlready = false;

    //Heroku sets the process.env.PORT variable. If it's undefined, it means we're running locally
    //so connect to the local mongo instance.
    var connectionString = 
        process.env.MONGOLAB_URI || 
        process.env.MONGOHQ_URL || 
        'mongodb://localhost/rush';

    var theport = process.env.PORT || 5000;
    var mongoOptions = { db: { safe: true }};
    console.log("Attempting to connect with connection string: " + connectionString);

    mongoose.connect(connectionString,  mongoOptions, function(err, result) {
         if (err) { 
            console.log ('ERROR connecting to: ' + connectionString + '. ' + err);
          } else {
            console.log ('Succeeded connected to: ' + connectionString);
          }
       });
    baton.pass();
}

function initPassport (previous, baton) {
    baton.take();
    //The next three lines are designed for user authentication using mongodb with passport. It's quick, simple, and *reasonably* secure.
    /*passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser()); */

    baton.pass();
}

function mapData(previous, baton) {
    baton.take();
    try {
        if (!this.isMappedAlready)
            bootstrap.load();
        baton.pass();
    }
    catch(e) {
        console.log("SERIOUS Error: Cannot map data...");
        console.log(e);
        baton.drop();
    }
}

function initDB(passport) {
    try {
        console.log("STARTING");
        var initWorkflow = jWorkflow.order(createDb)
            .andThen(initPassport) //Remove if not using passport
            //include any other bootstraping you need to do here
            .andThen(mapData); //Include if you need to bootstrap data, remove otherwise

        initWorkflow.start({initialValue: passport}); //Get rid of passport if not using auth
    }
    catch(e) {
        //OMG WTF Whahappened?
        console.log(e);
    }
}

module.exports = {
    init: initDB,
    getMongoose: function() {
        return mongoose;
    }
};
