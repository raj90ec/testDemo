
Template.coordUsers.events({
    'click .submitUser': function (event, template) {
        event.preventDefault();
        var username = template.$('[name=empID]').val();
        var firstName = template.$('[name=firstName]').val();
        var lastName = template.$('[name=lastName]').val();
        var userType = template.$('[name=userType]').val();
        var password = Common.makePinPassword(username, firstName, lastName);

        //Session.set(ERRORS_KEY, errors);
            
        try {
            switch(userType){
                case 'driver':
                    usr = new Driver(username, firstName, lastName);
                    break;
                case 'helper':
                    usr = new Helper(username, firstName, lastName);
                    break;
            }
           
           //execute add user
           usr.addUser();
            //Confirmation
            alert('Added ' + userType + ' with Employee ID: ' + username + ' options.profile.lastName: ' + options.profile.lastName);
            template.find("form").reset();

        }
        catch (err) {
            console.log(err);
            //Session.set(ERRORS_KEY, { 'none': err.reason });
        }
    }
});
