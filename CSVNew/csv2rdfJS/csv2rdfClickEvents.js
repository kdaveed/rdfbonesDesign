var csv2rdfClickEvents = {

	/***************************************************************************
	 * Add dependent and constant instance
	 **************************************************************************/

	addDependentInstance : function() {
		if (csv2rdfStates.state >= 2) {
			if (!csv2rdfStates.onGoingMappingDefinition) {
				csv2rdfController.addDependentInstance()
			} else {
				alert("Please finish the mapping definition process!")
			}
		}
	},



	/***************************************************************************
	 * Class selection, empty, modify
	 **************************************************************************/

	classSelectionForMapping : function(variableInScope, value) {
		// Prepare data for the arrival of the class selection
		csv2rdfData.variableInScope = variableInScope
		csv2rdfData.valueInScope = value
		ontologyViewerElements.startClassViewer()
	},

	emptySelectionForMapping : function(variableInScope, value) {
		csv2rdfUIData.setVariables(csv2rdfData.variableInScope, csv2rdfData.valueInScope)
		csv2rdfUIData.getSelectedClass(variableInScope, value).text("No instance is created")
		csv2rdfUIData.emptyDiv().hide()
		csv2rdfUIData.getClassSelectorDiv().hide()
		csv2rdfUIData.getModifyButton().show()
	},

	modifyValueMapping : function(variableInScope, value) {
		
		csv2rdfStates.setOnGoingMappingDefinition()
		csv2rdfUIData.setVariables(csv2rdfData.variableInScope, csv2rdfData.valueInScope)
		// Hide both because we do not which were selected
		csv2rdfUIData.getSelectedClass().hide()
		csv2rdfUIData.emptyDiv().show()
		csv2rdfUIData.getClassSelectorDiv().show()
		csv2rdfUIData.getModifyButton().hide()
		csv2rdfUIData.getSaveButton().hide()
	},

	modifyVariableMapping : function(variableInScope) {
		// Hide both because we do not which were selected
		if(csv2rdfStates.onGoingMappingDefinition == false){
			csv2rdfUIData.getClassSelectorDiv(variableInScope, value).show()
			for (var key in csv2rdfUIData.valueMapElements[variableInScope]["values"]){
				csv2rdfUIData.valueMapElements[variableInScope]["values"][key]["modify"].show()
			}
			csv2rdfUIData.getSaveButton(variableInScope).show()
		}
	},
	
	saveVariableMapping : function(variableInScope){
		for (var key in csv2rdfUIData.valueMapElements[variableInScope]["values"]){
			csv2rdfUIData.valueMapElements[variableInScope]["values"][key]["modify"].hide()
		}
		csv2rdfStates.resetOnGoingMappingDefinition()
	},
	
	/***************************************************************************
	 * New Instance
	 **************************************************************************/
	selectClass : function() {
		if (csv2rdfStates.state >= 2) {
			if (!csv2rdfStates.onGoingMappingDefinition) {
				ontologyViewerElements.startClassViewer()
			} else {
				alert("Please finish the mapping definition process!")
			}
		}
	},
	
	/***************************************************************************
	 * Instance and Literal Selection
	 **************************************************************************/

	selectInstanceToTriple : function(div) {

		switch (csv2rdfStates.saveType) {
		case csv2rdfStateConstants.saveType.instanceAsSubject:
			csv2rdfController.saveSubject(div)
			break;
		case csv2rdfStateConstants.saveType.instanceAsObject:
			csv2rdfController.saveObject(div,
					csv2rdfStateConstants.objectTypes.instance)
			break;
		}
	},

	selectLiteral : function(div) {

		switch (csv2rdfStates.saveType) {
		case csv2rdfStateConstants.saveType.literalAsObject:
			csv2rdfController.saveObject(div,
					csv2rdfStateConstants.objectTypes.literal)
			break
		case csv2rdfStateConstants.saveType.literalForMapping:
			csv2rdfController.createMapping(div)
			break
		}
	},

	/***************************************************************************
	 * New Triple
	 **************************************************************************/

	addNewTriple : function() {
		if (csv2rdfStates.state >= 3
				&& csv2rdfStates.saveMode == csv2rdfStateConstants.saveMode.initial) {
			csv2rdfController.addTriple()
		}
	},

	/***************************************************************************
	 * EditGUI
	 **************************************************************************/

	modifyTriple : function(editContainer, num) {
		if (csv2rdfStateConstants.isInitialMode()) {
			return csv2rdfController.enterModifyTripleState(editContainer, num)
		}
	},

	exitModifyMode : function(saveButton, num) {
		return csv2rdfController.exitSaveModeState(saveButton, num)
	},

	deleteTriple : function(deleteContainer, num) {
		if (csv2rdfStateConstants.isInitialMode()) {
			csv2rdfController.deleteTriple(deleteContainer, num)
		}
	},

	saveModification : function(saveButton) {
		if (csv2rdfData.pendingModification == 0) {
			csv2rdfData.modifyState = false
			csv2rdfUI.replaceSaveButtonToImg(csv2rdfData.reference, saveButton)
			csv2rdfData.resetReference()
		}
	},

	/***************************************************************************
	 * Modify Events
	 **************************************************************************/

	modifySubject : function() {
		// We just define for the click event
		if (csv2rdfStates.saveMode == csv2rdfStateConstants.saveMode.modifyTriple) {
			csv2rdfStates.saveType = csv2rdfStateConstants.saveType.instanceAsSubject
			csv2rdfController.selectSubject()
		}
	},

	modifyPredicate : function() {
		if (csv2rdfStates.saveMode == csv2rdfStateConstants.saveMode.modifyTriple) {
			ontologyViewerElements.startPropertyViewer()
		}
	},

	modifyObject : function(event) {
		csv2rdfStates.mapObjectTypeToSaveType(event.data.objectType)
		csv2rdfController.selectObject(event.data.objectType)
	},
}