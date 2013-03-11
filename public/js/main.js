var AppRouter = Backbone.Router.extend({
    routes: {
        //Include your routes here.
        //routeName: functionName
    },

    initialize: function () {

    },

    /*Very basic auth
    checkAuth: function(eventString) {
        //I don't like this if statement -- seems smelly...
        switch (eventString) {
            case ("route:registration"):
            case ("route:signin"):
                //No need to auth on these routes
                break;
            default:
                $.ajax({
                    type: "GET",
                    url: "/api/user/checkAuth",
                    success: function(user) {
                        if (!user) {
                            alert("You are not signed in!");
                            Jr.Navigator.navigate('', {
                            trigger: true,
                              animation: {
                                type: Jr.Navigator.animations.SLIDE_STACK,
                                direction: Jr.Navigator.directions.LEFT
                              }
                            });
                        }
                        else
                            window.user = user;
                    },
                    error: function(err) { console.log(err); }
                });
        }
    }*/
});

utils.loadTemplate([], function() {
    app = new AppRouter();
    Backbone.history.start();
});

Backbone.View.prototype.close = function(){
      this.remove();
      this.unbind();
}
