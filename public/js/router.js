// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView'
], function($, _, Backbone, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
    }
  });

  var AppView = {
      currentView: null,
      previousView: null,
      showView: function(view, mainEl) {
          if (this.currentView)
              this.previousView = this.currentView;

          this.currentView = view;
          //This uses the el set in the view when we initialize it. AppView is here only to swap entire views.
          this.currentView.render();

          if (this.previousView){
              this.previousView.close();
          }
      }
  }

  var initialize = function(){

    var router = new AppRouter;
    
    router.on('route:index', function(){
        var homeView = new HomeView({el: this.mainEl});
        AppView.showView(homeView, this.mainEl);

    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
