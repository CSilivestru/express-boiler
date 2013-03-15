
module.exports = {
    load: function() {
        var userDAL = require("./access/userdal");
        userDAL.create("chris", "password", function(user) {console.log(user);});
    }
};
