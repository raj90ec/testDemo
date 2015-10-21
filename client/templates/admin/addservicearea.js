var ERRORS_KEY = 'addHelperErrors';

Template.adminAddservicearea.onCreated(function () {
    Session.set(ERRORS_KEY, {});
});
Template.adminAddservicearea.helpers({
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
    }
});

Template.adminAddservicearea.events({
    'click #submitServiceArea': function (event, template) {
        event.preventDefault();
        var SLIC = template.$('[id=SLIC]').val();
        var region = template.$('[id=region]').val();
        var district = template.$('[id=district]').val();
        var division = template.$('[id=division]').val();
       

        var errors = {};

        if (!SLIC) {
            errors.SLIC = 'SLIC is required';
        } else {
            if (SLIC.length != 5) {
                errors.SLIC = 'SLIC must be 5 digits, leading zero + 4';
            }
        }

        if (!region) {
            errors.region = 'Region is required';
        } else {
            if (region.length != 2) {
                errors.region = 'Region must be 2 digits in length';
            }
        }

        if (!district) {
            errors.district = 'District is required';
        } else {
            if (district.length != 2) {
                errors.district = 'District must be 2 digits in length';
            }
        }


        Session.set(ERRORS_KEY, errors);
        if (_.keys(errors).length) {
            return;
        }
        try {
            svcArea = new ServiceArea(region, district, SLIC)
            //set division if available
            if (division) {
                svcArea.division = division;
            }
            //call save function from service area class
            svcArea.saveUpdates();

            alert('Added Service Area: ' + SLIC);
            template.find("form").reset();
        }
        catch (err) {
            Session.set(ERRORS_KEY, { 'none': err.reason });
        }

    }


});


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}


//add url for this page
//Router.route('adminAddservicearea');
