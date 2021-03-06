define(
    'model/user',
    [
        'backbone',
    ],
    function (Backbone) {
        'use strict';

        var UserModel = Backbone.Model.extend({
            defaults: {
                name: '',
                email: ''
            },

            url: function(){
              return window.location.origin +
                     window.location.pathname + 'api/users';
            }
        });

        return UserModel;
    }
);
