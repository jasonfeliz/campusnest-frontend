const api = require('./api.js')
const helper = require('./helper/helper_functions.js')


const onSignUp = function(event){
	event.preventDefault()
	//gather up form data
	const data = helper.setFormData($('#signup-form').serializeArray(),'passwords')
	console.log(data)
	//form data must be in a credentials object 
		//with email, password, password_confirmation, college_id, username keys
	//run some validations
	//if forms are valid, run api
	// api.signUpApi(data)
}



const addHandlers = function (){
	$('#signup-button').click(onSignUp)
}

module.exports = {
	addHandlers
}