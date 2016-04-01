var controller = {
		
	/***************************************************************************
	 * Creating new bones 
	 **************************************************************************/
	saveBoneInScope : function(classLabel){
		DATA.classLabelInScope = classLabel
	},
	
	addCompleteBone : function(){
		
	},
		
	addInCompleteBone : function(){
    	HTMLElements.completeIncompleteContainer.empty().append(html.getNewDiv())
    	HTMLElements.completeIncompleteContainer.animate({
    		henight : "60px" ,
    	}, 650)
    	.append(UIConstants.getLoadindGif())
	},	
	
}