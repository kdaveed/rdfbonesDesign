var BoneEditor = function(data) {

	/*******************************************************************************
	 * Initiate the boneeditor function
	 ******************************************************************************/
	this.fullScreen = html.getFullScreen(data.id)
	this.container = html.getFullScreenContainer()
	this.close = new Close(this.fullScreen)
	this.backButton = new BackToParent(null)
	this.labelEditor = new LiteralEditor("Label", data.label, "rdfs:label")
	this.descriptionEditor = new LiteralEditor("Description",data.description,"rdfBones:description")
	this.imageEditor = new ImageEditor(data.images)
	this.subboneEditor = new SubboneEditor()
	this.container
		.append(this.close)
		.append(this.backButton)
		.append(this.labelEditor)
		.append(this.descriptionEditor)
		.append(this.imageEditor)
		.append(this.subboneEditor.container)
	this.fullScreen.append(this.container).hide()
}

BoneEditor.prototype.show1 = function(data){
	this.fullScreen.show()
	this.backButton.show(data.parent)
	this.labelEditor.show(data.label)
	this.descriptionEditor.show(data.description)
	this.imageEditor.show(data.images, "edit")
	this.subboneEditor.show1(data)
}

