
var app = app || {};
// Make the sure the DOM is loaded before go and do something
$(function() {
	console.log('starting application');

	app.mainView = new MainView();
	app.watchlistView = new WatchlistView();
    Backbone.history.start();
});