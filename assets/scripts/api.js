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
		data: dataObj
	})
}

const signInApi = function(dataObj) {
	//run ajax call
	return $.ajax({
		method: "POST",
		url: config.apiUrl + '/sign-in',
		data: dataObj
	})
}

const signOutApi = function() {

	//run ajax call
	return $.ajax({
		method: "DELETE",
		url: config.apiUrl + '/sign-out',
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		success: function(){
			store.user = null
			store.college = null
			$('pre').append('Thank you for signing out')
		}
	})
}

const onChangePwApi = function(dataObj){
	return $.ajax({
		method: "PATCH",
		url: config.apiUrl + '/change-password',
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		data: dataObj,
		success: function(){
			$('pre').append('You have successfully changed your password')
		}
	})
}

const onCreateDiscussionApi = function(dataObj){
	return $.ajax({
		method: "POST",
		url: config.apiUrl + '/discussions',
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		data: dataObj
	})	
}

const onGetDiscussionsApi = function(dataObj){
	return $.ajax({
		method: "GET",
		url: config.apiUrl + '/discussions',
		data: dataObj
	})	
}

const onGetDiscussionApi = function(dataObj){
	console.log(dataObj)
	// return $.ajax({
	// 	method: "GET",
	// 	url: config.apiUrl + '/discussions',
	// 	data: dataObj
	// })	
}


module.exports = {
	signUpApi,
	checkUsername,
	signInApi,
	signOutApi,
	onChangePwApi,
	onCreateDiscussionApi,
	onGetDiscussionsApi
}