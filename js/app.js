	// logged in stated
	var loggedIn = false;
	// create router
	var router = new app.Router();

	var loginView = new app.LoginView();

	var userProfileModel = new app.UserProfile ();

	router.on('route:home', function () {
		
		if(!loggedIn) {
			
			loginView.render();

		} 

	});



	Backbone.history.start();