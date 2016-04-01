var HTMLElements = {

	init : function() {
		this.initObjects()
		this.initEventlListeneres()
	},

	initObjects : function() {

		// Complete incomplete decision window
		this.completeIncomplete = $("#completeIncomplete")
		this.completeIncompleteContainer = $("#completeIncompleteContainer")
		this.selectIncomplete = $("#selectIncomplete")
		this.selectComplete = $("#selectComplete")
		this.exitCompleteIncomplete = $("#exitCompleteIncomplete")

		// Filter
		this.filterContainer = $("#filterContainer")
		this.search = $("#search")
		this.openAllDiv = $("#openAll")
		this.closeAllDiv = $("#closeAll")

		// Coherent bone
		this.viewCoherentBones = $("#viewCoherentBones")
		this.existingCoherentBones = $("#existingCoherentBones")

		this.addCoherentBone = $("#addCoherentBone")
		this.addCoherentBoneContainer = $("#addCoherentBoneContainer")

		this.selectCoherentClass = $("#selectCoherentClass")

		// Single Bone

		this.viewSingleBones = $("#viewSingleBones")
		this.existingSingleBones = $("#existingSingleBones")

		this.addSingleBone = $("#addSingleBone")
		this.addSingleBoneContainer = $("#addSingleBoneContainer")

		this.selectSingleClass = $("#selectSingleClass")

		this.editSingleBone = $("#editSingleBone")

		/**
		 * Edit Bones
		 */
		this.editBone = $("#editBone")
		// Navigation
		this.exitEditBone = $("#exitEditBone")
		this.backToParent = $("#backToParent")
		// Label
		this.label = $("#label")
		this.labelEdit = $("#labelEdit")
		this.labelAdd = $("#labelAdd")
		// Image
		this.imageContainer = $("#imageContainer")
		this.widthSetting = $("#widthSetting")
		// Description
		this.description = $("#description")
		this.descriptionInput = $("#descriptionInput")
		this.descriptionAdd = $("#descriptionAdd")
		this.descriptionSave = $("#descriptionSave")
		this.descriptionEdit = $("#descriptionEdit")
		// Containers
		this.subBoneContainer = $("#subBoneContainer")
		this.treeStructureContainer = $("#treeStructureContainer")
	},

	initEventlListeneres : function() {
		this.search.on("focus", function() {
			if ($(this).val("Search for class")) {
				$(this).val("");
			}
		}).keyup(function() {
			clickEvents.searchForString($(this).val())
		}).focusout(function() {
			if ($(this).val() == "") {
				$(this).val("Search for class")
			}
		})

		// Coherent bone handling

		this.addCoherentBone.click(function() {
			HTMLElements.viewCoherentBones.hide()
			HTMLElements.addCoherentBoneContainer.hide()
			HTMLElements.selectCoherentClass.show()
		})

		// Single bone handling

		this.addSingleBone.click(function() {
			HTMLElements.addSingleBoneContainer.hide()
			HTMLElements.viewSingleBones.hide()
			HTMLElements.selectSingleClass.show()
		})

		// Editing
		this.exitEditBone.click(function() {
			HTMLElements.viewCoherentBones.show()
			HTMLElements.viewSingleBones.show()
			HTMLElements.addCoherentBoneContainer.show()
			HTMLElements.addSingleBoneContainer.show()
			HTMLElements.editBone.hide()
		})

		/***********************************************************************
		 * Bone Editing
		 **********************************************************************/
		this.descriptionAdd.click(function(){
			HTMLElements.descriptionInput.show()
			HTMLElements.descriptionInput.val(
					HTMLElements.description.text())
			HTMLElements.descriptionAdd.hide()
			HTMLElements.descriptionSave.show()
		})
		
		this.descriptionSave.click(function(){
			if(HTMLElements.descriptionInput.val() != null){ 
				HTMLElements.description.text(
					HTMLElements.descriptionInput.val())
				HTMLElements.descriptionInput.hide().value("")
				//Buttons
				HTMLElements.descriptionEdit.show()
				HTMLElements.descriptionSave.hide()
			} else {
				console.log("empty")
				HTMLElements.descriptionInput.hide()
				HTMLElements.descriptionInput.value("")
				HTMLElements.description.text("")
				//Buttons
				HTMLElements.descriptionEdit.hide()
				HTMLElements.descriptionAdd.show()
			}
		})	
		
		this.selectComplete.click(function() {
			controller.addCompleteBone()
		})

		this.selectIncomplete.click(function() {
			controller.addIncompleteBone()
		})

		this.exitCompleteIncomplete.click(function() {
			$(this).parent().parent().hide()
		})
	}
}

$(document).ready(function() {
	HTMLElements.init()
	UIController.init()
})