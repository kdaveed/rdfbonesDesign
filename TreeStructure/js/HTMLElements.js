var HTMLElements = {
	
	init : function(){
		this.initObjects()
		this.initEventlListeneres()
	},
	
	initObjects : function(){
		this.filterContainer = $("#filterContainer")
		this.search = $("#search")
		
		//Coherent bone
		this.viewCoherentBones= $("#viewCoherentBones")
		this.existingCoherentBones = $("#existingCoherentBones")
		
		this.addCoherentBone = $("#addCoherentBone")
		this.addCoherentBoneContainer = $("#addCoherentBoneContainer")
		
		this.selectCoherentClass = $("#selectCoherentClass")
		
		//Single Bone
		
		this.viewSingleBones = $("#viewSingleBones")
		this.existingSingleBones = $("#existingSingleBones")

		this.addSingleBone = $("#addSingleBone")
		this.addSingleBoneContainer = $("#addSingleBoneContainer")
		
		this.selectSingleClass = $("#selectSingleClass")

		this.editSingleBone = $("#editSingleBone")	
		
		this.editBone = $("#editBone")
		this.exitEditBone = $("#exitEditBone")
		this.subBoneContainer = $("#subBoneContainer")
		this.treeStructureContainer = $("#treeStructureContainer")

		//Filter
		this.openAllDiv = $("#openAll")
		this.closeAllDiv = $("#closeAll")
	},
	
	initEventlListeneres : function(){
		this.search.on("focus", function(){
			if($(this).val("Search for class")){
				$(this).val("");
			}	
	    }).keyup(function(){
	    	clickEvents.searchForString($(this).val())
	    }).focusout(function(){
	    	if($(this).val() == ""){
	    		$(this).val("Search for class")
	    	}
	    })
	    
	    //Coherent bone handling
	    
	    this.addCoherentBone.click(function(){
	    	HTMLElements.viewCoherentBones.hide()
	    	HTMLElements.addCoherentBoneContainer.hide()
	    	HTMLElements.selectCoherentClass.show()
	    })
	   
	    //Single bone handling
	    
	    this.addSingleBone.click(function(){
	    	HTMLElements.addSingleBoneContainer.hide()
	    	HTMLElements.viewSingleBones.hide()
	    	HTMLElements.selectSingleClass.show()
	    })
	    
	    //Editing
	    this.exitEditBone.click(function(){
	    	HTMLElements.viewCoherentBones.show()
	    	HTMLElements.viewSingleBones.show()
	    	HTMLElements.addCoherentBoneContainer.show()
	    	HTMLElements.addSingleBoneContainer.show()
	    	HTMLElements.editBone.hide()
	    })
	}
}


$(document).ready(function(){
	HTMLElements.init()
	UIController.init()
})