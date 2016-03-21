var UIConstants = {
		
		classViewerId : "classViewer",
		classViewer : $("#classViewer"),
		
		getChildrenContainer : function(){
			return ui.getNewDiv("childrenContainer")
		},
		
		getClassNameDiv : function(classLabel){
			return ui.getNewDivT(classLabel).addClass("classLabel")
		},
		
		getSearchHitDiv : function(){
			return ui.getNewDivT().addClass("searchHit classLabel")
		},
		
		getPlusImg : function(){
			var container = ui.getNewDiv("imgContainer1")
			var img = $("<img/>")
				.attr("src", UIConstants.plusImgSrc)
			return container.append(img)
		},

		getMinusImg : function(){
			var container = ui.getNewDiv("imgContainer1")
			var img = $("<img/>")
				.attr("src", UIConstants.minusImgSrc)
			return container.append(img)
		},
		
		addInstanceImg : function(classLabel){
			var container = ui.getNewDiv("imgContainer1")
			var img = $("<img/>")
				.attr("src", UIConstants.addInstanceImgSrc)
			return container.append(img).click(function(){
				clickEvents.addBone(classLabel)
			})
		},
		
		getArrowImg : function(){
			var container = ui.getNewDiv("imgContainer")
			var img = $("<img/>")
				.attr("src", UIConstants.arrowImgSrc)
			return container.append(img)
		},
		
		getFillerDiv : function(){
			return ui.getNewDiv("imgContainer")
		},

		minusImgSrc : "img/minus.png",
		plusImgSrc : "img/plus.png",
		arrowImgSrc : "img/arrows.png",
		addInstanceImgSrc : "img/addInstance.png",

		showCoherentBoneViewer : function(){
			
		}
}
