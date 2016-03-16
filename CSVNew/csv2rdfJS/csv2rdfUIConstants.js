var csv2rdfUIConstant = {

	modifyImgSrc : "img/write.png",
	
	getModifyImg : function(){
		return ui.getNewDiv("inline marginL20").append(ui.getImg(this.modifyImgSrc))
	},
	
	getValueDivForMapping : function(value){
		return ui.getNewDiv("columnValues").text(value)
	},
	
	getClassSelectorDivForMapping : function(columnName, value){
		
		container = ui.getNewDiv()
		selectedClass = ui.getNewDiv()
		
		classSelect = ui.getNewDiv("columnValues hoverCursor inline").text("Select Class!")
			.click(function(){
				csv2rdfClickEvents.classSelectionForMapping(columnName, value)
			})
		emptySelect = ui.getNewDiv("columnValues hoverCursor inline").text("Do not create instance")
			.click(function(){
				csv2rdfClickEvents.emptySelectionForMapping(columnName, value)
			})
		
		modify = this.getModifyImg().css("display","none").click(function(){
			csv2rdfClickEvents.modifyMapping(columnName)
		})
		
		csv2rdfUIData.saveValueDivs(columnName, value, selectedClass, classSelect, emptySelect, modify)
		return container.append(selectedClass).append(classSelect).append(emptySelect).append(modify)
	},
	
	instanceDiv : function(text) {
		return ui.getNewDiv("varField instanceField").text(text).click(function() {
			csv2rdfClickEvents.selectInstanceToTriple($(this))
		})
	},

	literalDiv : function(text) {
		return ui.getNewDiv("varField literalField").text(text)
	},
		
	rdfTypeDiv : function(classUri){
		return 	ui.getNewDiv("rdfTypeDiv").text("   type : " + classUri)
	},
	
	instanceTripleField : function(text){
		return ui.getNewDiv("varField instanceField").text(text)
	},
	
	literalTripleField : function(text){
		return ui.getNewDiv("varField literalNodeField").text(text)
	},
	
	editContainer : function(tripleNum){
		return ui.getNewDiv("csv2rdfEditContainer")
			.append(this.modifyImg(tripleNum))
			.append(this.deleteImg(tripleNum))
	},
	
	modifyImg : function(tripleNum) {
		return ui.getNewDiv("csv2rdfImgContainer").append($('<img/>').attr("src", "modify.png").addClass("csv2rdfImg"))
				.click(function() {
					csv2rdfClickEvents.modifyTriple($(this).parent(), tripleNum)
				})
	},
	
	deleteImg : function(tripleNum) {

		return ui.getNewDiv("csv2rdfImgContainer").append($('<img/>').attr("src", "delete.png").addClass("csv2rdfImg"))
				.click(function() {
					csv2rdfClickEvents.deleteTriple($(this).parent(), tripleNum)
				})
	},
	
	saveImg : function(tripleNum){
		
		return ui.getNewDiv("csv2rdfEditContainer").append($('<img/>').attr("src", "ok.png").addClass("csv2rdfImg"))
				.click(function() {
					csv2rdfClickEvents.exitModifyMode($(this), tripleNum)
				})
	},
	
	predicateTmpDiv : function() {
		return ui.getNewDiv("varField tripleNodeHover").text("Click here to select predicate").click(function() {
					ontologyViewerElements.startPropertyViewer()
				})
	},

	objectTmpDiv : function(text) {
		return ui.getNewDiv("varField").text(text)
	},

	newTriple : function() {
		var triple = $('<div/>').addClass(csv2rdfCSS.tripleContainer)
		sub = $('<div/>').addClass(csv2rdfCSS.subjectNode).appendTo(triple)
		pred = $('<div/>').addClass(csv2rdfCSS.predicateNode).appendTo(triple)
		obj = $('<div/>').addClass(csv2rdfCSS.objectNode).appendTo(triple)
		return triple
	},

	tripleRow : null
}

var csv2rdfUIElements = {
		
		tripleRow : null ,
		subject : null,
		predicate : null,
		object : null,

		setElements : function(tripleRow){
			this.tripleRow = tripleRow
			this.subject = tripleRow.find(".subject")
			this.predicate = tripleRow.find(".predicate")
			this.object = tripleRow.find(".object")
		}
}
