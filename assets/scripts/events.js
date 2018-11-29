const helper = require('./helper/helper_functions.js')



const onSignUp = function(event){
	$('pre').html('')
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
			$('pre').append('<div>' + e + '</div>')
		})
	}else{
		helper.api.signUpApi(dataObj)
	}
}

const onSignIn = function(event){
	$('pre').html('')
	event.preventDefault()
	const dataObj = helper.getFormData($('#signin-form').serializeArray(),'credentials')	
	helper.api.signInApi(dataObj)
}


const addHandlers = function (){
	//on button click events
	$('#signup-button').click(onSignUp)
	$('#signin-button').click(onSignIn)

	//when user clicks on college input
	$('#signup-form > input[name="college"]').focus(function(){
		$('#college-list-overlay').fadeIn()
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