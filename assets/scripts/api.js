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
		data: dataObj
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
	return $.ajax({
		method: "GET",
		url: config.apiUrl + '/discussions/'+dataObj.discussion.id,
	})
}
const onDeleteApi = function(dataObj){
	return $.ajax({
		method: "DELETE",
		url: config.apiUrl + '/discussions/'+dataObj.discussion.id,
		headers: {
			Authorization: "Token token=" + store.user.token
		}
	})
}
const onUpdateApi = function(dataObj){
	return $.ajax({
		method: "PATCH",
		url: config.apiUrl + '/discussions/'+dataObj.discussion.id,
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		data:dataObj
	})
}

module.exports = {
	signUpApi,
	checkUsername,
	signInApi,
	signOutApi,
	onChangePwApi,
	onCreateDiscussionApi,
	onGetDiscussionsApi,
	onGetDiscussionApi,
	onDeleteApi,
	onUpdateApi
}
