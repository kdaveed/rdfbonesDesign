var csv2rdfHTML = {

	onload : function() {
		this.initObjects()
		this.initEventListeners()
	},

	initObjects : function() {

		/***********************************************************************
		 * Delimiter
		 **********************************************************************/
		this.delimiter = $("#delimiter")
		this.delimiterSelector = $("#delimiterSelector")
		this.commaSelector = $("#comma")
		this.tabSelector = $("#tab")

		/***********************************************************************
		 * File
		 **********************************************************************/
		this.file = $(':file')
		this.fileUpload = $("#fileUpload")
		this.uploadCSV = $("#uploadCSV")

		/***********************************************************************
		 * New Dependent Instance
		 **********************************************************************/
		
		this.defDependentInstances = $('#defDependentInstances')
		this.addDependentInstances = $("#addDependentInstance")
		this.dependentInstances = $("#dependentInstances")

		/***********************************************************************
		 * New Instance
		 **********************************************************************/
		
		this.defNewInstances = $('#defNewInstances')
		this.addInstance = $('#addInstance')

		this.fileUpload = $("#fileUpload")
		this.uploadCSV = $("#uploadCSV")

		this.literalsDiv = $("#literalsDiv")
		this.instancesDiv = $(".instancesDiv")
		this.newInstanceTriple = $('#newInstanceTriple')

		this.defTriples = $('#defTriples')
		this.addTriple = $("#addTriple")

		this.triples = $("#triples")
		this.saveSchema = $("#saveSchema")

		this.show = $("#show")
		this.scheme = $("#scheme")

		this.subject = $("#subjectContainer")
		this.predicate = $('#predicateContainer')
		this.object = $('#objectContainer')
		this.modifyImgContainer = $('#modifyImgContainer')
		
		/***********************************************************************
		 * Save and resest buttons
		 **********************************************************************/
		
		this.saveButton = $("#saveButton")
		this.resetButton = $("#resetButton")

	},

	initEventListeners : function() {

		this.file.change(function() {
			var file = this.files[0];
			csv2rdfController.readInFile(file)
		})

		this.commaSelector.change(function() {
			if ($(this).prop("checked")) {
				csv2rdfHTML.tabSelector.prop("checked", false)
				csv2rdfStates.state = 1
				csv2rdfData.delimiter = ","
			} else {
				csv2rdfStates.state = 0
			}
			csv2rdfStateUI.set()
		})

		this.tabSelector.change(function() {
			if ($(this).prop("checked")) {
				csv2rdfHTML.commaSelector.prop("checked", false)
				csv2rdfStates.state = 1
				csv2rdfData.delimiter = "\t"

			} else {
				csv2rdfStates.state = 0
			}
			csv2rdfStateUI.set()
		})
		/***********************************************************************
		 * Add dependent and constant instance, triple
		 **********************************************************************/
		this.addDependentInstances.click(function() {
			csv2rdfClickEvents.addDependentInstance()
		})

		this.addInstance.click(function() {
			csv2rdfClickEvents.selectClass()
		})

		this.addTriple.click(function() {
			csv2rdfClickEvents.addNewTriple()
		})

		this.show.click(function() {
			$.each(csv2rdfData.triplesToStore, function(index, value) {
				var str = value.subject + "   ,   " + value.predicate
						+ "   ,   " + value.object
				var d = ui.getNewDiv().text(str).appendTo(csv2rdfHTML.scheme)
			})
		})
	}
}

csv2rdfHTML.onload()