
// Main Application View


var MainView = Backbone.View.extend({
	el: '.page',
	loginView: {},
	initialize: function(){
		console.log("initialize");
		
		loginView = new LoginView();
		loginView.render();
		this.render();
	},		

	render: function() {
		console.log('rendering');
	}
});