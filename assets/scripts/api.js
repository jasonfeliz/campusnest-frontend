const config = require('./config.js')
const store = require('./store.js')

const checkUsername = function(value){
	return $.ajax({
		method: "POST",
		url: config.apiUrl + '/check-username',
		async:false,
		data:{'username':{'submitted_username':value}}

	})
}


const signUpApi = function(dataObj) {
	//run ajax call
	return $.ajax({
		method: "POST",
		url: config.apiUrl + '/sign-up',
		data: dataObj,
		success: function(response){
			$('pre').append('Thank you for signing up')
		}
	})
}

const signInApi = function(dataObj) {
	//run ajax call
	return $.ajax({
		method: "POST",
		url: config.apiUrl + '/sign-in',
		data: dataObj,
		success: function(response){
			console.log(response)
			$('pre').append('Thank you for signing in')
		}
	})
}


module.exports = {
	signUpApi,
	checkUsername,
	signInApi
}