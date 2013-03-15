define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pages/HomeView.html',
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    initialize: function() {
        this.subviews = [];
    },

    render: function(){
      this.$el.html(homeTemplate);
    }

  });

  return HomeView;
  
});
