var UIController = {

	/***************************************************************************
	 * Modules that are callable
	 **************************************************************************/

	modules : new Object(),	
	
	showBoneEditor : function(data){
		this.modules["boneEditor"].show(data)
	},
	
	init : function() {
		this.initClickEvents()

		treeData.makeMaps(classes)
		// DATAcreateClassHierachryData(classes)
		this.createHierarchy()
		this.createSingleHierarchy()
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
		$.each(classHierarcyVars.parents, function(index, value) {
			HTMLElements.selectCoherentClass.append(UIController
					.getChildrenDiv(value, false))
		})
	},

	createSingleHierarchy : function() {
		$.each(classHierarcyVars.parents, function(index, value) {
			HTMLElements.selectSingleClass.append(UIController.getChildrenDiv(
					value, true))
		})
	},

	getChildrenDiv : function(parent, single) {

		var container = UIConstants.getChildrenContainer()
		var classNameNameContainer = UIConstants.getClassNameDiv()
		var className1 = UIConstants.getClassNameDiv(parent.label)
		var searchHit = UIConstants.getSearchHitDiv()
		var className2 = UIConstants.getClassNameDiv()
		classNameNameContainer.append(className1).append(searchHit).append(
				className2)

		var childrenContainer = html.getNewDiv()
		$.each(parent.children, function(index, value) {
			childrenContainer
					.append(UIController.getChildrenDiv(value, single))
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
			container.prepend(minusImage.hide()).prepend(plusImage)
			classHierarcyVars.saveChildrenGroupDiv(childrenContainer)
			if (!single) {
				classNameNameContainer.append(UIConstants
						.addInstanceImg(parent.label))
			}
		} else {
			var fillerDiv = UIConstants.getFillerDiv()
			container.prepend(fillerDiv)
			classNameNameContainer.append(UIConstants
					.addInstanceImg(parent.label))
		}

		container.append(classNameNameContainer)
		container.append(childrenContainer.hide())

		parent.div = container
		parent.className1 = className1
		parent.searchHit = searchHit
		parent.className2 = className2
		parent.childrenContainer = childrenContainer
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
		// console.log(classHierarcyVars.parents)
		$.each(classHierarcyVars.parents, function(index, value) {
			if (value.toDisplay) {
				// console.log("ToDisplay " + index + " label " + value.label)
				value.div.show()
				if (value.searchIndex > -1) {
					UIController.displaySearchHit(value)
				} else {
					UIController.displayNoSearchHit(value)
				}
				if (value.childToDisplay) {
					UIController.setDisplay(value)
					UIController.showChildrenDiv(value)
				}
			} else {
				// value.div.addClass("redBorder")
				value.div.hide()
			}
		})
	},

	showChildrenDiv : function(parent) {
		$.each(parent.children, function(index, value) {
			if (value.toDisplay) {
				// console.log("ToDisplay " + index + " label " + value.label)
				value.div.show()
				if (value.searchIndex > -1) {
					UIController.displaySearchHit(value)
				} else {
					UIController.displayNoSearchHit(value)
				}
				if (value.childToDisplay) {
					UIController.setDisplay(value)
					UIController.showChildrenDiv(value)
				}
			} else {
				value.div.hide()
			}
		})
	},

	displaySearchHit : function(element) {
		console.log("searchindex + " + element.searchIndex)
		element.className1
				.text(element.label.substring(0, element.searchIndex))
		element.searchHit.text(element.label.substring(element.searchIndex,
				element.searchIndex + classHierarcyVars.searchStringLength))
		element.className2.text(element.label.substring(element.searchIndex
				+ classHierarcyVars.searchStringLength))
	},

	displayNoSearchHit : function(element) {
		element.className1.text(element.label)
		element.searchHit.text("")
		element.className2.text("")
	},

	setDisplay : function(element) {

		element.childrenContainer.show()
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
	},

	saveBone : function(classLabel) {
		console.log(classLabel)
		HTMLElements.selectCoherentClass.hide()
		HTMLElements.editBone.show()
		HTMLElements.subBoneContainer.hide()
		// $.each(classHierarcyVars.parents, function(index, value){
		if (classHierarcyVars.classObjects[classLabel].children.length > 0) {
			HTMLElements.subBoneContainer.show()
			$.each(classHierarcyVars.classObjects[classLabel].children,
					function(index, val) {
						HTMLElements.treeStructureContainer.append(UIController
								.getChildrenDiv(val, false))
					})
		}
		HTMLElements.selectCoherentClass.hide()
		HTMLElements.selectSingleClass.hide()

	},

	/***************************************************************************
	 * Creating new bones
	 **************************************************************************/

	showCompleteIncomplete : function() {
		HTMLElements.completeIncomplete.show()
	},

	hideCompleteIncomplete : function() {
		HTMLElements.completeIncomplete.hide()
	},

	showBoneEditor : function(instanceUri, singleBone) {

	},
}