const config = require('./config.js')

const checkUsername = function(value){
	return $.ajax({
		method: "POST",
		url: config.apiUrl + '/check-username',
		async:false,
		data:{'username':{'submitted_username':value}}

	})
}


const signUpApi = function(data) {
	//run ajax call
	console.log('signup api')
}



module.exports = {
	signUpApi,
	checkUsername
}