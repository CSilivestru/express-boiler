var self = {
    loginSuccess: function(req, res) {
        console.log("SUCCESS!");
        res.writeHead("200", {
            'Content-Type': 'text/json'
        });
        res.write(JSON.stringify(req.user));
        res.end();
    },

    routeCallback: function(req, res, err, object) {
        if (err) {
            console.log(err);
            res.send(null);
        }
        else {
            req.login(object, function(err) {
                if (err)
                    console.log("ERROR:", err)
                else {
                    res.send(object);
                }
            });
        }
    }
};

module.exports = self;
