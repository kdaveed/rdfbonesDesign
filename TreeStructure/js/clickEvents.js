
var clickEvents = {
		
		
	addBone : function(classLabel){
		UIController.saveBone(classLabel)
	},
	
	openAll : function(){

		$("div#" + HTMLElements.classViewerID + " img").each(function(){
			if($(this).attr("src").indexOf("plus") > -1){
				$(this).parent().hide()
			} else {
				$(this).parent().show()
			}
		})
		$.each(classHierarcyVars.childrenGroupDivs, function(index, value){
			value.show()
		})
	},	
	
	closeAll : function(){
		
		$("div#" + HTMLElements.classViewerID + " img").each(function(){
			console.log($(this).attr("src"))
			if($(this).attr("src").indexOf("plus") > -1){
				$(this).parent().show()
			} else {
				$(this).parent().hide()
			}
		})
		$.each(classHierarcyVars.childrenGroupDivs, function(index, value){
			value.hide()
		})
	},
		
	plusImage : function(icon, childrenContainer){
		UIController.showPlus(icon, $(this))
		console.log(childrenContainer)
		childrenContainer.show()
		console.log("Plus")
	},

	minusImage : function(icon, childrenContainer){
		UIController.showMinus(icon, $(this))
		childrenContainer.hide()
	},
	
	searchForString : function(textValue){
		dataOperations.searchForString(textValue.toLowerCase())
	}
}

