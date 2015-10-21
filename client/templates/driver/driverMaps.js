Template.driverMaps.rendered = function() {
    Session.set('currentTab', 'driver.maps');
};

var MAP_ZOOM = 14;
			Session.set('totalSecondsWorked', 0);

Meteor.startup(function() {
	GoogleMaps.load();
});

Template.driverMaps.helpers({
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},
	mapOptions: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: MAP_ZOOM
			};
		}
	}
});

Template.driverMaps.onCreated(function() {
	var self = this;

	GoogleMaps.ready('map', function(map) {
		var marker;
		var currentMarker = new google.maps.MarkerImage('/current.png');

		// Create and move the marker when latLng changes.
		self.autorun(function() {
			var latLng = Geolocation.latLng();
			if (!latLng)
				return;

			// If the marker doesn't yet exist, create it.
			if (!marker) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(latLng.lat, latLng.lng),
					map: map.instance,
					icon: currentMarker
				});
			}
			// The marker already exists, so we'll just change its position.
			else {
				marker.setPosition(latLng);
			}

			// Center and zoom the map view onto the current position.
			map.instance.setCenter(marker.getPosition());
			map.instance.setZoom(MAP_ZOOM);

			AddressLoop(map.instance, latLng.lat, latLng.lng);
		});
	});
});

function calculateDistance(Helperlat, Helperlng, number, street, city, state, apartment) {
    //var destination = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    var helperLocation = new google.maps.LatLng(Helperlat, Helperlng);
    var destinationAddress = number + ' ' + street + ' ' + city + ' ' + state;
    var dfd = $.Deferred();

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
            origins: [helperLocation],
            destinations: [destinationAddress],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        function(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK) {
                dfd.resolve(response,number, street, city, state, apartment);
            } else
                dfd.reject(status,number, street, city, state, apartment);
        });

    return dfd.promise();
}


function AddressLoop(map, Helperlat, Helperlng) {
                
    var addressList = Address.find();
                
    addressList.map(function(address) {                  
      addMarkers(address.state, address.city, address.street, address.number, address.apartment, map, Helperlat, Helperlng);
	});

}

function addMarkers(state, city, street, number, apartment, map, Helperlat, Helperlng) {

    var geo = new google.maps.Geocoder();
    var stopMarker = new google.maps.MarkerImage('/stop.png');
                
    geo.geocode({
        'address': number + ' ' + street + ' ' + city + ' ' + state
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
                                                
            addressMarker = new google.maps.Marker({
                position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
                map: map,
                icon: stopMarker
            });
                                                
                                                
                                var service = new google.maps.DistanceMatrixService();
                                var helperLocation = new google.maps.LatLng(Helperlat, Helperlng);
  
                                service.getDistanceMatrix({
            origins: [helperLocation],
            destinations: [results[0].geometry.location],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        function(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK) {
                                                                                                                
                 $('#edd_list').append('<a class="item item-icon-left item-icon-right"><i class="icon ion-home positive"></i>' + number + ' ' + street + '<i class="icon miles">' + response.rows[0].elements[0].distance.text + '</i></a>');
            } 
        });
	   }
	});
}