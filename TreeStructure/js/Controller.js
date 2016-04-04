var Controller = {
		
	/***************************************************************************
	 * Creating new bones 
	 **************************************************************************/

	openSingleBoneEditor : function(uri){
		
		UIController.showBoneEditor(singleBones.uri) 
	},
		
	openCoherentBoneViewer : function(uri){
		
		UIController.showBoneEditor(coherentBones.uri) 
	},
	
	plusImage : function(icon, childrenContainer){
		UIController.showPlus(icon, $(this))
		childrenContainer.show()
		console.log("Plus")
	},

	minusImage : function(icon, childrenContainer){
		UIController.showMinus(icon, $(this))
		childrenContainer.hide()
	},
	
}