//monitor scan queue for new items to process

function callConsole(message){
    console.log(message)
}


//this function fires the call console function when the scan queue is updated
ScanQueue.find().observeChanges({
    added: function (id, fields) {
        callConsole('new tracking number entered:' + fields.trackingNumber);
    }
});

Meteor.methods({
        
        'trackPackage': function (trackingNumber, callback) {
            this.unblock();
            var url = 'https://onlinetools.ups.com/webservices/Track';
	    
	    var xmlVar = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://www.ups.com/XMLSchema/XOLTWS/UPSS/v1.0" xmlns:v2="http://www.ups.com/XMLSchema/XOLTWS/Track/v3.0" xmlns:v11="http://www.ups.com/XMLSchema/XOLTWS/Common/v1.0">'+
   				'<soapenv:Header>'+
      					'<v1:UPSSecurity>'+
						'<v1:UsernameToken>'+
							'<v1:Username>sriaswani</v1:Username>'+
							'<v1:Password>VSai4KSB</v1:Password>'+
						'</v1:UsernameToken>'+
						'<v1:ServiceAccessToken>'+
							'<v1:AccessLicenseNumber>ACEC60C499F23A92</v1:AccessLicenseNumber>'+
						'</v1:ServiceAccessToken>'+
					  '</v1:UPSSecurity>'+
				'</soapenv:Header>'+
				'<soapenv:Body>'+
					  '<v2:TrackRequest>'+
						'<v2:Request>'+
							'<v2:RequestOption>activity</v2:RequestOption>'+
						 '</v2:Request>'+
						 '<v2:InquiryNumber>'+trackingNumber+'</v2:InquiryNumber>'+
						 '<v2:TrackingOption>01</v2:TrackingOption>'+

					  '</v2:TrackRequest>'+
				'</soapenv:Body>'+
			'</soapenv:Envelope>';
			
	        var result = Meteor.http.call("POST", url, {content:xmlVar,headers:{'content-type': 'text/html'}});
            
            if(result.statusCode==200) {

				var jsonObj = xml2js.parseStringSync(result.content,{stripPrefix:true });
				jsonObj = jsonObj['soapenv:Envelope']['soapenv:Body'];		

				return JSON.stringify(jsonObj);
			} 
        }
    });    