
Template.helperRelease.events({
    'click .item': function (event) {
	if($(event.currentTarget).css('background-color')=='rgb(51, 205, 95)') {
		$(event.currentTarget).css('background-color','#fff');
		$(event.currentTarget)[0].childNodes[0].className = "icon";
	}else{		
		$(event.currentTarget).css('background-color','#33cd5f');	
		$(event.currentTarget)[0].childNodes[0].className = "icon ion-checkmark light"; 		
	}
    },
	'click #btnPackages': function () {
		Router.go('helper.dispatch');
	},
	'click #btnSignature': function () {
		Router.go('helper.sigpad', {_id: Router.current().params._id.replace('id=','')});
	},
	'click #btnDelivery': function () {
		Router.go('helper.dispatch');
	},
	'click #btnBack': function () {
		Router.go('helper.dispatch');
	}
});