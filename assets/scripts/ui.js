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
	$('#post-list').html('')
		$('#create-form').css('display','flex')
		$('#create-form').css('flex-direction','column')
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
  	const showDiscussionsHtml = showDiscussions(
  		{
  			discussions : dataArr
  		})
  	$('#post-list').html(showDiscussionsHtml)
}

const displayDiscussion = function(data){
	let content = "<div class='post-item' data-id='" + data.discussion.id +"'>"
	content += "<h4>" + data.discussion.title + "</h4>"
	content += "<div class='post-info'>"
	content += "<span class='author'>Created by: " + data.discussion.user.username + "</span>"
	content += "<span class='date'>" + data.discussion.created_at + "</span>"
	content += "<span class='category'>" + data.discussion.interest.interest_name + "</span>"
	content += "</div>"
	content +=  "<p>" + data.discussion.body + "</p>"
	content += "</div>"
	$('#post-list').html(content)
}
                    
                        
 const deleteSuccess = function(){
 		$('#delete-form .form-message').append('<div>Post deleted successfully!</div>')
		$('#delete-form .form-message').addClass('success')
		$('#delete-form > input,#delete-form > input').val('')
 }                  
  
  const updateSuccess = function(){
 		$('#edit-form .form-message').append('<div>Post updated successfully!</div>')
		$('#edit-form .form-message').addClass('success')
		$('#edit-form > input,#edit-form > textarea').val('')
 }                          
                            
                            
                        
                        
                    
module.exports = {
	signUpSuccess,
	signInSuccess,
	signInError,
	displayDiscussions,
	displayDiscussion,
	deleteSuccess,
	updateSuccess

}