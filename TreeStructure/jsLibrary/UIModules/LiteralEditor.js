var LiteralEditor = function(title, id, predicate) {
	this.title = title
	this.predicate = predicate
	this.id = id
	this.container = this.getContainerDiv()
	this.container.append(this.getTitleDiv())
	this.container.append(this.getValueDiv())
	this.container.append(this.getTextBox())
	this.container.append(this.getButtons())
	this.container.append(html.getNewDiv("newLine"))
	return this.container
}

LiteralEditor.prototype.show = function(value){
	if(value != null){
		this.valueDiv.text(value)
		this.editButton.show()
		this.addButton.hide()
	} else {
		this.valueDiv.text("No data")
		this.editButton.show()
		this.addButton.hide()
	}
}

LiteralEditor.prototype.getContainerDiv = function(){
	return html.getDivId(this.id)
}

LiteralEditor.prototype.getTitleDiv = function() {
	this.titleDiv = html.getNewDiv("moduleTitle").text(this.title)
	return this.titleDiv
}

LiteralEditor.prototype.getValueDiv = function() {
	this.valueDiv = html.getNewDiv("valueDiv")
	return this.valueDiv
}

LiteralEditor.prototype.getTextBox = function() {
	this.textBox = html.getTextBox().addClass("labelTextBox").hide()
	return this.textBox
}

LiteralEditor.prototype.getButtons = function() {
	var object = this
	this.buttonContainer = html.getNewDiv()
	this.addButton = html.getNewDiv("button").text("Add").click(function() {
		$(this).hide()
		object.saveButton.show()
		object.clearButton.show()
		object.textBox.show()
	}).appendTo(this.buttonContainer)

	this.editButton = html.getNewDiv("button").text("Edit").hide().click(
			function() {
				$(this).hide()
				object.saveButton.show()
				object.clearButton.show()
				object.textBox.hide()
				object.valueDiv.hide()
				object.textBox.val(object.valueDiv.text()).css("display", "block")
			}).appendTo(this.buttonContainer)

	this.saveButton = html.getNewDiv("button").text("Save").hide().click(
			function() {
				object.clearButton.hide()
				object.textBox.hide()
				object.valueDiv.show().text(object.textBox.val())
				$(this).hide()
				if (object.textBox.val() == "") {
					object.addButton.show()
				} else {
					object.editButton.show()
				}
			}).appendTo(this.buttonContainer)
	this.clearButton = html.getNewDiv("button").text("Clear").hide().click(
			function() {
				object.textBox.val("")
			}).appendTo(this.buttonContainer)

	if (this.value == null) {
		this.addButton.show()
		this.editButton.hide()
	}
	return this.buttonContainer
}