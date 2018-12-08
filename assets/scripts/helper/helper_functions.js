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
//validate signup form
const validateSignUpForm = function(obj){
	const errorArr = []
	//go through form and check if values are empty
		//if any inputs are empty, store input name id in error array
	checkEmptyValues(obj) ? errorArr.push('Please fill in all fields') : errorArr
	//check if username is taken
	const usernameInputValue = $('#signup-form > input[name="username"]').val()
	api.checkUsername(usernameInputValue).done(function(response){
		response === 'taken' ? errorArr.push('Username is taken') : errorArr
	})
	//check is passwords match
		//if passwords match store password input name in error array
	const password = $('#signup-form > input[name="password"]').val()
	const password_confirm = $('#signup-form > input[name="password_confirmation"]').val()
	password !== password_confirm ? errorArr.push("Passwords don't match") : errorArr
	//if error array is empty, return true, else handle error ui's and send error message
	return errorArr
}

//validation discussion form
const validateDiscussionForm = function(){
	const errorArr = []
	$('#create-form > select').val() === "" ? errorArr.push("You must choose an interest") : errorArr
	$('#create-form > input').val() === "" ? errorArr.push("Please add a title for your post") : errorArr
	$('#create-form > textarea').val() === "" ? errorArr.push("Write something interesting!") : errorArr

	return errorArr

}


//display message to user when user succesfully changes password and signUpSuccess
const displayMessage = function(message){
  $('#large-message').text(message)
  $('#large-message').css('background','#e6fff4')
  $('#large-message').css('color','#52a453')
  $('#large-message').css('padding', '15px 5px')
  setTimeout(function(){
    $('#large-message').removeAttr("style").html("")
  },4000)
}

//gets form data
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
	api,
	validateDiscussionForm,
  displayMessage
}
