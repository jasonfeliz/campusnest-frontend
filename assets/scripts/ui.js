const store = require('./store.js')
const showDiscussions = require('./templates/discussion-list.handlebars')


$.getJSON( "public/interests.json", function( data ) {
	$('#interest-list').append('<option value="">Choose a Topic</option>')
	$.each( data, function( key, val ) {
		$('#interest-list').append('<option value="'+val.id+'">' + val.interest_name + '</option>')
	});
});

$('#signin-modal').click(function(){
	$('.modal').show()
})

$('.cancel-button, .close').click(function(){
	$('.modal').hide()
	$('#signin-form input').val('')
})

const loadHomepage = function(){
	$('#user-welcome').text('Hello, ' + store.user.username)
	$('#college-name').text(store.college.college_name)
	$('#city').text(store.college.city + ', ')
	$('#state').text(store.college.state)
	const formHtml = $('#create').html();
	$('#discussion-form').html(formHtml)
}


const signUpSuccess = function(){
	$('#signup-form .form-message').html('<div>Thank you for signing up! Sign in to get started</div>')
	$('#signup-form .form-message').addClass('success')
	$('#signup-form input').val('')
}

const signInSuccess = function(data){
	store.user = data.user
	store.college = data.user.college
	$('.modal, .landing-page').hide()
	$('#signin-form input').val('')
	$('.main-page').show()
	console.log(data.user)
	//load homepage for signed in
	loadHomepage()


}

const signInError = function(){
	$('#signin-form .form-message').html('<div>Invalid email/password combination. Try again!</div>')
	$('#signin-form .form-message').addClass('error')
	$('#signin-form input[name="password"]').val('')
}


const displayDiscussions = function(data){
	const dataArr = data.discussions
	const userId = store.user.id
  	const showDiscussionsHtml = showDiscussions(
  		{
  			discussions : dataArr
  		})
  	$('#post-list').html(showDiscussionsHtml)
}

const displayDiscussion = function(data){
	console.log(data)
}
module.exports = {
	signUpSuccess,
	signInSuccess,
	signInError,
	displayDiscussions,
	displayDiscussion
}