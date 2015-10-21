
var ERRORS_KEY = 'coordRouteErrs';

Template.coordRoute.onCreated(function () {
    Session.set(ERRORS_KEY, {});
});


Template.coordRoute.helpers({
    errorMessages: function () {
        return _.values(Session.get(ERRORS_KEY));
    },
    errorClass: function (key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    }
});

Template.coordRoute.events({
    'click #addRoute': function (event, template) {
        event.preventDefault();
        var routeNum = template.$('[name=routeNum]').val();
        //var SLIC = Meteor.user().profile.SLIC;
        var SLIC = template.$('[name=SLIC]').val();
        var date = '';
        var errors = {};

        if (!routeNum) {
            errors.routeNum = 'Route number required';
        } else {
            if (routeNum.length != 3) {
                errors.routeNum = 'Route Number must be 3 characters';
            }
        }

        if (!SLIC) {
            errors.SLIC = 'Coordinators SLIC not set';
        };

        //check for errors before add user
        Session.set(ERRORS_KEY, errors);
        if (_.keys(errors).length) {
            return;
        }
        //create user object
        try {
            //rt = new Route(routeNum, SLIC, date);
            //execute add user
            //call xmlparsing.js from server folder
            Meteor.call('extractEddInfo',routeNum,SLIC);
            //console.log("calling object for route insert");
            //rt.saveUpdates()  //this function writes to error session.
        }
        catch (err) {
            errors.adduserbutton = "Insert route failed: " + err;
            Session.set(ERRORS_KEY, errors);

        }


        //check again for errors after add user
        if (_.keys(errors).length) {
            return;
        }
        alert('Added new Route: ' + routeNum);
        template.find("form").reset();
    }
});
