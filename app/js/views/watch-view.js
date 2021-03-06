
// WATCH LIST View

app.currentWLMap = {};

var WatchlistView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
		console.log("Watch initialize "+app.userProfileModel);
		_.bindAll(this,'render','update');

	},		

	render: function() {
	 //TODO: check to see if session is valid -  For now if the api returns invalid session please set the user model to {}
	        if ( !app.userProfileModel.get('session-id')) {
	            app.loginView = new LoginView();
	            app.loginView.render();
	        }
	        else {
	            if(!app.watchListMap){
	            	this.$el.html("Retriveing WATCHLISTTT");
	            	console.log("NO wathclist");
	            	var url = 'https://apis.tdameritrade.com/apps/100/GetWatchlists;jsessionid='+app.userProfileModel.get('session-id');
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
					       app.watchListMap = {};
					       var watchlists = jsonResponse.amtd["watchlist-result"]["watchlist"];
					       	for(var i=0;i <watchlists.length;i++){
					       		var wl = watchlists[i];
					       		var id = wl.id;
					       		var name = wl.name;
					       		var wlc = new WatchListModelCollection();
					       		app.watchListMap[name] = wlc;
					       		
					       		var wlsymbol = wl["symbol-list"]["watched-symbol"];
					       		for(var j=0;j <wlsymbol.length;j++){
					       			var symboldetails = wlsymbol[j];
					       			var avgPrice = symboldetails["average-price"];
					       			var quantity = symboldetails["quantity"];
					       			var assetType = symboldetails["security"]["asset-type"];
					       			var desc = symboldetails["security"]["description"];
					       			var symbol = symboldetails["security"]["symbol"];
					       			
					       			var wlObj = new WatchListModel({symbol:symbol,description:desc,assetType:assetType});
					       			wlc.add(wlObj);
					       		}
					       	}
					       	//var template = _.template($('#watch-list-template').html(), {coll:wlc,wlmap:app.watchListMap});
						//this.$el.html(template);
						
						// This is an error
						//Backbone.history.navigate('watchlist', true); 
						app.watchlistView.collection = wlc;
						app.watchlistView.render();
						app.watchlistView.collection.on("change",app.watchlistView.update);
						app.watchlistView.collection.on("add",app.watchlistView.render);
						
					}
					console.log(jsonResponse);

				},
				error:function(data){
					console.log(data);
				}
			});
	            	
	            }else{
	            	//this.$el.html("showing WATCHLISTTT");
	            	var template = _.template($('#watch-list-template').html(), {coll:this.collection,wlmap:app.watchListMap});
			this.$el.html(template);
			app.currentWLMap= {};
			var symbols='';
			this.collection.each(function(model){
				symbols = symbols+","+model.get('symbol');
				app.currentWLMap[model.get('symbol')]=model;
			});
			addLevel1QuoteSubscription(symbols);
	            }
        	}
		
	},
	
	renderList: function(name){
		var symbols='';
		this.collection.each(function(model){
			symbols = symbols+","+model.get('symbol');
			app.currentWLMap[model.get('symbol')]=model;
		});
		unSubscribeLevel1QuoteSubscription(symbols);
		var wlc = app.watchListMap[name];
		app.watchlistView.collection = wlc;
		app.watchlistView.render();
		app.watchlistView.collection.on("change",app.watchlistView.update);
		app.watchlistView.collection.on("add",app.watchlistView.render);
		
	},
	update: function(model) {
		//this.collection.each(this.renderOne);
		var diff = model.changedAttributes();
		for(var att in diff){
			console.log(" callingge  ..."+att);
			$("#"+model.cid+att).text(model.get(att));
		}				
	}
});