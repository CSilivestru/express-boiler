define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/HomeView.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#main"),

    initialize: function() {
        this.subviews = [];
    },

    render: function(){
      this.$el.html(homeTemplate);
    }

  });

  return HomeView;
  
});
