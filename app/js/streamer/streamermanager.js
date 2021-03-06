var app;


function getSteamerInfo(app) {
	app = app;
	var url = 'https://apis.tdameritrade.com/apps/200/StreamerInfo;jsessionid='+app.userProfileModel.get('session-id');
	$.ajax({
		url:url,
		type:'POST',
		dataType:'',
		data:'source=TAG',
		success:function(data) {
			// convert data in JSON from XML
			// Save Response
			console.log("parsing xml login response");
			console.log(data);
			var xml = parseXml(data);

			var jsonResponse  = xmlToJson(xml);

			if ( jsonResponse.amtd.error ){
				alert(JSON.stringify(jsonResponse.amtd.error));
			}
			else
			{ 
				app.streamerconfig = new Object();
				var info = jsonResponse.amtd["streamer-info"];
				app.streamerconfig.account =app.userProfileModel.get("accounts").account["account-id"];
				app.streamerconfig.userid =app.userProfileModel.get("accounts").account["account-id"];
				app.streamerconfig.token = info.token;
				app.streamerconfig.company =app.userProfileModel.get("accounts").account["company"];
				app.streamerconfig.source ='TAG';
				app.streamerconfig.segment =app.userProfileModel.get("accounts").account["segment"];
				app.streamerconfig.cddomain =app.userProfileModel.get("accounts").account["cdi"];
				app.streamerconfig.usergroup =info.usergroup;
				app.streamerconfig.accesslevel =info["access-level"];
				app.streamerconfig.authorized =info.authorized;
				app.streamerconfig.acl =info.acl;
				app.streamerconfig.timestamp =info.timestamp;
				app.streamerconfig.appid = 'TAG';
				//var connectionData = JSON.parse(document.getElementById("connectionDataText").value);
				//if(connectionData.content){
					//connectionData = connectionData.content;				
				//}
				app.streamer = new tda.adaptors.Session( app.streamerconfig, {
						"http" : "http://tdameritrade-web.streamer.com/ws",
						"ws" :  "ws://tdameritrade-web.streamer.com/ws",
						"flash" : "ws://tdameritrade-web.streamer.com/ws",
						});
				app.streamer.setDebugMode(true);
				app.streamer.onMessage(onMessage,"default");
				app.streamer.onLogin(loginUpdate);
				app.streamer.onError(streamerError);
				app.streamer.login();			 	
			}
		},
		error:function(data){
			console.log(data);
		}
	});
}

function loginUpdate(message){
	app.streamerLoggedIn=true;
	Backbone.history.navigate('watchlist', true); 

}
function streamerError(message){
	alert(message);
}

function onMessage(message){
	console.log(message);
	var wl111 = app.currentWLMap[message['key']];
	if( typeof message[1] != 'undefined'){
		wl111.set('bid',message[1]);
	}
	if( typeof message[2] != 'undefined'){
		wl111.set('ask',message[2]);
	}
	if( typeof message[3] != 'undefined'){
		wl111.set('last',message[3]);
	}
	if( typeof message[29] != 'undefined'){
		wl111.set('change',message[29]);
	}
	if( typeof message[29] != 'undefined'){
		wl111.set('changePercent',message[29]);
	}
}

//pass comma seperated symbols for level1 quote subscription
function addLevel1QuoteSubscription(symbols){
	symbols = symbols.toUpperCase();
	var fields = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,22,23,24,25,28,29,30,31,32,37,38,39";
	var dataID = "QUOTE";
	app.streamer.addSymbol(dataID, symbols, fields);
}

//pass comma seperated symbols for level1 quote subscription
function unSubscribeLevel1QuoteSubscription(symbols){
	symbols = symbols.toUpperCase();
	var dataID = "QUOTE";
	app.streamer.removeSymbol(dataID, symbols);
}