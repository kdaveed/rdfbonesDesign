
var clickEvents = {
		
	/***************************************************************************
	 * Creating new bones 
	 **************************************************************************/	
	addBone : function(classLabel){
		UIController.showCompleteIncomplete()
		UIController.saveBoneInScope(classLabel)
	},
	
	selectComplete : function(){
		
	},
	
	selectIncomplete : function(){
		
	},
	
	exitNewBone : function(){
		UIController.hideCompleteIncomplete()
		UIController.saveBoneInScope("")
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
		DATAsearchForString(textValue.toLowerCase())
	},
	
	/***************************************************************************
	 * Show bone editor
	 **************************************************************************/
	
	textSaveClick : function(type){
		
		dataEdit.setDivValue(type)
		dataEdit.getSaveButton(type).hide()
		if(dataEdit.getTextField(type).val() == null){
			dataEdit.getAddButton(type).show()
		} else { //There are value
			dataEdit.getEditButton(type).show()
		}
	},
	
	textEditClick : function(type){
		
		dataEdit.setTextBoxValue(type)
		if(dataEdit.getTextField(type).val() == null){
			dataEdit.disableClear()
		} else {
			dataEdit.enableClear()
		}
		dataEdit.getEditButton(type).hide()
		dataEdit.getClearButton(type).show()
		dataEdit.getSaveButton(type).show()
	},
	
	clearSetter : function(type){
		if(dataEdit.getTextField(type).val() == 0){
			dataEdit.disableClear()
		} else {
			dataEdit.enableClear()
		}	
	}
}

