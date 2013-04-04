	var app = app || {};

	<!-- Router -->
	var Router = Backbone.Router.extend({
		routes: {
			'':'home'
		}	
	});

    app.router = new Router();

    app.router.on('home',function(actions){
        app.mainView.render();

    });


