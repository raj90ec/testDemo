var ERRORS_KEY = 'adminAddcoordErrors';

Template.adminAddcoord.onCreated(function () {
    Session.set(ERRORS_KEY, {});
});
Template.adminAddcoord.helpers({
    counter: function () {
        return Session.get('counter');
    },
    text: function () {
        return Session.get("text");
    },
    errorMessages: function () {
        return _.values(Session.get(ERRORS_KEY));
    },
    errorClass: function (key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
    SLICList: function () {
        return ServiceArea.getSLICList();
    }
});

Template.adminAddcoord.events({
    'click #addCoord': function (event, template) {
        event.preventDefault();
        var empID = template.$('[id=empID]').val();
        var firstName = template.$('[id=firstName]').val();
        var lastName = template.$('[id=lastName]').val();
        var SLIC = template.$('[id=SLIC]').val();
        //var password = Common.makePinPassword(username, firstName, lastName);
        //var confirm = template.$('[name=confirm]').val();

        var errors = {};

        if (!empID) {
            errors.empID = 'Employee ID required';
        } else {
            if (empID.length != 7) {
                errors.empID = 'Employee ID must be 7 digits';
            }
        }
        

        if (!firstName) {
            errors.firstName = 'First name required';
        }

        if (!lastName) {
            errors.lastName = 'Last name required';
        }

        if (!SLIC) {
            errors.SLIC = 'Please Select a SLIC';
        } 

        //check for errors before add user
        Session.set(ERRORS_KEY, errors);
        if (_.keys(errors).length) {
            return;
        }
        //create user object
        try {
            usrCoord = new Coordinator(empID, firstName, lastName, SLIC);
            //execute add user
            console.log("calling object for user insert");
            usrCoord.addUser();  //this function writes to error session.
        }
        catch (err) {
            errors.adduserbutton = "Insert user failed: " + err;
            Session.set(ERRORS_KEY, errors);
            
        }
        

        //check again for errors after add user
        if (_.keys(errors).length) {
            return;
        }
        alert('Added new coordinator: ' + empID);
        template.find("form").reset();
    }


});


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}


//add url for this page
//Router.route('adminAddcoord');
