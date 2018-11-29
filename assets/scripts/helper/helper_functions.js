const api = require('../api.js')

//chheck if form has empty values
const checkEmptyValues = function(obj) {

	const objKey = Object.keys(obj)[0]
	for(let key in obj[objKey]){
		if(obj[objKey][key] === ""){
			return true
		}
	}
	return false
}

const validateSignUpForm = function(obj){
	const errorArr = []
	//go through form and check if values are empty
		//if any inputs are empty, store input name id in error array 
	checkEmptyValues(obj) ? errorArr.push('Please fill in all fields') : errorArr.push()
	//check if username is taken
	const usernameInputValue = $('#signup-form > input[name="username"]').val()
	api.checkUsername(usernameInputValue).done(function(response){
		response === 'taken' ? errorArr.push('Username is taken') : errorArr.push()
	})
	//check if email ends wit edu
		//if email doesn't end with edu, store input name email in error array
	//check is passwords match
		//if passwords match store password input name in error array
	//if error array is empty, return true, else handle error ui's and send error message
	return errorArr
}








const getFormData = function(formDataArray,dataName){
	const dataObject = {}
	dataObject[dataName] = {}
	formDataArray.forEach(function(e){
		dataObject[dataName][e.name] = e.value
	})
	return dataObject
	// formDataArray.forEach()
}


module.exports = {
	getFormData,
	checkEmptyValues,
	validateSignUpForm,
	api
}