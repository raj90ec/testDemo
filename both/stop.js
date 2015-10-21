

Stop = Class({
    stopNum: '',
    stopType: '',
    geoLat: '',
    geoLong: '',
    shipments: [],
    address: null,
    routeID: '',
    initialize: function (stopNum, stoptype, address, lat, long) {
        this.stopNum = stopNum;
        this.stopType = stoptype;
        this.address = address;
        this.lat = lat;
        this.long = long;
        
    },
    toString: function () {
        return "Stop Number:" + this.stopNum;
    },
    addShipment: function () {
        //add a package to the stop
    },
    removePackage: function () {
        //remove package from the stop
    },
    getDeliveredPackages: function (){
        //return packages delivered for stop
    },
    getUndeliveredPackages: function () {
        //return undelivered packages for stop
    },
    getAllPackages: function () {
        //return all packages for stop
    }


});