var mongoose = require('../index').getMongoose(),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: {type: String, require: true },
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);


module.exports = {
    User: User,
    UserSchema: UserSchema
};

