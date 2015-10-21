

Shipment = Class({
    
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    trackingNumber: '',
    geoLocation: null,
    helperID: '',
    stopType: '',
    delLocation: null,
    infoNoticeNumber: '',


    initialize: function (a1,a2,a3,city,state,postal,country) {
        this.address1 = a1;
        this.address2 = a2;
        this.address3 = a3;
        this.city = city;
        this.state = state;
        this.postal = postal;
        this.country = country;
        
    },
    toString: function () {
        return "Tracking Number: " + this.trackingNumber
    }


});