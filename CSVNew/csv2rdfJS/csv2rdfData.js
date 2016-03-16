var csv2rdfStateUI = {

	set : function() {
		switch (csv2rdfStates.state) {
		case 0:
			csv2rdfHTML.fileUpload.addClass("disabled")
			csv2rdfHTML.file.prop('disabled', true)
			break
		case 1:
			csv2rdfHTML.fileUpload.removeClass("disabled")
			csv2rdfHTML.file.prop('disabled', false)
			break
		case 2:
			// Disable delimiter
			csv2rdfHTML.delimiter.addClass("disabled")
			csv2rdfHTML.delimiterSelector.addClass("disabled")
			csv2rdfHTML.commaSelector.prop('disabled', true)
			csv2rdfHTML.tabSelector.prop('disabled', true)
			// Disable file upload line
			csv2rdfHTML.fileUpload.addClass("disabled")
			csv2rdfHTML.file.prop('disabled', true)
			// Enable Save and Reset Button
			csv2rdfHTML.saveButton.addClass("enabled")
			csv2rdfHTML.resetButton.addClass("enabled")
			// Enable the instance selector elements
			csv2rdfHTML.defNewInstances.removeClass("disabled")
			csv2rdfHTML.defDependentInstances.removeClass("disabled")
			break
		case 3:
			csv2rdfHTML.defTriples.removeClass("disabled")
			$('.hideAtFirst').removeClass('hideAtFirst')
			break
		default:
			break
		}
	}
}

var csv2rdfData = {
	/***************************************************************************
	 * Variables
	 **************************************************************************/
	delimiter : 0,
	csvLines : 0,

	/***************************************************************************
	 * Dependent instance auxiliary dataset
	 **************************************************************************/

	numberOfDistinctValues : 0,
	numberOfSetValues : 0,
	classMappingDiv : null,
	variableInScope : null,
	mappingMap : new Object(),
	
	initiateMappingDataSet : function(varName){
		this.variableInScope = varName
		this.mappingMap[varName] = []
	},
	
	//Save the class to the variable. From the values we knwo
	saveClassToValue : function(classUri, classLabel){
		csv2rdfData.classMappingDiv = null
		mapping = new Object()
		mapping.value = this.variableInScope
		mapping.classUri = classUri
		mapping.classLable = classLabel
		this.mappingMap[this.variableInScope].push(mapping)
	},
	
	finishMappingDefinition : function(){
		this.numberOfSetValues = null
		this.numberOfDistinctValues = null
		this.literalToStore = null
		console.log(this.literalMappings)
	},
	
	tripleDivs : [],
	reference : -1,

	/***************************************************************************
	 * Conversion Scheme Data
	 **************************************************************************/
	literalMappings : new Object(),
	triplesToStore : [],

	csvTitles : [],
	newTriple : function() {

		this.tripleDivs.push(new Object())
		var triple = new Object()
		this.triplesToStore.push(triple)
		this.reference = this.triplesToStore.length - 1
	},

	saveSubjectDiv : function(subjectDiv) {
		this.tripleDivs[this.reference].subject = subjectDiv
	},

	savePredicateDiv : function(predicateDiv) {
		return this.tripleDivs[this.reference].predicate = predicateDiv
	},

	saveObjectDiv : function(objectDiv) {
		return this.tripleDivs[this.reference].object = objectDiv
	},

	getSubjectDiv : function() {
		return this.tripleDivs[this.reference].subject
	},

	getPredicateDiv : function() {
		return this.tripleDivs[this.reference].predicate
	},

	getObjectDiv : function() {
		return this.tripleDivs[this.reference].object
	},

	saveSubjectUri : function(subjectUri) {
		this.triplesToStore[this.reference].subject = subjectUri
	},

	saveProperty : function(property, type) {
		this.triplesToStore[this.reference].predicate = new Object()
		this.triplesToStore[this.reference].predicate.uri = property.uri
		this.triplesToStore[this.reference].predicate.type = type
	},

	saveObject : function(varname, type) {
		this.triplesToStore[this.reference].object = new Object()
		this.triplesToStore[this.reference].object.varname = varname
		this.triplesToStore[this.reference].object.type = type
	},

	deleteTriple : function(tripleNum) {
		this.triplesToStore[this.reference].subject = "";
	},

	/***************************************************************************
	 * ResetReference
	 **************************************************************************/
	resetReference : function() {
		this.reference = this.triplesToStore.length - 1
	},

	getInstanceVarName : function(variable) {
		var cnt = 0;
		$.each(this.triplesToStore,
				function(index, value) {
					var varName = value.subject
					if (varName.indexOf(variable) == 1
							&& value.predicate == "rdf:type") {
						cnt++
					}
				})
		prime = ""
		for (var i = 0; i < cnt; i++) {
			prime += "'"
		}
		return "?" + variable + prime
	}
}