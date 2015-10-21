
/////////////IMPORTANT
//No files should be before this one in natural sort order
//added the _ to the name so it loads into globals first

//This definition allows for class construction 
Class = function () {
    var parent,
        methods,
        klass = function () {
            this.initialize.apply(this, arguments);
            //copy the properties so that they can be called directly from the child
            //class without $super, i.e., this.name
            var reg = /\(([\s\S]*?)\)/;
            var params = reg.exec(this.initialize.toString());
            if (params) {
                var param_names = params[1].split(',');
                
                
                for (var i = 0; i < param_names.length; i++) {
                    //Trimm param names the split was leaving a space
                    this[param_names[i].trim()] = arguments[i];
                }
            }
        },
        extend = function (destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            //IE 8 Bug: Native Object methods are only accessible directly
            //and do not come up in for loops. ("DontEnum Bug")
            if (!Object.getOwnPropertyNames) {
                var objMethods = [
                   'toString'
                  , 'valueOf'
                  , 'toLocaleString'
                  , 'isPrototypeOf'
                  , 'propertyIsEnumerable'
                  , 'hasOwnProperty'
                ];

                for (var i = 0; i < objMethods.length; i++) {
                    // if (  isNative(source,objMethods[i])
                    if (typeof source[objMethods[i]] === 'function'
                       && source[objMethods[i]].toString().indexOf('[native code]') == -1) {
                        document.writeln('copying ' + objMethods[i] + '<br>');
                        destination[objMethods[i]] = source[objMethods[i]];
                    }
                }
            }

            destination.$super = function (method) {
                return this.$parent[method].apply(this.$parent, Array.prototype.slice.call(arguments, 1));
            }
            return destination;
        };

    if (typeof arguments[0] === 'function') {
        parent = arguments[0];
        methods = arguments[1];
    } else {
        methods = arguments[0];
    }

    if (parent !== undefined) {
        extend(klass.prototype, parent.prototype);
        klass.prototype.$parent = parent.prototype;
    }
    extend(klass.prototype, methods);
    klass.prototype.constructor = klass;

    if (!klass.prototype.initialize) klass.prototype.initialize = function () { };

    return klass;
};

Common =  {
    isAdmin: function () {
        result = false;
        if (!Meteor.user()) {return false}
        if (Meteor.user().profile.roll == 'admin') {
            result = true
        }
        return result;
    },
    isCoord: function () {
        result = false;
        if (!Meteor.user()) {return false}
        if (Meteor.user().profile.roll == 'coord') {
            result = true
        }
        return result;
    },
    isDriver: function () {
        result = false;
        if (!Meteor.user()) {return false}
        if (Meteor.user().profile.roll == 'driver') {
            result = true
        }
        return result;
    },
    isHelper: function () {
        result = false;
        if (!Meteor.user()) {return false}
        if (Meteor.user().profile.roll == 'helper') {
            result = true
        }
        return result;
    },
    userSlic: function () {
        if (!Meteor.user()) { return '' }
        return Meteor.user().profile.SLIC;
    },
    //creates pin password for create users
    makePinPassword: function (empID, firstName, lastName) {
        return empID.substring(5, 7).toLowerCase() + firstName.substring(0, 2).toLowerCase() + lastName.substring(0, 2).toLowerCase()
    },
    //return username if the user is logged in
    userName: function () {
        if (Meteor.user()) {
            return Meteor.user().profile.firstName
        }
    },
    getImageDataStream: function (image) {
        //this function will return a stream of pixle data
        //pass in the image using 
        //image = document.getElementById('imageid');
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        var myData = context.getImageData(0, 0, img.width, img.height);
        return myData.data;
    }
}
if (Meteor.isClient){

    Template.registerHelper('isAdmin', function () {
        return Common.isAdmin();
    });
    Template.registerHelper('isDriver', function () {
        return Common.isDriver();
    });
    Template.registerHelper('isHelper', function () {
        return Common.isHelper();
    });
    Template.registerHelper('isCoordinator', function () {
        return Common.isCoord();
    });
    Template.registerHelper("equals", function (a, b) {
        return (a == b);
    });
    Template.registerHelper("userSlic", function () {
        return Common.userSlic();
    });
}

