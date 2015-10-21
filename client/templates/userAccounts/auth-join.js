var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
	
    var firstname = template.$('[name=firstname]').val();
	var lastname = template.$('[name=lastname]').val();
    var username = template.$('[name=username]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();

    var errors = {};
	
	if (! firstname) {
      errors.firstname = 'First Name required';
    }
	
	if (! lastname) {
      errors.lastname = 'Last Name required';
    }
	
    if (! username) {
      errors.username = 'User Name required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Accounts.createUser({
	  firstname: firstname,
	  lastname: lastname,
      username: username,
      password: password
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('index');
    });
  }
});
