Meteor.startup(function () {
	
	
  if (Address.find().count() === 0) {
    var data = [
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Andover Dr",
		  number: "100",
		  apartment: "",
		  route: "1A",
		  stop: "1",
		  lat: "40.9365",
		  lng: "-74.221908"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Lake Dr",
		  number: "200",
		  apartment: "",
		  route: "1A",
		  stop: "2",
		  lat: "40.946928",
		  lng: "-74.255392"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Church Ln",
		  number: "10",
		  apartment: "",
		  route: "1A",
		  stop: "3",
		  lat: "40.949375",
		  lng: "-74.230038"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Hamburg Turnpike",
		  number: "1300",
		  apartment: "",
		  route: "1B",
		  stop: "4",
		  lat: "40.961375",
		  lng: "-74.247734"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Nellis Dr",
		  number: "20",
		  apartment: "",
		  route: "1B",
		  stop: "5",
		  lat: "40.927328",
		  lng: "-74.245401"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Berdan Avenue",
		  number: "223",

		  apartment: "",
		  route: "1B",
		  stop: "6",
		  lat: "40.967028",
		  lng: "-74.244302"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Pompton Road",
		  number: "300",
		  apartment: "",
		  route: "1C",
		  stop: "2",
		  lat:"40.944029",
		  lng:"-74.199585"
	 },
      {
		  state: "NJ",
		  city: "Wayne",
		  street: "Wayne Hills Mall",
		  number: "7",
		  apartment: "",
		  route: "1C",
		  stop: "4",
		  lat:"40.960967",
		  lng:"-74.239839"
	 }
    ];
	
	_.each(data, function(address) {
      var address_id = Address.insert({
				state: address.state,
				city: address.city, 
				street: address.street, 
				number: address.number, 
				apartment: address.apartment,
				route: address.route,
				stop: address.stop,
				lat: address.lat,
				lng: address.lng
			});
	});
	
	}

});
