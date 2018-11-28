
const setFormData = function(formDataArray,dataName){
	const dataObject = {}
	dataObject[dataName] = {}
	formDataArray.forEach(function(e){
		dataObject[dataName][e.name] = e.value
	})
	return dataObject
	// formDataArray.forEach()
}


module.exports = {
	setFormData
}