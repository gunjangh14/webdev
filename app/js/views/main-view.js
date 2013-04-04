
// Main Application View


var MainView = Backbone.View.extend({
	el: '.page',
	loginView: {},
	initialize: function(){
		console.log("initialize");

        //TODO: check to see if session is valid -  For now if the api returns invalid session please set the user model to {}
		if ( !is_empty(app.userProfileModel)) {
            loginView = new LoginView();
            loginView.render();
        }
        else {
            this.render();
        }


	},		

	render: function() {
		console.log('rendering');
	}
});