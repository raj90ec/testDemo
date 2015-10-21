
console.log("Check admin count");
var adminCount = Accounts.users.find({ username: 'admin' }).count();
if (adminCount==0) {
    console.log("writing user");
    //create admin
    Accounts.createUser({
        username: 'admin',
        password: 'localadmin',
        profile: {
            firstName: 'admin',
            lastName: 'admin',
            roll:'admin'
        }

    });
}
else
{ console.log('Admins: ' + adminCount);}

Meteor.methods({
    'makeUser': function (options) {        
        Accounts.createUser({
            username: options.username,
            password: options.password,
            profile: {
                empID: options.username,
                firstName: options.profile.firstName,
                lastName: options.profile.lastName,
                roll: options.profile.roll
            }
        });
        console.log('Created: ' + options.username + ' firstName: ' + options.profile.firstName)
    }
});

/****************************\
|*** REMOVE AFTER TESTING ***|
\****************************/

console.log("Check coordinator count");
var coordCount = Accounts.users.find({ username: 'coord' }).count();
if (coordCount==0) {
    console.log("writing user coord/coord");
    //create coord
    Accounts.createUser({
        username: 'coord',
        password: 'coord',
        profile: {
            firstName: 'coord',
            lastName: 'coord',
            roll:'coord'
        }

    });
}
else
{ console.log('Coordinators: ' + coordCount);}

console.log("Check driver count");
var driverCount = Accounts.users.find({ username: 'driver' }).count();
if (driverCount==0) {
    console.log("writing user driver/driver");
    //create driver
    Accounts.createUser({
        username: 'driver',
        password: 'driver',
        profile: {
            firstName: 'driver',
            lastName: 'driver',
            roll:'driver'
        }

    });
}
else
{ console.log('Drivers: ' + driverCount);}

console.log("Check helper count");
var helperCount = Accounts.users.find({ username: 'helper' }).count();
if (helperCount==0) {
    console.log("writing user helper/helper");
    //create admin
    Accounts.createUser({
        username: 'helper',
        password: 'helper',
        profile: {
            firstName: 'helper',
            lastName: 'helper',
            roll:'helper'
        }

    });
}
else
{ console.log('Helpers: ' + helperCount);}