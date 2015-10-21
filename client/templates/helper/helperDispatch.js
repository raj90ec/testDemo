Session.setDefault('counter', 0);
Session.setDefault('text', 'empty');

Template.helperDispatch.onRendered(function() {
	$('#marker-click').html('<div id="eddlist"></div>');
	scanLoop();	
});

    Meteor.startup(function() {
     if (!GoogleMaps.loaded()){
		GoogleMaps.load();
	  }
    });

Template.helperDispatch.created = function() {

	
  this.handle = Meteor.setInterval((function() {    
	var latLng = Geolocation.latLng();
        Session.set('scanlat', latLng.lat);
        Session.set('scanlng', latLng.lng);		
  }), 60000);
};

Template.helperDispatch.destroyed = function() {
  Meteor.clearInterval(this.handle);
};


function scanLoop() {	
    var addressList = Address.find();
	
	var latLng = Geolocation.latLng();
	$('#marker-click').html('<div id="eddlist"></div>');
    addressList.forEach(function(address) {		
      addItem(address.state, address.city, address.street, address.number, address.apartment, latLng.lat, latLng.lng,address.lat,address.lng,address._id);
	});
	
}

function addItem(state, city, street, number, apartment, Helperlat, Helperlng,lat,lng,id) {
	
	var distance = getDistance(Helperlat,Helperlng,lat,lng)/1600;
	
	$('#eddlist').append('<a href="/helper/release/id=' + id + '"  class="item item-icon-left item-icon-right"><i class="icon ion-home positive"></i>' + number + ' ' + street + '<i class="icon miles">' + distance.toFixed(2) + ' mi</i></a>');
} 
        
Template.helperDispatch.helpers({
    counter: function () {
      return Session.get('counter');
    },
    text: function () {
      return Session.get("text");
    },
    scanlat: function () {
	  scanLoop();
      return Session.get("scanlat");
    },
    scanlng: function () {
	  scanLoop();
      return Session.get("scanlng");
    }
  });

Template.helperDispatch.events({
    'click button': function () {
      
        Session.set('counter', Session.get('counter') + 1);

        cordova.plugins.barcodeScanner.scan(
                                            function (result) {												
												Router.go('helper.tracking', {_id: result.text});
                                            },
                                            function (error) {
                                                Session.set("error", error)
                                            });
    }
});


var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(hlat,hlong, alat,along) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(alat - hlat);
  var dLong = rad(along - hlong);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(hlat)) * Math.cos(rad(alat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};
