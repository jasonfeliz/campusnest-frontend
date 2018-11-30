const helper = require('./helper/helper_functions.js')
const ui = require('./ui.js')
const store = require('./store.js')

const onSignUp = function(event){
	$('#signup-form .form-message').html('')
	$('#signup-form .form-message').removeClass('error success')

	event.preventDefault()	
	// //gather up form data
	// //form data must be in a credentials object 
	// 	//with email, password, password_confirmation, college_id, username keys
	const dataObj = helper.getFormData($('#signup-form').serializeArray(),'credentials')
	// //run some validations
	// //return an array of error messages
	// //if array is empty, run api, if not, display error messages to user
	const validate = helper.validateSignUpForm(dataObj)
	if(validate.length){
		validate.forEach(function(e){
			$('#signup-form .form-message').append('<div>' + e + '</div>')
			$('#signup-form .form-message').addClass('error')
		})
	}else{
		helper.api.signUpApi(dataObj).then(ui.signUpSuccess)
	}
}

const onSignIn = function(event){
	event.preventDefault()
	const dataObj = helper.getFormData($('#signin-form').serializeArray(),'credentials')	
	helper.api.signInApi(dataObj).then(ui.signInSuccess).catch(ui.signInError)
}

const onSignOut = function(event){
	event.preventDefault()
	helper.api.signOutApi()
}


const onChangePw = function(event){
	event.preventDefault()
	const dataObj = helper.getFormData($('#changepw-form').serializeArray(),'passwords')
	helper.api.onChangePwApi(dataObj)
}

const onCreateDiscussion = function(event){
	$('#create-form .form-message').html('')
	$('#create-form .form-message').removeClass('error success')
	event.preventDefault()
	const dataObj = helper.getFormData($('#create-form').serializeArray(),'discussion')
	dataObj.discussion.college_id = store.college.id
	dataObj.discussion.user_id = store.user.id
	const validate = helper.validateDiscussionForm(dataObj)
	if(validate.length){
		validate.forEach(function(e){
			$('#create-form .form-message').append('<div>' + e + '</div>')
			$('#create-form .form-message').addClass('error')
		})
	}else{
		helper.api.onCreateDiscussionApi(dataObj).then(function(){
			$('#create-form .form-message').append('<div>Post created successfully!</div>')
			$('#create-form .form-message').addClass('success')
			$('#create-form > input, #create-form > select,#create-form > textarea').val('')
		}).catch(function(){
			$('#create-form .form-message').append('<div>OOps! Something went wrong...</div>')
			$('#create-form .form-message').addClass('error')
		})
	}
	
}

const onGetAllDiscussions = function(event){
	event.preventDefault()
	$('#discussion-form').html('')
	const dataObj = {'discussion':{}}
	dataObj.discussion.college_id = store.college.id
	helper.api.onGetDiscussionsApi(dataObj).then(ui.displayDiscussions)
}

const onGetDiscussion = function(event){
	event.preventDefault()
	const getId = $('#get_discussion-form > input[name="id"]').val()
	if (getId === "" || isNaN(getId) ) {
		$('#get_discussion-form .form-message').append('Id must be a number')
		$('#get_discussion-form .form-message').addClass('error')
	}else{
		const dataObj = {'discussion':{}}
		dataObj.discussion.id = getId
		helper.api.onGetDiscussionsApi(dataObj).then(ui.displayDiscussion).catch(function(){
			$('#create-form .form-message').append('<div>Discussion could not be found</div>')
			$('#create-form .form-message').addClass('error')			
		})
	}

}

const onDeleteDiscussion = function(event){
	event.preventDefault()
}

const onUpdateDiscussion = function(event){
	event.preventDefault()
}
const onShowUserProfile = function(event){
	event.preventDefault()
}

const onGetUserInterests = function(event){
	event.preventDefault()
}
// stretch goals
// const onGetReplies = function(event){

// }

// const onRemoveReplies = function(event){

// }

// const onCreateReplies = function(event){

// }

// const onFilterDiscussions = function(event){

// }
// const onSchoolSearch = function(event){

// }




const addHandlers = function (){
	//on form submit auth events
	$('#signup-form').submit(onSignUp)
	$('#signin-form').submit(onSignIn)
	$('#signout-form').submit(onSignOut)
	$('#changepw-form').submit(onChangePw)

	//on button click discussion events
	$('#create-form').submit(onCreateDiscussion)
	$('#get-discussion-form').submit(onGetDiscussion)


	$('#all-posts-button').click(onGetAllDiscussions)
	
	$('#create-post-button').click(function(){
		$('#post-list').html('')
		$('#discussion-form').show()
		const formHtml = $('#create').html();
		$('#discussion-form').html(formHtml)
	})
	$('#edit-post-button').click(function(){
		$('#post-list').html('')
		$('#discussion-form').show()
		const formHtml = $('#edit').html();
		$('#discussion-form').html(formHtml)
	})
	$('#get-post-button').click(function(){
		$('#post-list').html('')
		$('#discussion-form').show()
		const formHtml = $('#get').html();
		$('#discussion-form').html(formHtml)
	})
	$('#delete-post-button').click(function(){
		$('#post-list').html('')
		$('#discussion-form').show()
		const formHtml = $('#delete').html();
		$('#discussion-form').html(formHtml)
	})
	//when user clicks on college input
	$('#signup-form > input[name="college"]').focus(function(){
		$('#college-list-overlay').fadeIn()
		$('#college-list').html('')
		$.getJSON( "public/colleges.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	$('#college-list').append('<div class="college-list-item" data-collegeId="'+val.id+'">' + val.college_name + '</div>')
		  });
		});
	})
	//when user chooses a college
	$('#college-list').on('click','div',function(){
		$('#signup-form > input[name="college"]').val($(this).text())
		$('#college-id').val($(this).data('collegeid'))
		$('#college-list-overlay').hide()
		$('#college-list').html('')
	})



}

module.exports = {
	addHandlers
}



	//autocomplete college field
    // $('#signup-form > input[name="college"]').autocomplete({
    //     delay: 200,
    //     minLength: 2,
    //     source: '/search-college',
    //     appendTo: $('#signup-form'),
    //     change: function (event, ui) {
    //         	$('#signup-form > input[name="college"]').val(ui.item.value);
    //         	$('#college-id').val(ui.item.label);
    //         }
    // }).autocomplete( "instance" )._renderItem = function( ul, item ) {
    //   return $( "<li>" ).append( "<div>" + item.value + "</div>" ).appendTo( ul );
    // };

	//on keyup events