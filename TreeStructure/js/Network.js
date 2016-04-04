var network = {
	
		
	newInstanceResponse : function(response, type){
		//Create the data
		//var resp = JSON.parse(response);
		//newUri = resp.newUri
	
		newUri = "http://exampleOrg"
		treeData.uriInScope = newUri 
		switch(type){
			case "singleBone" : 
				treeData.singleBones[newUri] = new Object()
			default : break;

		}
		
		//Show single bone
		UIController.showBoneEditor(newUri, true)
	},	
	
	getNewUri : function(){
		$.ajax({
			  url: jsVars.controllerUrl,
			  
			}).done(function() {
				network.newInstanceRespons()
			});
	}
	
}