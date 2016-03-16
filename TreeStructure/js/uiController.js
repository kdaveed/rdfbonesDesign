
var clickEvents = {
		
	openAll : function(){
		console.log("div#" + HTMLElements.classViewerID + " img")
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
		console.log("div#" + HTMLElements.classViewerID + " img")
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
		childrenContainer.show()
		console.log("Plus")
	},

	minusImage : function(icon, childrenContainer){
		UIController.showMinus(icon, $(this))
		childrenContainer.hide()
	}
}


var classTreeController = {
	
	init : function (){
		this.initClickEvents()
		dataOperations.createClassHierachryData(classes)
		this.showHiearchy()
	},	
	
	initClickEvents : function(){
		HTMLElements.closeAllDiv.click(function(){
			clickEvents.closeAll()
		})
		
		HTMLElements.openAllDiv.click(function(){
			clickEvents.openAll()
		})
	},
		
	showHiearchy : function(){
		console.log(classHierarcyVars.parents)
		$.each(classHierarcyVars.parents, function(index, value){
			HTMLElements.classViewer.append(classTreeController.getChildrenDiv(value, false))
		})
	},

	getChildrenDiv : function (parent, hidden){
		
		var container = UIElements.getChildrenContainer()
		var className = UIElements.getClassNameDiv(parent.label)
		var childrenContainer = ui.getNewDiv()
		$.each(parent.children, function(index, value){
			childrenContainer.append(classTreeController.getChildrenDiv(value,true))
		})
		
		if(parent.children.length > 0){
			var plusImage = UIElements.getPlusImg().click(function(){
				clickEvents.plusImage($(this), childrenContainer)
			})
			var minusImage = UIElements.getMinusImg().click(function(){
				clickEvents.minusImage($(this), childrenContainer)
			})
			container.append(plusImage.hide()).append(minusImage)
			classHierarcyVars.saveChildrenGroupDiv(childrenContainer)
		} else {
			var fillerDiv = UIElements.getFillerDiv()
			container.append(fillerDiv)
		}
		container.append(className)
		container.append(childrenContainer)
		if(!hidden){
		}
		return hidden ? container : container 
	}
}




classTreeController.init()

