

Route = Class({
    _id: '',
    date: '',
    routeNumber: '',
    SLIC: '',
    stops: {},
    initialize: function (routeNumber, SLIC, date) {
        this.routeNumber = routeNumber;
        this.SLIC = SLIC;
        this._id = this.SLIC + ',' + this.routeNumber + ',' + this.date;
        
    },
    toString: function () {
        return "RouteID:" + this.SLIC + ',' + this.routeNumber + ',' + this.date
    },
    addStop: function (stopNum, stopObject) {
        this.stops[stopNum] = stopObject;
    },
    removeStop: function (stopNum) {
        delete stops[stopNum];
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
        else { throw "Route not properly defined (check _id)" }
    },
    populateInputObject: function (data) {
        //make sure data is not empty and the id is the slic
        if (data._id && data._id == data.SLIC + ',' + data.routeNumber + ',' + data.date) {
            this._id = data.SLIC + ',' + data.routeNumber + ',' + data.date;
            this.date = data.date;
            this.routeNumber = data.routeNumber;
            this.SLIC = data.SLIC;
            this.stops = data.stops;
        }
    },
    populateByRouteID: function (routeID) {
        //populate data from DB
        data = Routes.findOne({ _id: routeID })

        //make sure data is not empty and the id is the composite route id
        if (data._id && data._id == data.SLIC + ',' + data.routeNumber + ',' + data.date) {
            this._id = data.SLIC + ',' + data.routeNumber + ',' + data.date;
            this.date = data.date;
            this.routeNumber = data.routeNumber;
            this.SLIC = data.SLIC;
            this.stops = data.stops;
        }
    }

});
Route.getRoutesInSLIC = function (input) {
    return Routes.find({ SLIC: input }).map(function (rt) { return rt.routeNumber;})
};