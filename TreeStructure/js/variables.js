var a="abcdefgh"
	
console.log(a.substring(0,a.indexOf("cde")))
console.log(a.substring(a.indexOf("cde"), a.indexOf("cde") + 3))
console.log(a.substring(a.indexOf("cde") + 3))

var dataOperations = {
		
		makeMaps : function(classes){
			
			$.each(classes, function(index, value){
				if(value.superClass.label != value.subClass.label){
					if(classHierarcyVars.parentMap[value.subClass.label] == undefined){
						classHierarcyVars.parentMap[value.subClass.label] = []
					}
					classHierarcyVars.parentMap[value.subClass.label].push(index)
					

				} else {
					if(classHierarcyVars.classMapping[value.subClass.label] == undefined){
						classHierarcyVars.classMapping[value.subClass.label] = index
					}
				}
			})
			
			firstParentMap = classHierarcyVars.classMapping
			
			$.each(classHierarcyVars.parentMap, function(index, value){
				if(firstParentMap[index] != undefined){
					//If they have a parent we exclude them. So we get the direct children of bibo:Document
					delete firstParentMap[index]
				}
			})
	
			realPairs = []
	
			$.each(classHierarcyVars.parentMap, function(index, value){
				if(value.length = 1){
					realPairs.push(value[0])
				} else {
					//Check which father 
					buffer = 0
					returnId = 0
					$.each(value, function(index, value){
						fatherLabel = classes[value].superClass.label
						if(classHierarchy.parentMap[fatherLabel].length > buffer){
							buffer = classHierarchy.parentMap[fatherLabel].length
							returnId = value
						}
					})
					realPairs.push(returnId)
				}
			})
			console.log("Real Pairs")
			$.each(realPairs, function(index, value){
				
				if(classHierarcyVars.childrenMap[classes[value].superClass.label] == undefined){
					classHierarcyVars.childrenMap[classes[value].superClass.label] = []
				}
				classHierarcyVars.childrenMap[classes[value].superClass.label].push(value)
			})
			
			console.log(firstParentMap)
			console.log(classHierarcyVars.childrenMap)
			
			$.each(firstParentMap, function(index, value){
				objectId = classHierarcyVars.classMapping[index]
				parentObject = dataOperations.createClassObject(classes[objectId].superClass)
				console.log(parentObject)
				if(classHierarcyVars.childrenMap[index] != undefined){
					//It has a child
					console.log("Child")
					console.log(classHierarcyVars.childrenMap[index])
					dataOperations.fillChildren(parentObject, classHierarcyVars.childrenMap[index])
				}
				//Final
				console.log("Final parent object")
				console.log(parentObject)
				classHierarcyVars.parents.push(parentObject)
			})
			console.log(classHierarcyVars.parents)
		},
		
		fillChildren : function(parentObject, childrenList){
			$.each(childrenList, function(index, value){
				var className = classes[value].subClass
				var parentObj = dataOperations.createClassObject(className)
				
				console.log(parentObj)
				if(classHierarcyVars.childrenMap[className.label] != undefined){
					//It has a child
					console.log("GrandChild")
					console.log(classHierarcyVars.childrenMap[className.label])
					dataOperations.fillChildren(parentObj, classHierarcyVars.childrenMap[className.label])
				} else {
					console.log("undefined")
				}
				parentObject.children.push(parentObj)
				console.log("After new child")
				console.log(parentObject)
				console.log("Children")
				$.each(parentObject.children, function(index, value){
					console.log(value)
				})
				console.log("End of children")
			})
		},
		
		createClassObject : function(object){
			var _class = new Object()			
			_class.id = classHierarcyVars.classList.length
			_class.label = object.label
			_class.uri = object.uri
			_class.children = [];
			classHierarcyVars.classLabelList.push(object.label)
			classHierarcyVars.classList.push(_class)
			return _class
		},
		
		searchForString : function(searchString){
			classHierarcyVars.searchStringLength = searchString.length
			console.log("SearchString  " + searchString)
			var bools = []
			$.each(classHierarcyVars.parents, function(index, value){
				bools.push(dataOperations.foundInChild(searchString, value))
			})
			console.log("Result : ")
			console.log(classHierarcyVars.parents)
			UIController.showSearchResults()
		},
		
		foundInChild : function(searchString, parent){

			parent.toDisplay = false
			parent.childToDisplay = false
			parent.searchIndex = parent.label.toLowerCase().indexOf(searchString) 
			if(parent.label.toLowerCase().indexOf(searchString) > -1){
				console.log(parent.label)
				parent.toDisplay = true
			} 
			$.each(parent.children, function(index, value){
				var bools = []
				bools.push(dataOperations.foundInChild(searchString, value))
				
				$.each(bools, function(index, boolValue){
					if(boolValue){
						parent.childToDisplay = true
						parent.toDisplay = true
					}
				})
			})
			return parent.toDisplay
		}
		
		
		
}

var classHierarcyVars = {
		
		searchStringLength : 0,
		classMapping : new Object(),
		directPairs : [],
		parentMap : new Object(),
		childrenMap : new Object(),
		childrenGroupDivs : [],
		childrenList : [],
		classList : [],
		classLabelList : [],
		parents : [],	
		
		saveChildrenGroupDiv : function(div){
			this.childrenGroupDivs.push(div)
		}
}