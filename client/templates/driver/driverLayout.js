/*
function cAddress(feet, distance, state, city, street, number, apartment, lat, lon) {
    this.feet = feet;
    this.distance = distance;
    this.state = state;
    this.city = city;
    this.street = street;
    this.number = number;
    this.apartment = apartment;
    this.lat = lat;
    this.lon = lon;
}

var distance = new Array();
var list = [];

function addtoList(item) {
    list.push(item);
}


Template.helperLayout.rendered = function() {
    Session.set('currentTab', 'helper.home');
    //Session.set('progressValue', .68);
    Session.set('progressValue', .2);
};

Template.helperLayout.events({
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
    }
});

Template.helperHome.circularOptions = function() {
    //Session.set('progressValue', .68);
    //Session.set('progressText', '68/100 Deliveries Made');

    Session.set('progressValue', .2);
    Session.set('progressText', '1/5 Days Until Bonus');

    return {
        'canvasSize': 250,
        'arcWidth': 10,
        'sessionValueKey': 'progressValue',
        'sessionTextKey': 'progressText',
        'tweenDuration': 300
    }
}
*/