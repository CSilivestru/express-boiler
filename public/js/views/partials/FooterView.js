define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/partials/FooterView.html'
], function($, _, Backbone, headerTemplate){
    var HeaderView = Backbone.View.extend({

        el: $("#footer"),

        render: function () {
            console.log(this.$el);
            this.$el.html(headerTemplate);
        }
    });

    return HeaderView;
});

