

//if (Meteor.isClient) {

    // This code only runs on the client

    Template.coordHome.helpers({
        helpers: function () {
            return ["Edward", "Joseph", "Stacy", "Ross"]
        },
        activehelpers: function () {
                return ["Harry", "Potter"]
        },
        inactivehelpers: function () {
            return ["Neo", "Trinity", "Morpheus"]
        },
        routes: function () {
            if (Meteor.user()) {
                return Route.getRoutesInSLIC(Meteor.user().profile.SLIC)
            }
        }

    });

	
	Template.coordHome.events({
    'click .listcoord': function (event) {
	if($(event.currentTarget).css('background-color')=='rgb(51, 205, 95)') {
		$(event.currentTarget).css('background-color','#fff');
		$(event.currentTarget)[0].childNodes[0].className = "icon";
	}else{		
		$(event.currentTarget).css('background-color','#33cd5f');	
		$(event.currentTarget)[0].childNodes[0].className = "icon ion-checkmark light"; 		
	}
    }
});
	

