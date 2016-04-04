/*******************************************************************************
 * ChildStructure
 ******************************************************************************/
var SubboneEditor = function(){
	// The definition of the tree structure
	this.container = html.getNewDiv()
	this.container.append(this.getTitleDiv("Add systemic parts"))
	this.container.append(this.getNewLine())
	this.container.append(this.getTreeStructureContainer())
	this.container.append(this.getChildBoneViewer())
}

SubboneEditor.prototype.getTreeStructureContainer = function(){
	this.treeStructure = html.getNewDiv("container")
	return this.treeStructure
}

SubboneEditor.prototype.getTitleDiv = function(title) {
	this.titleDiv = html.getNewDiv("moduleTitle").text(title)
	return this.titleDiv
}

SubboneEditor.prototype.getNewLine = function() {
	return html.getNewDiv("newLine")
}

SubboneEditor.prototype.getChildBoneViewer = function(){
	this.childBoneViewer = html.getNewDiv("container")
	return this.childBoneViewer
}

SubboneEditor.prototype.show1 = function(data){

	this.childBoneViewer.empty() 
	this.boneData = data
	console.log("ClassUri")
	console.log(data)
	//Search uri in treeStructure
	var editor = this
	$.each(treeStructure, function(index,value){
		if(value.uri == data.classUri){
			$.each(value.children, function(index, child){
				editor.treeStructure.append(new ChildStructure(child, editor))
			})
		}
	})
}

SubboneEditor.prototype.showBone = function(uri){
	if(!this.searchParentTree(this.boneData.children, uri){
		this.childBoneViewer.append(
				html.getNewDiv("The is no bone"))
	}
	this.childBoneViewer.append(
			html.getNewDiv("Add new").addClass("button")
				.click(function(){
					
				}))
}

SubboneEditor.prototype.searchParentTree = function(element, uri){
	var found = false
	var childrenFound = false
	$.each(element.children, function(index, child){
		if("children" in child){
			childrenFound = this.searchParentTree(child, uri)
		}
		if(childrenFound){
			found = true
		}
		if(child.classUri == uri){
			this.childBoneViewer.append(this.childBoneDiv(child.label))
			found = true
		}
	})
	return found
}

SubboneEditor.prototype.childBoneDiv = function(value){
	return html.getNewDiv().text(value)
}
/*******************************************************************************
 * ChildStructure
 ******************************************************************************/
var ChildStructure = function(parentData, editor){

	this.container = this.getChildrenContainer()
	this.classNameNameContainer = this.getClassNameDiv()
	// Classname div
	
	this.classNameDiv = this.getClassNameDiv(parentData.label).
		click(function(){
			editor.showData(parentData.uri)
		})
	// Flag
	var hasChild = false
	if("children" in parentData){
		if(parentData.children.length > 0){
			// PlusImg
			this.plusImage = this.getPlusImg().click(function() {
				$(this).hide()
				this.minusImage.show()
				this.childrenContainer.show()
			})
			// MinusImg
			this.minusImage = this.getMinusImg().click(function() {
				$(this).hide()
				this.plusImage.show()
				this.childrenContainer.show()
			}).hide()
			// ClassName
			this.classNameDiv = this.getClassNameDiv(parentData.label)
			this.childrenContainer = this.getChildrenContainer()
			var cC = this.childrenContainer
			$.each(parentData.children, function(index, child){
				cC.append(new ChildStructure(child, editor))
			})
			this.container
				.append(this.classNameNameContainer
					.append(this.minusImage)
					.append(this.plusImage)
					.append(this.classNameDiv))
				.append(this.childrenContainer)
			// Set the flag
			hasChild = true
		}
	}
	if(!hasChild){
		var fillerDiv = this.getFillerDiv()
		this.container.append(this.classNameNameContainer
						.append(fillerDiv)
						.append(this.classNameDiv))
	}
	//appendTo.append(this.container)
	return this.container
}

ChildStructure.prototype.getClassNameDiv = function(classLabel) {
	return html.getNewDivT(classLabel).addClass("classLabel")
}

ChildStructure.prototype.getPlusImg = function() {
	var container = html.getNewDiv("imgContainer1")
	var img = $("<img/>").attr("src", UIConstants.plusImgSrc)
	return container.append(img)
}

ChildStructure.prototype.getMinusImg = function() {
	var container = html.getNewDiv("imgContainer1")
	var img = $("<img/>").attr("src", UIConstants.minusImgSrc)
	return container.append(img)
}

ChildStructure.prototype.getChildrenContainer = function() {
	return html.getNewDiv("childrenContainer")
}

ChildStructure.prototype.getFillerDiv = function() {
	return html.getNewDiv("imgContainer1")
}

ChildStructure.prototype.getImageView = function(src){
	var link = $("<a/>").attr("href", src).attr("data-lightbox", "const").addClass("boneLink")
	return link.append(html.getImgClass(src, "boneImage"))
}
