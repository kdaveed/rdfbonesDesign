var ImageEditor = function(){
	
	this.container = html.getNewDiv()
	this.container.append(this.getTitleDiv("Images"))
	this.imageContainer = this.getOuterContainer().
								append(this.getInnerContainer())
	this.container.append(this.imageContainer)
	this.container.append(html.getNewDiv("newLine"))
	return this.container
}	

ImageEditor.prototype.show = function(imageList, edit){

	this.innerContainer = imageContainer
	if(edit){
		this.fillImagesEdit(imageList)	
	} else{
		this.fillImages(imageList)
	}
}

ImageEditor.prototype.getTitleDiv = function(title) {
	this.titleDiv = html.getNewDiv("moduleTitle").text(title)
	return this.titleDiv
}
ImageEditor.prototype.getOuterContainer = function(){
	this.innerContainer = html.getNewDiv("imgEditOuterContainer")
	return this.innerContainer
}

ImageEditor.prototype.getInnerContainer = function(){
	this.innerContainer = html.getNewDiv("imagesInnerContainer")
	return this.innerContainer
}

ImageEditor.prototype.fillImagesEdit = function(){
	$.each(imageList, function(index, img){
		this.innerContainer.append(
				this.getEditImg(img.src, img.uri))
	})
}

ImageEditor.prototype.fillImagesEdit = function(){
	$.each(imageList, function(index, value){
		this.innerContainer.append(
				this.getImg(img.src, img.uri))
	})
}

ImageEditor.prototype.getImageContainer = function() {
	// We need a constant div at first the

},

ImageEditor.prototype.getImg = function(src, index) {
	return html.getNewDiv("imgContainer").append(
			html.getPreviewImage(src, "previewImg",index))
},

ImageEditor.prototype.getEditImg = function(src, index){
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
	
ImageEditor.prototype.getNewLine = function() {
		return html.getNewDiv("newLine")
}