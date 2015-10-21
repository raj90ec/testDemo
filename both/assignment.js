ratingEnum = {
    NOT_RATED: -1,
    RATING1: 1,
    RATING2: 2,
    RATING3: 3,
    RATING4: 4,
    RATING5: 5
}

Assignment = Class({
    _id: '',
    workDate: '',  
    deliveries: 0, //completed deliveries
    plannedStartTime: '',
    plannedEndTime: '',
    actualStartTime: '',
    actualEndTime: '',
    driverRating: this.ratingEnum.NOT_RATED,
    helperRating: this.ratingEnum.NOT_RATED,
    pickupLocation: '',
    routeID: '',
    driverID: '',
    helperID: '',
    SLIC: '',
    plannedCheckInTime: '',
    actualCheckInTime: '',
    checkedIn: '',



    initialize: function (routeID, driverID, helperID, SLIC, startTime, StopTime, pickupLocation, workDate) {
        this.routeID = routeID;
        this.driverID = driverID;
        this.helperID = helperID;
        this.SLIC = SLIC;
        this.plannedStartTime = startTime;
        this.plannedEndTime = StopTime;
        this.pickupLocation = pickupLocation;
        this.workDate = workDate
        this._id = routeID + ',' + driverID + ',' + helperID;
        //calculate planned hours

    },
    toString: function () {
        return "Assignment- " + helper.toString() + " " + route.toString() + " Start Time:" + this.plannedStartTime
    },
    setStartTime: function (startTime) {
        this.startTime;
        
    },
    setEndTime: function (endTime) {
        this.actualEndTime = endTime;
    },

    setPackagesDelivered: function () {
        
       //count of packages
    },
    saveUpdates: function () {
        //save updates to db
        if (this._id) {
            //remove from db (returns 0 if not found)
            Routes.remove({ _id: this._id })
            //insert fresh object into db
            //because _id is set in the object it will be the primary key
            Routes.insert(this)
        }
        else { throw "Assignment not properly defined (check _id)" }
    },
    setDriverRating: function (ratingEnum) {
        this.driverRating = ratingEnum;
    },
    setHelperRating: function (ratingEnum) {
        this.helperRating = ratingEnum;

    },
    getPlannedHours: function(){

    },
    getActualHours: function() {

    },
    populateInputObject: function (data) {

        //make sure data is not empty and the id is the composite route id
        if (data._id == data.SLIC + ',' + data.routeNumber + ',' + data.date) {
            this._id = data._id;
            this.workDate = data.workDate;  
            this.deliveries = data.deliveries; //completed deliveries
            this.plannedStartTime = data.plannedStartTime;
            this.plannedEndTime = data.plannedEndTime;
            this.actualStartTime = data.actualStartTime;
            this.actualEndTime = data.actualEndTime;
            this.driverRating = data.driverRating;
            this.helperRating = data.helperRating;
            this.pickupLocation = '';
            this.routeID = data.routeID;
            this.driverID = data.driverID;
            this.helperID = data.helperID;
            this.SLIC = data.SLIC;
            this.plannedCheckInTime = data.plannedCheckInTime;
            this.actualCheckInTime = data.actualCheckInTime;
            this.checkedIn = data.checkedIn;
        }
    }


});