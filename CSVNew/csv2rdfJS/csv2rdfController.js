var csv2rdfController = {

	/***************************************************************************
	 * FileIO
	 **************************************************************************/
	readInFile : function(file) {

		var reader = new FileReader();
		reader.onload = function(progressEvent) {
			// By lines
			var lines = this.result.split('\n')
			csv2rdfData.csvLines = lines
			console.log(csv2rdfData.csvLines)
			var titles = lines[0].split(csv2rdfData.delimiter)
			//If the file is read the step with the state
			csv2rdfStates.state += 1
			csv2rdfStateUI.set()
			$.each(titles, function(index, value) {
				var titleDiv = csv2rdfUI.addCSVTitles(value)
				titleDiv.appendTo(csv2rdfHTML.literalsDiv)
				titleDiv.click(function() {
					csv2rdfClickEvents.selectLiteral($(this))
				})
				csv2rdfData.csvTitles.push(value)
			})
		}
		reader.readAsText(file);
	},
	
	getColumnValues : function(columnName){
		
		var valueList = []
		columnNum = csv2rdfData.csvTitles.indexOf(columnName)
		$.each(csv2rdfData.csvLines, function(index, value){
			if(index > 0){
				data = value.split(csv2rdfData.delimiter)
				if(valueList.indexOf(data[columnNum]) == -1){
					valueList.push(data[columnNum])
				}
			}
		})
		return valueList
	},
	
	/***************************************************************************
	 * Dependent Instance
	 **************************************************************************/
	
	addDependentInstance : function(){
		csv2rdfStates.setOnGoingMappingDefinition()
		csv2rdfStates.setSaveTypeLiteralForMapping()
		csv2rdfUI.setLiteralSelectState()
	},
	
	createMapping : function(div){
		
		var columnName = div.text()
		csv2rdfData.initiateMappingDataSet(columnName)
		list = csv2rdfController.getColumnValues(div.text())
		//Remove the last element. It is always an undefined
		list.pop()
		index = list.indexOf("")
		if (index > -1) {
			list.splice(index, 1);
			list.push("Empty")
		}
		csv2rdfData.numberOfDistinctValues = list.length
		container = csv2rdfUI.initiateMapping(columnName, list)
		//Reset literalsSelectState
		csv2rdfUI.resetLiteralSelectState()
		csv2rdfStates.setSaveTypeDisabled()
		//Remove literal div from the list
		div.remove()
	},
	
	/***************************************************************************
	 * New Instance
	 **************************************************************************/
	returnClass : function(variable, classUri){
		if(csv2rdfStates.onGoingMappingDefinition){
			//UI
			csv2rdfUIData.setVariables(csv2rdfData.variableInScope, csv2rdfData.valueInScope)
			csv2rdfUIData.getSelectedClass().text(variable)
			csv2rdfUIData.getEmptyDiv().hide()
			csv2rdfUIData.getClassSelectorDiv().hide()
			csv2rdfUIData.getModifyButton().css('display', 'inline-block')
			//DATA
			csv2rdfData.saveClassToValue(classUri, variable)
			csv2rdfData.numberOfSetValues++
			if(csv2rdfData.numberOfSetValues == csv2rdfData.numberOfDistinctValues){
				csv2rdfUIData.getSaveButton().show()
			}
		} else {
			this.addNewInstance(variable, classUri)
		}
	},
	
	addNewInstance : function(variable, classUri) {
		var varName = csv2rdfData.getInstanceVarName(variable.replace(/ /g, ""))
		var newInstance = csv2rdfUI.addNewInstance(varName)
		csv2rdfData.triplesToStore.push({
			subject : varName,
			predicate : "rdf:type",
			object : classUri
		})
		csv2rdfData.tripleDivs.push(new Object())
		csv2rdfUI.addTypeTriple(classUri)
		//We do it only once
		if (csv2rdfStates.state == 2) {
			csv2rdfStates.state += 1
			csv2rdfStateUI.set()
		}
	},
	
	/***************************************************************************
	 * Triple Creation
	 **************************************************************************/
	addTriple : function() {
		csv2rdfStates.saveMode = csv2rdfStateConstants.saveMode.saveNewTriple
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.instanceAsSubject
		csv2rdfData.newTriple()
		this.selectSubject()
	},

	/***************************************************************************
	 * Subject
	 **************************************************************************/
	selectSubject : function() {
		csv2rdfUI.setInstanceSelectState()
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.instanceAsSubject
		var tmpDiv = null
		switch(csv2rdfStates.saveMode){
			case csv2rdfStateConstants.saveMode.saveNewTriple :
				tmpDiv = csv2rdfUI.addSubjectTmpDiv()
				break
			case csv2rdfStateConstants.saveMode.modifyTriple :
				tmpDiv = csv2rdfUI.replaceSubjectDivWithTmp(csv2rdfData.getSubjectDiv())
				break
		}
		csv2rdfData.saveSubjectDiv(tmpDiv)
	},

	saveSubject : function(div) {
		//UI
		csv2rdfUI.resetInstanceSelectState()
		var subjectDiv = csv2rdfUI.resetSubject(div, csv2rdfData.getSubjectDiv())
		//DATA
		console.log("subjectDiv")
		console.log(subjectDiv)
		csv2rdfData.saveSubjectDiv(subjectDiv)
		csv2rdfData.saveSubjectUri(div.text())
		
		switch(csv2rdfStates.saveMode){
			case csv2rdfStateConstants.saveMode.saveNewTriple :
				//We go further
				csv2rdfStates.saveType = csv2rdfStateConstants.saveType.disabled
				this.predicateSelectState()
				break;
			case csv2rdfStateConstants.saveMode.modifyTriple :
				//Just add the modify click event
				subjectDiv.addClass(csv2rdfCSS.modifyNode)
					.click(csv2rdfClickEvents.modifySubject)
				break;
			}	
	},

	/***************************************************************************
	 * Predicate
	 **************************************************************************/
	predicateSelectState : function() {
		//UI
		var predTmpDiv = csv2rdfUI.addPredicateTmpDiv()
		csv2rdfData.savePredicateDiv(predTmpDiv)
	},

	saveProperty : function(property, objectType) {
		//UI
		var currentPredDiv = csv2rdfData.getPredicateDiv()
		predicateDiv = csv2rdfUI.resetPredicate(property.name, currentPredDiv)

		//DATA
		csv2rdfData.savePredicateDiv(predicateDiv)
		csv2rdfData.saveProperty(property, objectType)
		
		switch(csv2rdfStates.saveMode){
			case csv2rdfStateConstants.saveMode.saveNewTriple :
				csv2rdfStates.mapObjectTypeToSaveType(objectType)
				this.selectObject(objectType)
				break
			case csv2rdfStateConstants.saveMode.modifyTriple :
				predicateDiv.click(csv2rdfClickEvents.modifyPredicate)
				csv2rdfStates.saveType = csv2rdfStateConstants.saveType.disabled
				break
		}
	},

	/***************************************************************************
	 * Object
	 **************************************************************************/
	
	selectObject : function(objectType) {
		//GUI AND STATE SETTING WRT. objectType
		var tmpObjectDiv = csv2rdfUI.setObjectSelectorState(objectType)
		console.log("tempObjDiv")
		console.log(tmpObjectDiv)
		switch(csv2rdfStates.saveMode){
			case csv2rdfStateConstants.saveMode.saveNewTriple :
				//If new then we do not have object tmp div yet
				csv2rdfUI.addInstanceTmpDiv(tmpObjectDiv)
				break
			case csv2rdfStateConstants.saveMode.modifyTriple :
				var objectDiv = csv2rdfData.getObjectDiv()
				csv2rdfUI.replaceObjectDivWithTmp(objectDiv, tmpObjectDiv)
				break
		} 
		csv2rdfData.saveObjectDiv(tmpObjectDiv)
	},
	
	saveObject : function(div, objectType) {
		var objectDiv = csv2rdfUI.resetObject(div, csv2rdfData.getObjectDiv(), objectType)
		//DATA
		csv2rdfData.saveObjectDiv(objectDiv)
		csv2rdfData.saveObject(div.text(), objectType)
		
		switch(csv2rdfStates.saveMode){
			case csv2rdfStateConstants.saveMode.saveNewTriple :
				this.tripleReady()
				break;
			case csv2rdfStateConstants.saveMode.modifyTriple :
				//SET STATE
				csv2rdfStates.saveType = csv2rdfStateConstants.saveType.disabled
				//SET TO BE A SELECTOR
				objectDiv.addClass(csv2rdfCSS.modifyNode)
					.click(
						{objectType : objectType},
						csv2rdfClickEvents.modifyObject)
				break;
			default : break;
		}
	},
	
/*******************************************************************************
 * Triple ready
 ******************************************************************************/
	tripleReady : function(){
		csv2rdfStates.saveMode = csv2rdfStateConstants.saveMode.initial
		csv2rdfData.Type = csv2rdfStateConstants.saveType.disabled
		csv2rdfHTML.modifyImgContainer.append(
				csv2rdfUIConstant.editContainer(csv2rdfData.reference))	
	},
	
	exitSaveModeState : function(saveButton, tripleNum){
		
		csv2rdfStateConstants.setInitialMode()
		csv2rdfUI.replaceSaveButtonToEditContainer(saveButton, tripleNum)
	},
	
	enterModifyTripleState : function(editContainer, tripleNum){
		//MODE
		csv2rdfStateConstants.setModifyMode()
		csv2rdfData.reference = tripleNum
		//Making the nodes as link
		var subjectNode = csv2rdfData.tripleDivs[csv2rdfData.reference].subject
		var predicateNode = csv2rdfData.tripleDivs[csv2rdfData.reference].predicate
		var objectNode = csv2rdfData.tripleDivs[csv2rdfData.reference].object
		//CLICK EVENTS
		subjectNode.click(csv2rdfClickEvents.modifySubject)
		predicateNode.click(csv2rdfClickEvents.modifyPredicate)
		objectNode.click(
				{objectType : csv2rdfData.triplesToStore[csv2rdfData.reference].object.type}
				,csv2rdfClickEvents.modifyObject
			)
		//CSS
		csv2rdfUI.addModifyCSS(subjectNode)
		csv2rdfUI.addModifyCSS(predicateNode)
		csv2rdfUI.addModifyCSS(objectNode)
		csv2rdfUI.replaceEditContainerToSaveButton(tripleNum, editContainer)
	},
	
	deleteTriple : function(deleteContainer, tripleNum){
		csv2rdfUI.removeTripleDivs(tripleNum)
		csv2rdfUI.removeDeleteIcon(deleteContainer)
		csv2rdfData.deleteTriple(tripleNum)
	},
	
	addModfiyClickEvents : function(nodeDiv, type){
		nodeDiv.addClass(csv2rdfCSS.modifyNode)
		switch(type){
		case "subject" : nodeDiv.click(csv2rdfClickEvents.modifySubject)
				break
		case "predicate": nodeDiv.click(csv2rdfClickEvents.modifyPredicate)
				break
		case "object": nodeDiv.click(csv2rdfClickEvents.modifyInstanceObject)
				break
		case "literal": nodeDiv.click(csv2rdfClickEvents.modifyDataObject)
				break
		}
	},
	
	removeModifyChanges : function(node){
		nodeDiv.removeClass(csv2rdfCSS.modifyNode)
		nodeDiv.unbind("click")
	},
}
