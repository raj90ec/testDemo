var ERRORS_KEY = 'signinErrors';

Template.signin.onCreated(function() {
  Session.set(ERRORS_KEY, {});
  
});

Template.signin.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
		
		$('#content-container').css('left','0px');
 
    }
}

Template.signin.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.signin.events({
    'submit': function (event, template) {
        event.preventDefault();

        var username = template.$('[name=username]').val();
        var password = template.$('[name=password]').val();

        var errors = {};

        if (!username) {
            errors.username = 'Email is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }

        Session.set(ERRORS_KEY, errors);
        if (_.keys(errors).length) {
            return;
        }

        Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
                return Session.set(ERRORS_KEY, { 'none': error.reason });
            }

            //Router.go('tabs.one');
            //console.log("Routing...")
            if (Common.isAdmin()) {
                Router.go('admin.home');
                //console.log('admin')
            }

            if (Common.isCoord()) {
                Router.go('coord.home');
                //console.log('coord')
            }

            if (Common.isDriver()) {
                Router.go('driver.messaging');
                //console.log('driver')
            }

            if (Common.isHelper()) {
                Router.go('helper.home');
                //console.log('helper')
            }
        }
    );
   },
    'click resetPass': function() {
        
    }  
});