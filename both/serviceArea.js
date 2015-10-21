ServiceArea = Class({
    //id field is captured as a class variable
    //this becomes the primary key in MongoDB
    _id: '',
    region: '',
    district: '',
    division: '',
    SLIC: '',
    //array storing the routes available in this service area
    routes: [],
    initialize: function (region, district, SLIC) {
        this.region = region;
        this.district = district;
        this.SLIC = SLIC;
        this._id = SLIC;
        

    },
    toString: function () {
        return "SLIC:" + this.SLIC
    },
    addRoute: function (route) {
        //add route to service area (route number is a string ex 01A)
        if (this._id) {
            //update with a push which inserts the route into the array in DB
            ServiceAreas.update({ _id: id }, { $push: { routes: route } })
        } else {throw "ServiceArea not properly defined (check _id)"}
    },
    saveUpdates: function () {
        //save updates to db
        if (this._id) {
            //remove from db (returns 0 if not found)
            ServiceAreas.remove({ _id: this._id })
            //insert fresh object into db
            //because _id is set in the object it will be the primary key
            ServiceAreas.insert(this)
        }
        else { throw "ServiceArea not properly defined (check _id)" }
    },
    populateInputObject: function (data) {
        //make sure data is not empty and the id is the slic
        if (data._id && data._id == data.SLIC) {
            this._id = data.SLIC;
            this.region = data.region;
            this.district = data.district;
            this.division = data.division;
            this.SLIC = data.SLIC;
            this.routes = data.routes;
        }
    },
    populateBySLICNum: function (strSLIC) {
        //populate data from DB
        data = ServiceAreas.findOne({ _id: strSLIC })
        //make sure data is not empty and the id is the slic
        if (data._id && data._id == data.SLIC) {
            this._id = data.SLIC;
            this.region = data.region;
            this.district = data.district;
            this.division = data.division;
            this.SLIC = data.SLIC;
            this.routes = data.routes;
        } else { throw "SLIC not found in DB" }
        
    }

   
});

ServiceArea.getSLICList = function () {
    return ServiceAreas.find().map(function (SA) {return SA.SLIC;})
}
