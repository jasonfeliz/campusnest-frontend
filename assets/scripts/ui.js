const store = require('./store.js')
const showDiscussions = require('./templates/discussion-list.handlebars')
const helper = require('./helper/helper_functions.js')


//function to clear forms.
//takes in form id parameter
const clearForm = function(formId){
  $(formId + " input").val('')
  $(formId + " .form-message").html('').removeClass('success error')
}

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
  clearForm('#signin-form')
})

const loadHomepage = function(){
	$('#user-welcome').text('Hello, ' + store.user.username)
	$('#college-name').text(store.college.college_name)
	$('#city').text(store.college.city + ', ')
	$('#state').text(store.college.state)
	$('#post-list').html('')
	$('#create-form').css('display','flex')
	$('#create-form').css('flex-direction','column')
  $('#edit-find-form').hide()
}


const signUpSuccess = function(data){
  store.user = data.user
	store.college = data.user.college
  clearForm('#signin-form')
  clearForm('#signup-form')
	$('.modal, .landing-page').hide()
	$('.main-page').show()
  loadHomepage()
  helper.displayMessage('Thank you for signing up! Enjoy CampusNest!!')
}

const signInSuccess = function(data){
	store.user = data.user
	store.college = data.user.college
  clearForm('#signin-form')
  clearForm('#signup-form')
	$('.modal, .landing-page').hide()
	$('.main-page').show()
	//load homepage for signed in
	loadHomepage()
  helper.displayMessage('Welcome back!')
}

const signOutSuccess =  function(){
  store.user = null
  store.college = null
  $('.main-page').hide()
  $('.landing-page').show()
  $('#signup-form .form-message').html('<div>You have successfully logged out</div>')
  $('#signup-form .form-message').addClass('success')
}

const changePasswordSuccess = function(){
  $('#changepw-form > input').val('')
	$('#changepw-form .form-message').removeClass("error").html("")
  helper.displayMessage('You have successfully changed your password')
}
const changePasswordFailure = function(){
  $('#changepw-form > input').val('')
  $('#changepw-form .form-message').html('<div>You entered an invalid password</div>')
	$('#changepw-form .form-message').addClass('error')
	$('#changepw-form > input').val('')
  setTimeout(function(){
    $('#changepw-form .form-message').removeClass("error").html("")
  },5000)
}

const signInError = function(){
	$('#signin-form .form-message').html('<div>Invalid email/password combination. Try again!</div>')
	$('#signin-form .form-message').addClass('error')
	$('#signin-form input[name="password"]').val('')
}


const displayDiscussions = function(data){

	const dataArr = data.discussions
  dataArr.forEach(function(e,i){
      if(e.user.id === store.user.id){
        e.owner = true
      }else{
        e.owner = false
      }
  })
  	const showDiscussionsHtml = showDiscussions(
  		{
  			discussions : dataArr,
        current_user_id:  store.user.id
  		})
  	$('#post-list').html(showDiscussionsHtml)
}

const displayDiscussion = function(data){
	let content = "<div class='post-item' data-id='" + data.discussion.id +"'>"
	content += "<h4>" + data.discussion.title + "</h4>"
  content += "<span class='reply-btn'>Reply</span>"
	content += "<div class='post-info'>"
	content += "<span class='author'>Created by: " + data.discussion.user.username + "</span>"
	content += "<span class='date'>" + data.discussion.created_at + "</span>"
	content += "<span class='category'>" + data.discussion.interest.interest_name + "</span>"
	content += "</div>"
	content +=  "<p>" + data.discussion.body + "</p>"
	content += "</div>"

  content += '<div class="replies"><h3>Replies</h3><ul id="replies-list"></ul></div>'
	$('#post-list').html(content)
}

const displayEditDiscussion = function(data){
  $('#edit-form').show()
  $('#edit-id').val(data.discussion.id)
  $('#edit-title').val(data.discussion.title)
  $('#edit-body').val(data.discussion.body)
  $('#edit-form').css('display','flex')
  $('#edit-form').css('flex-direction','column')
}
 const deleteSuccess = function(){
   $('#confirm-modal').hide()
   helper.displayMessage('Your post has been deleted')
	 $('#delete-form > input').val('')
 }

  const updateSuccess = function(){
 		$('#edit-modal').hide()
     $('#edit-form input').val('')
    helper.displayMessage('Post updated successfully!')
 }
 const replySuccess = function(data){
   $('#reply-modal').hide()
	 $('#reply-form textarea').val('')
   $('#replies-list').prepend(`<li class="reply-item"><div>${data.reply.body}</div><span>posted by: ${data.reply.user.username}</span></li>`)
 }

const displayReplies = function(data) {
  let content = ""
  data.replies.forEach(function(e){
    content += `<li class="reply-item"><div>${e.body}</div><span>posted by: ${e.user.username}</span></li>`
  })

  $('#replies-list').html(content)
}



module.exports = {
	signUpSuccess,
	signInSuccess,
	signInError,
	displayDiscussions,
	displayDiscussion,
	deleteSuccess,
	updateSuccess,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  displayEditDiscussion,
  replySuccess,
  displayReplies

}
