var User = require('../models/user').User;

var self = {
    create: function(username, password, callback) {
        console.log(username, password);
        User.register(new User({ username : username}), password, function(err, user) {
                if (err) {
                    console.log("ERROR SAVING:", err);
                    callback(err);
                }

                callback(null, user);
            });
    },

    findUserByUsername: function(username, callback) {
        User.findByUsername({username: username}, function(err, user) {
            if (err)
                callback(err);
            else
                callback(null, user);
        });
    }
};

module.exports = self;
