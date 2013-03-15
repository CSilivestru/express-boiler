var jWorkflow = require('jWorkflow'),
    mongoose = require('mongoose'),
    bootstrap = require("./bootstrap"),
    passport,
    LocalStrategy = require('passport-local').Strategy,
    User,
    Setting,
    isMappedAlready;

function createDb(initialValue, baton) {
    baton.take();
    passport = initialValue;
    isMappedAlready = false;

    //Heroku sets the process.env.PORT variable. If it's undefined, it means we're running locally
    //so connect to the local mongo instance.
    var connectionString = 
        process.env.MONGOLAB_URI || 
        process.env.MONGOHQ_URL || 
        'mongodb://localhost/frontier';

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

function createModels (previous, baton) {
    baton.take();
    Setting = require("./models/setting").Setting;
    User = require("./models/user").User;
    baton.pass();
}

function initSettings (previous, baton) {
    baton.take();
    that = this;
    Setting.findOne({type: "init"}, function(err, item) {
        if (err) {
            console.log("Error finding init setting");
            baton.drop();
        }
        else if (item && item.value == "true") {
            console.log("Connected to database and ready");
            that.isMappedAlready = true;
            baton.pass();
        }
        else {
            console.log("Blank slate -- initializing...");
            Setting.create({type: "init", value: true}, function(err, setting) {
                if (err) {
                    console.log("Error setting init value: ", err);
                    baton.drop();
                }
                else
                    baton.pass();
            });
        }
    });
}

function initPassport (previous, baton) {
    baton.take();
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

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

/*-------PUBLIC METHODS-------*/

var self = {
    init: function(passport) {
        try {
            console.log("STARTING");
            var initWorkflow = jWorkflow.order(createDb)
                .andThen(createModels)
                .andThen(initSettings)
                .andThen(initPassport)
                .andThen(mapData); //Include if you need to bootstrap data, remove otherwise

            initWorkflow.start({initialValue: passport}); //Get rid of passport if not using auth
        }
        catch(e) {
            //OMG WTF Whahappened?
            console.log(e);
        }
    },

    getMongoose: function() {
        return mongoose;
    }
};

module.exports = self;
