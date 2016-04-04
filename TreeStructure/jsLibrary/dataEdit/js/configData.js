var pageElements = [ {
	id : "coherentBones",
	title : "Coherent Bones",
	type : "table",
	dataKey : "coherentBones",
	columns : [ {
		columnName : "label",
	}, {
		columnName : "description",
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
}, {
	id : "coherentBoneTree",
	title : "Add Coherent Bones",
	type : "treeStructure",
	dataKey : "treeStructure",
}, {
	id : "singleBoneTree",
	title : "Add Single Bones",
	type : "treeStructureSingle",
	dataKey : "treeStructure",
}, {
	id : "boneEditor",
	type : "subPage",
} ]


var	treeStructure = [ {
		uri : "1",
		label : "Neurocranium",
		children : [ {
			uri : "http://purl.obolibrary.org/obo/FMA_53672",
			label : "Occipital bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53672",
			label : "Left parietal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53672",
			label : "Frontal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53672",
			label : "Right parietal bone"
		}, ]
	}, {
		uri : "2",
		label : "Viscerocranium",
		children : [ {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right temporal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right lacrimal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left zygomatic bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right inferior nasal concha"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left nasal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Hyoid bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left lacrimal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Vomer"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Sphenoid bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left palatine bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Mandible"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right maxilla"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left inferior nasal concha"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Ethmoid"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right nasal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left maxilla"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right palatine bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Right zygomatic bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53673",
			label : "Left temporal bone"
		} ]
	} ]


var coherentBones = {
		
	"uri1" : {
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
		}, 
		
	"uri2"  :  {
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
		},
}
