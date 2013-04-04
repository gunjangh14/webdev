

// Make the sure the DOM is loaded before go and do something

$(function() {
	console.log('starting application');
	var userProfileModel = new UserProfileModel();
	new MainView();
});