var app = app || {};

var WatchListModel = Backbone.Model.extend({
	defaults:{
		symbol:"",
		bid:"",
		ask:"",
		last:"",
		change:"",
		changePercent:"",
		description:""
	},
	initialize: function(){
		console.log(" initialise watch list object");

	},

	symbol: function(){
	   this.symbol;
	},

	bid: function(){
	   this.symbol;
	}
});