var HTMLElements = {
	
	init : function(){
		this.initObjects()
		this.initEventlListeneres()
	},
	
	initObjects : function(){
		this.filterContainer = $("#filterContainer")
		this.search = $("#search")
		this.classViewerID = "classViewer"
		this.classViewer = $("#classViewer")
		this.openAllDiv = $("#openAll")
		this.closeAllDiv = $("#closeAll")
	},
	
	initEventlListeneres : function(){
		this.search.on("focus", function(){
	        $(this).val("");
	    }).keyup(function(){
	    	clickEvents.searchForString($(this).val())
	    })
	}
}


$(document).ready(function(){
	HTMLElements.init()
	UIController.init()
})