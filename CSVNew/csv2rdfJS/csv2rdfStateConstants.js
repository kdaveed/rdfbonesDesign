var csv2rdfStateConstants = {

	// This variable relates to the triple save/modify
	saveMode : {
		initial : "csv2rdfStateConstants_saveMode_initial",
		saveNewTriple : "csv2rdfStateConstants_saveMode_saveNewTriple",
		modifyTriple : "csv2rdfStateConstants_saveMode_modifyTriple",
	},

	// This variable defines what to do with the selected elements
	saveType : {
		disabled : "csv2rdfStateConstants_saveType_disabled",
		instanceAsSubject : "csv2rdfStateConstants_saveType_instanceAsSubject",
		instanceAsObject : "csv2rdfStateConstants_saveType_instanceAsObject",
		literalAsObject : "csv2rdfStateConstants_saveType_literalAsObject",
		literalForMapping : "csv2rdfStateConstants_saveType_literalForMapping",
	},

	objectTypes : {
		literal : "csv2rdfStateConstants_objectTypes_literal",
		instance : "csv2rdfStateConstants_objectTypes_instance",
	}
}

var csv2rdfStates = {

	state : 0,
	saveMode : csv2rdfStateConstants.saveMode.initial,
	saveType : csv2rdfStateConstants.saveType.disabled,
	
	/***************************************************************************
	 * Dependent mapping
	 **************************************************************************/
	onGoingMappingDefinition : false,

	setOnGoingMappingDefinition : function() {
		this.onGoingMappingDefinition = true
	},

	resetOnGoingMappingDefinition : function() {
		this.onGoingMappingDefinition = false
	},

	/***************************************************************************
	 * Mapping
	 **************************************************************************/
	mapObjectTypeToSaveType : function(objectType) {
		switch (objectType) {
		case csv2rdfStateConstants.objectTypes.literal:
			csv2rdfStates.saveType = csv2rdfStateConstants.saveType.literalAsObject
			break;
		case csv2rdfStateConstants.objectTypes.instance:
			csv2rdfStates.saveType = csv2rdfStateConstants.saveType.instanceAsObject
			break;
		}
	},

	isInitialMode : function() {
		return (csv2rdfStates.saveMode == csv2rdfStateConstants.saveMode.initial)
	},

	/***************************************************************************
	 * saveMode 
	 **************************************************************************/

	setSaveModeInitial : function() {
		csv2rdfStates.saveMode = csv2rdfStateConstants.saveMode.initial
	},

	setSaveModeNewTriple : function() {
		csv2rdfStates.saveMode = csv2rdfStateConstants.saveMode.NewTriple
	},

	setSaveModeModifyTriple : function() {
		csv2rdfStates.saveMode = csv2rdfStateConstants.saveMode.modifyTriple
	},

	/***************************************************************************
	 * saveType 
	 **************************************************************************/
	setSaveTypeDisabled : function() {
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.disabled
	},

	setSaveTypeInstanceAsSubject : function() {
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.instanceAsSubject
	},

	setSaveTypeInstanceAsObject : function() {
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.instanceAsObject
	},

	setSaveTypeLiteralAsObject : function() {
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.literalAsObject
	},

	setSaveTypeLiteralForMapping : function() {
		csv2rdfStates.saveType = csv2rdfStateConstants.saveType.literalForMapping
	},
}


