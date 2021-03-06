
var UIController = {
		
	showPlus : function(icon){
		icon.next().css("display", "inline-block")
		icon.hide()
	},
	
	showMinus : function(icon){
		icon.prev().css("display", "inline-block")
		icon.hide()
	}
}


var UIElements = {
		
		classViewerId : "classViewer",
		classViewer : $("#classViewer"),
		
		getChildrenContainer : function(){
			return ui.getNewDiv("childrenContainer")
		},
		
		getClassNameDiv : function(classLabel){
			return ui.getNewDivT(classLabel).addClass("classLabel")
		},
	
		getPlusImg : function(){
			var container = ui.getNewDiv("imgContainer")
			var img = $("<img/>")
				.attr("src", UIConstants.plusImgSrc)
			return container.append(img)
		},

		getMinusImg : function(){
			var container = ui.getNewDiv("imgContainer")
			var img = $("<img/>")
				.attr("src", UIConstants.minusImgSrc)
			return container.append(img)
		},
		
		getArrowImg : function(){
			var container = ui.getNewDiv("imgContainer")
			var img = $("<img/>")
				.attr("src", UIConstants.arrowImgSrc)
			return container.append(img)
		},
		
		getFillerDiv : function(){
			return ui.getNewDiv("imgContainer")
		}
}

var UIConstants = {
		
		minusImgSrc : "img/minus.png",
		plusImgSrc : "img/plus.png",
		arrowImgSrc : "img/arrows.png",
}


var HTMLElements = {
	
	classViewerID : "classViewer",
	classViewer : $("#classViewer"),
	openAllDiv : $("#openAll"),
	closeAllDiv : $("#closeAll"),
}


