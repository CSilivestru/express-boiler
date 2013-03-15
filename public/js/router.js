// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/pages/HomeView',
  'views/pages/SignInView',
  'views/partials/HeaderView',
  'views/partials/FooterView'
], function($, _, Backbone, HomeView, SignInView, HeaderView, FooterView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'signin',
      'home': 'home'
    },

    initialize: function() {
        this.mainEl = $("#content");
        var headerView = new HeaderView({el: $("#header")});
        headerView.render();
        var footerView = new FooterView();
        footerView.render();

        this.bind("all", this.checkAuth);
    },

    signin: function (id) {
        var signinView = new SignInView({el: this.mainEl, router: this});
        AppView.showView(signinView);
    },

    home: function() {
        console.log("ROUTE HIT");
        var homeView = new HomeView({el: this.mainEl});
        AppView.showView(homeView);
    },

    checkAuth: function(eventString) {
        switch (eventString) {
            case ("route:registration"):
            case ("route:signin"):
                //No need to auth on these routes
                break;
            default:
                var that = this;
                $.ajax({
                    type: "GET",
                    url: "/api/user/checkAuth",
                    success: function(user) {
                        if (!user) {
                            alert("You are not signed in!");
                            that.navigate('');
                        }
                        else
                            window.user = user;
                    },
                    error: function(err) { console.log(err); }
                });
        }
    }

  });

  var AppView = {
      currentView: null,
      previousView: null,
      showView: function(view) {
          if (this.currentView)
              this.previousView = this.currentView;

          this.currentView = view;

          if (this.previousView){
              this.previousView.close();
          }
          //This uses the el set in the view when we initialize it. AppView is here only to swap entire views.
          this.currentView.render();
      }
  }

  var initialize = function(){
    var router = new AppRouter;
    Backbone.history.start();
  };

  return { 
    initialize: initialize
  };
});
