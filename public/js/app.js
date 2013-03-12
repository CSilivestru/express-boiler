// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  Backbone.View.prototype.close = function(){
      this.$el.remove();
      this.unbind();
      _.each(this.subviews, function(subview){
          if (subview.close){
              subview.close();
          }
      });
  };

  return { 
    initialize: initialize
  };
});
