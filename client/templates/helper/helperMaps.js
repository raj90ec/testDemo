if (Meteor.isClient) {
    var MAP_ZOOM = 14;

    Meteor.startup(function() {
     if (!GoogleMaps.loaded()){
		GoogleMaps.load();
	  }
    });

    Template.helperMaps.helpers({
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

    Template.helperMaps.onCreated(function() {
        var self = this;
		$('#marker-click').html('<div id="edd_list"></div>');
		
        GoogleMaps.ready('map', function(map) {
            var marker;
            var currentMarker = new google.maps.MarkerImage('/img/current.png');

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
}





function AddressLoop(map, Helperlat, Helperlng) {
	
    var addressList = Address.find();
	
    addressList.forEach(function(address) {		
      addMarkers(address.state, address.city, address.street, address.number, address.apartment, map, Helperlat, Helperlng, address.lat, address.lng,address._id);
	});

}

function addMarkers(state, city, street, number, apartment, map, Helperlat, Helperlng, lat, lng,id) {

    var geo = new google.maps.Geocoder();
    var stopMarker = new google.maps.MarkerImage('/img/stop.png');
	var addressMarker;
	
	if(lat == 'undefined'){
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
							
              	 $('#edd_list').append('<a href="/helper/release/id=' + id + '"  class="item item-icon-left item-icon-right"><i class="icon ion-home positive"></i>' + number + ' ' + street + '<i class="icon miles">' + response.rows[0].elements[0].distance.text + '</i></a>');
            } 
        });
 		}
    });
  }else{
	  
	      addressMarker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                icon: stopMarker
            });
	  
		var service = new google.maps.DistanceMatrixService();
		var helperLocation = new google.maps.LatLng(Helperlat, Helperlng);
	    var addressLocation = new google.maps.LatLng(lat, lng);

		
		service.getDistanceMatrix({
            origins: [helperLocation],
            destinations: [addressLocation],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        function(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK) {
							
              	 $('#edd_list').append('<a href="/helper/release/id=' + id + '" class="item item-icon-left item-icon-right"><i class="icon ion-home positive"></i>' + number + ' ' + street + '<i class="icon miles">' + response.rows[0].elements[0].distance.text + '</i></a>');
            } 
        });	  
  }	
}