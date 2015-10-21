Meteor.methods({
	extractEddInfo: function(routenumber,slic){
		if(Meteor.isServer){
			RouteClass = new Route(routenumber,slic,new Date);
			var packages = '';
			var stops = '';
			console.log(routenumber+slic);
			xml2js.parseString(Assets.getText('01A_3_pkgs.xml'), function (err, result) {
				packages = result;
				
			});
			xml2js.parseString(Assets.getText('01A_3_stops.xml'), function (err, result) {
				//stops = result;
				for(var i =0;i<result.ArrayOfStop.Stop.length;i++){
					/*
					var obj = {
						stopID:result.ArrayOfStop.Stop[i].stopID,
						stopeType:result.ArrayOfStop.Stop[i].stopType,
						address:'',
						latitude:result.ArrayOfStop.Stop[i].Latitude,
						longitude:result.ArrayOfStop.Stop[i].Longitude
					};*/
					stoptemp = new Stop(result.ArrayOfStop.Stop[i].StopID,result.ArrayOfStop.Stop[i].StopType,'',result.ArrayOfStop.Stop[i].Latitude,result.ArrayOfStop.Stop[i].Longitude);
					//console.log(stoptemp);
					RouteClass.addStop(stoptemp.stopNum,stoptemp);
				}
			});
			//for(var i=0;i<stops.length)
			/*
			for(var i=0;i<stops.ArrayOfStop.Stop.length;i++){
				console.log(stops.ArrayOfStop.Stop[i]);
			}*/

			//console.log(RouteClass.stops);
			
		}
	}
});