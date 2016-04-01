var UIConstants = {

	/***************************************************************************
	 * Complete Incomplete Decision
	 **************************************************************************/

	getCompIncomp : function(){
		var middleDiv = html.getMiddleDiv()
	},
	
	classViewerId : "classViewer",
	classViewer : $("#classViewer"),

	getChildrenContainer : function() {
		return html.getNewDiv("childrenContainer")
	},

	getClassNameDiv : function(classLabel) {
		return html.getNewDivT(classLabel).addClass("classLabel")
	},

	getSearchHitDiv : function() {
		return html.getNewDivT().addClass("searchHit classLabel")
	},

	getPlusImg : function() {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", UIConstants.plusImgSrc)
		return container.append(img)
	},

	getMinusImg : function() {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", UIConstants.minusImgSrc)
		return container.append(img)
	},

	addInstanceImg : function(classLabel) {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", UIConstants.addInstanceImgSrc)
		return container.append(img).click(function() {
			clickEvents.addBone(classLabel)
		})
	},

	getLoadindGif : function(){
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", UIConstants.loadingGifSrc).attr("width", "50px")
		return container.append(img).click(function() {
			clickEvents.addBone(classLabel)
		})
	},
	
	getArrowImg : function() {
		var container = html.getNewDiv("imgContainer")
		var img = $("<img/>").attr("src", UIConstants.arrowImgSrc)
		return container.append(img)
	},

	getFillerDiv : function() {
		return html.getNewDiv("imgContainer")
	},

	minusImgSrc : "img/minus.png",
	plusImgSrc : "img/plus.png",
	arrowImgSrc : "img/arrows.png",
	addInstanceImgSrc : "img/addInstance.png",
	loadingGifSrc : "img/loading.gif",
	
	showCoherentBoneViewer : function() {
		
	},
	
	getImageView : function(src){
		var link = $("<a/>").attr("href", src).attr("data-lightbox", "const").addClass("boneLink")
		return link.append(html.getImgClass(src, "boneImage"))
	}
}
