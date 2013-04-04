
// WATCH LIST View


var WatchlistView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
		console.log("Watch initialize "+app.userProfileModel);
	},		

	render: function() {
		console.log('rendering');
		this.$el.html("WATCHLISTTT");
	}
});