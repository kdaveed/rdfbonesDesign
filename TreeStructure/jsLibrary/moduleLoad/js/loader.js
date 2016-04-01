/*******************************************************************************
 * This class is responsible for the UI loading based on configuration data
 ******************************************************************************/
var pageLoader = {

	init : function() {
		$.each(configData.pageElements, function(index, element) {
			switch (element.type) {
			case "table":
				pageLoader.showTable(element)
				break
			default:
				break
			}
		})
	},

	showTable : function(table) {

		var tableContainer = ui.getDivId(table.id)
		// Title
		var titleContainer = html.getNewDiv()
		$.each(table.columns, function(index, value) {
			titleContainer.append(ui.getTitle(value.columnName
					.capitalizeFirstLetter()))
		})
		tableContainer.append(titleContainer)
		// TableData
		var dataContainer = html.getNewDiv()
		$.each(configData.pageData[table.dataKey], function(outerIndex, data) {
			var rowContainer = ui.getRowContainer()
			$.each(table.columns, function(innerIndex, config) {
				var container
				if ("cardinality" in config) {
					// List of data
					console.log("outerIndex " + outerIndex)
					container = pageLoader.getListElement(data, config,
							outerIndex)
				} else { // Simple Data
					container = ui.getColumnDiv(data[config.columnName])
				}
				rowContainer.append(container)
			})
			dataContainer.append(rowContainer)
		})
		tableContainer.append(dataContainer)
		$("#pageContainer").append(tableContainer)

	},

	getListElement : function(data, config, inputIndex) {
		switch (config.ui.type) {
		case "imageList":
			var container = ui.getImageContainer()
			$.each(data.images, function(index, img) {
				var src = img[config.dataMap.src]
				var uri = img[config.dataMap.uri]
				var img = null
				if (config.ui.edit) {
					img = ui.getEditImg(src, uri, inputIndex)
				} else {
					img = ui.getImg(src, inputIndex)
				}
				container.find(".imagesInnerContainer").append(img)
			})
			break;
		default:
			break;
		}
		return container
	},

}

$(document).ready(function() {
	pageLoader.init()
})