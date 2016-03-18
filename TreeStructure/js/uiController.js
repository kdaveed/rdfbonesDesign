var UIController = {

	init : function() {
		this.initClickEvents()
		
		dataOperations.makeMaps(classes)
		//dataOperations.createClassHierachryData(classes)
		this.createHierarchy()
	},

	initClickEvents : function() {
		HTMLElements.closeAllDiv.click(function() {
			clickEvents.closeAll()
		})

		HTMLElements.openAllDiv.click(function() {
			clickEvents.openAll()
		})
	},
	

	/***************************************************************************
	 * Initialize 
	 **************************************************************************/
	
	createHierarchy : function() {
		console.log("Create Hieararchy")
		$.each(classHierarcyVars.parents, function(index, value) {
			console.log(value.label)
			HTMLElements.classViewer.append(UIController.getChildrenDiv(value))
		})
		console.log(classHierarcyVars.parents)
	},
	
	getChildrenDiv : function(parent) {

		var container = UIConstants.getChildrenContainer()
		var className = UIConstants.getClassNameDiv(parent.label)
		var childrenContainer = ui.getNewDiv()
		$.each(parent.children, function(index, value) {
			childrenContainer.append(UIController.getChildrenDiv(value))
		})

		if (parent.children.length > 0) {

			var plusImage = UIConstants.getPlusImg().click(function() {
				clickEvents.plusImage($(this), childrenContainer)
			})
			parent.plusButton = plusImage

			var minusImage = UIConstants.getMinusImg().click(function() {
				clickEvents.minusImage($(this), childrenContainer)
			})
			parent.minusButton = minusImage
			// Initially every element is closed
			container.append(plusImage).append(minusImage.hide())
			classHierarcyVars.saveChildrenGroupDiv(childrenContainer)
		} else {
			var fillerDiv = UIConstants.getFillerDiv()
			container.append(fillerDiv)
		}
		container.append(className)
		container.append(childrenContainer.hide())
		
		parent.div = container
		
		return container
	},
	
	/***************************************************************************
	 * Search Results 
	 **************************************************************************/
	deleteResults : function() {
		$.each(classHierarcyVars.parents, function(index, value) {
			value.div.hide()
		})
	},
	
	showSearchResults : function() {
		$.each(classHierarcyVars.parents, function(index, value) {
			if(value.toDisplay){
				console.log("ToDisplay " + index + " label " + value.label)
				UIController.setDisplay(value)
				if (value.childToDisplay) {
					UIController.showChildrenDiv(value)
				}
			} else {
				//value.div.addClass("redBorder")
				value.div.hide()
			}
		})
	},

	showChildrenDiv : function(parent) {
		$.each(parent.children, function(index, value) {
			if (value.toDisplay) {
				UIController.setDisplay(value)
				if (value.childToDisplay) {
					UIController.showChildrenDiv(value)
				}
			} else {
				value.div.addClass("redBorder")
			}
		})
	},


	setDisplay : function(element) {

		element.div.show()
		if (element.children.length > 0) {
			if (element.childToDisplay) {
				element.plusButton.hide()
				element.minusButton.show()
			} else {
				element.plusButton.hide()
				element.minusButton.show()
			}
		}
	},

	showPlus : function(icon) {
		icon.next().css("display", "inline-block")
		icon.hide()
	},

	showMinus : function(icon) {
		icon.prev().css("display", "inline-block")
		icon.hide()
	}
}
