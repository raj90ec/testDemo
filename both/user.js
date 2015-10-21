
User = Class({
    initialize: function (empID,firstName,lastName) {
        this.empID = empID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roll = 'user';
    },
    toString: function () {
        return this.roll+":"+this.firstName+" "+this.lastName;
    },
    populate: function (data) {
        this.empID = data.empID;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this._id = data._id;
    },
    addUser: function () {
        console.log("add running:" + this.empID + this.firstName + this.lastName + this.roll);     
        try {
            var password = Common.makePinPassword(this.empID, this.firstName, this.lastName);
            options = {
                //setup values for user
                username: this.empID,
                password: password,
                profile: {
                    empID: this.empID,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    roll: this.roll
                }
            };
            console.log('Calling server user add')
            Meteor.call('makeUser', options);
        
          }
          catch (err) {
                throw err

          }
    }
});

Helper = Class(User, {
    roll: '',
    SLIC: '',
    initialize: function (empID, firstName, lastName) {
        
        this.$super('initialize',empID,firstName,lastName);
        this.roll = 'helper';

    }
});


Driver = Class(User, {
    roll: '',
    SLIC: '',
    initialize: function (empID, firstName, lastName) {

        this.$super('initialize', empID, firstName, lastName);
        this.roll = 'driver';
    }
});

Coordinator = Class(User, {
    roll: '',
    SLIC: '',
    initialize: function (empID, firstName, lastName, SLIC) {

        this.$super('initialize', empID, firstName, lastName);
        this.SLIC = SLIC;
        this.roll = 'coord';
        console.log("coordinator instanciated");
    },
    addUser: function () {
        console.log("add user running:" + this.empID + this.firstName + this.lastName);
        try {
            var password = Common.makePinPassword(this.empID, this.firstName, this.lastName);
            options = {
                //setup values for user
                username: this.empID,
                password: password,
                profile: {
                    empID: this.empID,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    SLIC: this.SLIC,
                    roll: 'coord'
                }
            };
            console.log('Calling server user add')
            Meteor.call('makeUser', options);
        
          }
          catch (err) {
                throw err

          }
    }
});


Admin = Class(User, {
    roll: '',
    initialize: function (empID, firstName, lastName) {

        this.$super('initialize', empID, firstName, lastName);
        this.roll = 'admin';
    }
});