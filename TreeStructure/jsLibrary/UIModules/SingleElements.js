var Close = function(container){
	
	this.containerToHide = container
	return this.getButton()
}

Close.prototype.getButton = function(){
	
	object = this
	return html.getImgClass("img/close.png", "floatRight")
	.click(function(){
		object.containerToHide.hide()
	})
}

var BackToParent = function(parentUri){
	this.parentUri = parentUri
	return this.getButton()
}

BackToParent.prototype.show = function(){
	this.container.show()
}

BackToParent.prototype.getButton = function(){
	
	this.container = html.getNewDiv().
		append(html.getImg("img/backToParent.png")).
		append(html.getNewDiv("inline").text("Back to Parent"))
		.click(function(){
			controller.openCoherentBoneViewer(this.parentUri)
		})
	return this.container
}

