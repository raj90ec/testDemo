

Template.helperHome.rendered = function() {
    Session.set('currentTab', 'helper.home');
    Session.set('helperPunchedIn', 'false');
};

Template.helperHome.circularOptions = function() {
    Session.set('progressValue', .2);
    Session.set('progressText', '2/5 Days until bonus');

    return {
        'canvasSize': 250,
        'arcWidth': 10,
        'sessionValueKey': 'progressValue',
        'sessionTextKey': 'progressText',
        'tweenDuration': 300
    }
}

Template.helperHome.events({
    'click .ion-plus.padright': function() {
        var p_hours = $('#txt_planned_hours').val();
        var increment = "1";
        var new_value = +p_hours + +increment;

        new_value = (new_value > 0) ? new_value : 0;

        $('#txt_planned_hours').val(new_value);

    },
    'click .ion-minus.padleft': function() {
        var p_hours = $('#txt_planned_hours').val();
        var increment = "1";
        var new_value = +p_hours - +increment;

        new_value = (new_value > 0) ? new_value : 0;

        $('#txt_planned_hours').val(new_value);
    },
	'click #btnPunch': function(){
		if ($('#btnPunch').html() == 'Punch In <i class="ion-android-time"></i>'){
			$('#btnPunch').html('Punch Out <i class="ion-android-time"></i>');
			$('#btnPunch').css('background','red');
			//$('#crdPlannedHours').css('display', 'none');
			//$('#crdAssignmentDetails').css('display', 'block');
			Session.set('helperPunchedIn', 'true');
			/*var startTime = new Date();
			var prevTime = Session.get('totalSecondsWorked');
			console.log(Session.get('startTime'));
			// set interval
			var tid = setInterval(compareTime, 1000);
			if ($('#btnPunch').html() == 'Punch Out <i class="ion-android-time"></i>'){
				function compareTime() {
					var curTime = new Date();
					var difTime = curTime.getTime() - startTime.getTime();
					//var saveTime = difTime;
					console.log(difTime);
					var hours = Math.floor((difTime/1000)/3600);
					difTime -= hours*3600;
					var minutes = Math.floor((difTime/1000)/60);
					difTime -= minutes*60;
					var displayTime = hours+":"+(minutes < 10 ? '0'+minutes : minutes)+":"+(difTime < 10 ? '0'+difTime : difTime);
				}
			}
			Session.set('totalSecondsWorked', prevTime + displayTime);
			console.log(displayTime + prevTime); */
		} else {
			$('#btnPunch').html('Punch In <i class="ion-android-time"></i>');
			$('#btnPunch').css('background','#33cd5f');
			Session.set('helperPunchedIn', 'false');
			//$('#crdPlannedHours').css('display', 'block');
			//$('#crdAssignmentDetails').css('display', 'none');
		}
	}
});

Template.assignmentDetails.helpers({
	'route': function(){
		return "01B"
	},
	'driver': function(){
		return "Danny Driver"
	},
	'start': function(){
		return "11:00 AM"
	},
	'end': function(){
		return "06:00 PM"
	}
});