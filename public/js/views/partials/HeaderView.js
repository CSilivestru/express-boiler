define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/partials/HeaderView.html'
], function($, _, Backbone, headerTemplate){
    var HeaderView = Backbone.View.extend({

        render: function () {
            console.log(this.$el);
            this.$el.html(headerTemplate);
        }
    });

    return HeaderView;
});
