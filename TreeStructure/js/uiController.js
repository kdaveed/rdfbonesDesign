
var classTreeController = {
	
	init : function (){
		this.initClickEvents()
		dataOperations.createClassHierachryData(classes)
		this.showHiearchy(false, true)
	},	
	
	initClickEvents : function(){
		HTMLElements.closeAllDiv.click(function(){
			clickEvents.closeAll()
		})
		
		HTMLElements.openAllDiv.click(function(){
			clickEvents.openAll()
		})
	},
		
	showHiearchy : function( showAll, singleBone){
		console.log(classHierarcyVars.parents)
		$.each(classHierarcyVars.parents, function(index, value){
			HTMLElements.classViewer.append(classTreeController.getChildrenDiv(value, singleBone))
		})
		if(showAll){
			clickEvents.openAll()
		}
	},
	
	getChildrenDiv : function (parent, singleBone){
		
		var container = UIElements.getChildrenContainer()
		var className = UIElements.getClassNameDiv(parent.label)
		var childrenContainer = ui.getNewDiv()
		$.each(parent.children, function(index, value){
			childrenContainer.append(classTreeController.getChildrenDiv(value, singleBone))
		})
		
		if(parent.children.length > 0){
			
			if(!singleBone){
				className.addClass("classToSelect")
			} else {
				className.addClass("classNotToSelect")
			}
			
			var plusImage = UIElements.getPlusImg().click(function(){
				clickEvents.plusImage($(this), childrenContainer)
			})
			var minusImage = UIElements.getMinusImg().click(function(){
				clickEvents.minusImage($(this), childrenContainer)
			})
			container.append(plusImage).append(minusImage.hide())
			classHierarcyVars.saveChildrenGroupDiv(childrenContainer)
		} else {
			var fillerDiv = UIElements.getFillerDiv()
			container.append(fillerDiv)
			/*******************************************************************
			 * If we are creating a list for the single bone input the only the 
			 * has to be clickable that do not have children
			 *******************************************************************/	
			className.addClass("classToSelect")
		}
			
		
		container.append(className)
		container.append(childrenContainer.hide())

		return container
	}
}


classTreeController.init()

