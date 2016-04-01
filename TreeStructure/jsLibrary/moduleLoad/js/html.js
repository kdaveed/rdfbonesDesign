/***************************************************************************
 * Here are the classes added, which about we do not care in the loader.js
 **************************************************************************/
var ui = {

	getDivId : function(id){
		return html.getNewDiv().attr("id", id)
	},
		
	getTitle : function(title){
		return html.getNewDiv("tableTitle").text(title)
	},
	
	getRowContainer : function(){
		return html.getNewDiv("rowContainer")
	},
		
	getColumnDiv : function(value) {
		return html.getNewDiv("columnContainer").append(
				html.getNewDiv("columnContent").text(value))
	},

	getImageContainer : function() {
		// We need a constant div at first the
		return html.getNewDiv("columnContainer").
					append(html.getNewDiv("imagesOuterContainer").
						append(html.getNewDiv("imagesInnerContainer")))
	},

	getImg : function(src, index) {
		return html.getNewDiv("imgContainer").append(
				html.getPreviewImage(src, "previewImg",index))
	},
	
	getEditImg : function(src, index){
		return html.getNewDiv("imageContainer")
				.append(html.getPreviewImage(src, "previewImg", index))
				.append(html.getNewDiv("imgCheckBoxContainer")
						.append(html.getCheckBox()))
	/*	<div class = "imageContainer">
			<img src="" class = "image">
			<div class = "imgCheckBoxContainer">
				<input type = "checkbox"/>
			</div>	
		</div> 	*/
	},
	
	getNewLineDiv : function() {
		return html.getNewDiv("newLine")
	},
}

/*******************************************************************************
 * This layer cares only about the HTML element creating and eventual input
 * class setting
 ******************************************************************************/

var html = {

	getNewDiv : function() {
		return $("<div/>")
	},

	getNewDiv : function(classes) {
		return $("<div/>").addClass(classes)
	},

	getNewDivT : function(text) {
		return $("<div/>").text(text)
	},

	getNewDiv : function(classes, text) {
		return $("<div/>").addClass(classes).text(text)
	},

	getSelectorField : function() {
		return selector = $("<select/>", {
			class : "",
		})
	},

	selectorFieldWithout : function(dataset, value, text) {
		var selector = this.getSelectorField()
		this.selectorField(dataset, value, text, selector)
		return selector
	},

	createSelectorFieldWith : function(dataset, value, text, selectorMsg) {

		var sel = this.getSelectorField()
		$("<option/>", {
			text : selectorMsg
		}).appendTo(sel)
		this.selectorField(dataset, value, text).appendTo(sel)
		return sel
	},

	selectorField : function(dataset, value, text, selector) {
		$.each(dataset, function(index, data) {
			$("<option/>", {
				value : data[value],
				text : data[text],
			}).appendTo(selector)
		})
	},

	getPreviewImage : function(src, class_, index) {
		return $("<a/>").attr("href", src).attr("data-lightbox", index).append(
				this.getImgClass(src, class_))
	},

	getImgClass : function(src, class_) {
		return $("<img/>").attr("src", src).addClass(class_)
	},
	
	getCheckBox : function(){
		return $("<input>").attr("type", "checkbox")
	}
}