define(
    'view/friend',
    [
        'jquery',
        'backbone',
        'model/friend',
        'view/ui'
    ],
    function ($, Backbone, FriendModel, Ui) {
        'use strict';

        var FriendView = Backbone.View.extend({
            el: '.friends',

            events: {
                'keyup input'  : 'disabledSubmit',
                'submit'       : 'inviteFriend',
                'click .close' : 'hideInviteConfirmation'
            },

            initialize: function(){
                this.friend = new FriendModel();
                this.ui = new Ui();
            },

            resetForm: function(context){
                context.$('.an-input').each(function(){
                    $(this).val('');
                });
            },

            disabledSubmit: function(){
                var name = this.$('[name="friend-name"]').val()
                ,  email = this.$('[name="friend-email"]').val();

                if (name != '' && email != '') {
                    this.$('[type="submit"]').removeAttr('disabled');
                }
            },

            showInviteConfirmation: function(){
                this.ui.showOverlay();
                this.$('.an-invites').removeClass('hide');
            },

            hideInviteConfirmation: function(e){
                this.ui.hideOverlay();
                this.ui.gotoSection('footer', 'descomplique');
                this.$('.an-invites').addClass('hide');

                e.preventDefault();
            },

            inviteFriend: function(e){
                if (this.$('[name="spider"]').val() != '') return false;

                var hasError = false;
                for(var i= 2; i<=5; i++) {
                    if($("[name='friend-email-" + i + "']").val() != "") {
                        if($("[name='friend-email-" + i + "']").val() != undefined) {
                            if($("[name='friend-name-" + i + "']").val() === undefined || $("[name='friend-name-" + i + "']").val() == '') {
                                hasError = true;
                            }
                        }
                    }
                }

                if(hasError) {
                    alert("Informe nome e e-mail para enviar.");
                    return false;
                }

                var $this = this;
                var fieldsForm = {
                    "id_friend": $('.abc').val(),
                    "friends": [
                        {
                            "name": this.$('[name="friend-name"]').val(),
                            "email": this.$('[name="friend-email"]').val()
                        },
                        {
                            "name": this.$('[name="friend-name-2"]').val(),
                            "email": this.$('[name="friend-email-2"]').val()
                        },
                        {
                            "name": this.$('[name="friend-name-3"]').val(),
                            "email": this.$('[name="friend-email-3"]').val()
                        },
                        {
                            "name": this.$('[name="friend-name-4"]').val(),
                            "email": this.$('[name="friend-email-4"]').val()
                        },
                        {
                            "name": this.$('[name="friend-name-5"]').val(),
                            "email": this.$('[name="friend-email-5"]').val()
                        }
                    ]
                }

                // console.log(fieldsForm);

                this.ui.showLoader();
                this.friend.save(fieldsForm, {
                    error: function(data){
                        $this.ui.hideLoader();
                        alert('Ops... Um erro ocorreu!');
                        console.log('Error - ' + data);
                    },
                    success: function(){
                        $this.ui.hideLoader();
                        $this.resetForm($this);
                        $this.showInviteConfirmation();
                    }
                });

                e.preventDefault();
            }
        });

        return FriendView;
    }
);
