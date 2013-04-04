	var app = app || {};

	<!-- Router -->
	var Router = Backbone.Router.extend({
		routes: {
			'':'home',
			'watchlist':'watchlist'
		}	
	});

    app.router = new Router();

    app.router.on('route:home',function(actions){
        app.mainView.render();

    });
	
	app.router.on('route:watchlist',function(actions){
		
        app.watchlistView.render();

    });


