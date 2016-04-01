var configData = {

	pageElements : [ {
		id : "coherentBones",
		type : "table",
		dataKey : "coherentBones",
		columns : [ {
			columnName : "label",
			scroll : "horizontal"
		}, {
			columnName : "description",
			scroll : "horizontal"
		}, {
			columnName : "images",
			cardinality : true,
			ui : {
				type : "imageList",
				edit : false
			},
			// From the image we know that it will be an
			dataMap : {
				uri : "image",
				src : "src"
			}
		} ]
	} ],

	pageData : {

		treeStructure : [
		     {
		    	 
		     }, {
		    	 
		     }
		],

		coherentBones : [ {
			label : "Label1",
			description : "Description1",
			images : [ {
				image : "http//example.org/1",
				src : "testImg/1.jpg"
			}, {
				image : "http//example.org/2",
				src : "testImg/2.jpg"
			}, {
				image : "http//example.org/3",
				src : "testImg/3.jpg"
			} ]
		}, {
			label : "Label2",
			description : "Description2",
			images : [ {
				image : "http//example.org/1",
				src : "testImg/1.jpg"
			}, {
				image : "http//example.org/2",
				src : "testImg/2.jpg"
			}, {
				image : "http//example.org/3",
				src : "testImg/3.jpg"
			} ]
		}, ],
	}

}
