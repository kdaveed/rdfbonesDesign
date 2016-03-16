

var csv2rdfUIData = {
		
	valueMapElements : new Object(),
	varInScope : 0,
	valInScope : 0,
	
	setVariables : function(varInScope, valInScope){
		this.varInScope = varInScope
		this.valInScope = valInScope
	},
	
	initContainer : function(columnName){
		this.valueMapElements[columnName] = new Object()
		this.valueMapElements[columnName]["values"] = new Object()
	},

	saveMappingContainer : function(variableInScope, containerDiv, saveButton){
		this.valueMapElements[variableInScope]["containerDiv"] = containerDiv
		this.valueMapElements[variableInScope]["saveButton"] = saveButton
	},
	
	saveValueDivs : function(variableInScope, value, selectedClass, selectClass, empty, modify){
		mapping = new Object()
		mapping["selectedClass"] = selectedClass
		mapping["selectClass"] = selectClass
		mapping["empty"] = empty
		mapping["modify"] = modify
		this.valueMapElements[variableInScope]["values"][value] = mapping
	},
	
	getSaveButton : function(){
		return this.valueMapElements[this.varInScope]["saveButton"]
	},
	
	getModifyButton : function(){
		return this.valueMapElements[this.varInScope]["values"][this.valInScope]["modify"]
	},
	
	getEmptyDiv : function(){
		return this.valueMapElements[this.varInScope]["values"][this.valInScope]["empty"]
	},
	
	getClassSelectorDiv : function(){
		return this.valueMapElements[this.varInScope]["values"][this.valInScope]["selectClass"]
	},
	
	getSelectedClass : function(){
		return this.valueMapElements[this.varInScope]["values"][this.valInScope]["selectedClass"]
	},
}