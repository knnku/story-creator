// Story scripts
// if neither admin or guest, stories are still shown by default

$(document).ready(function(){
  // Initially show stories and main viewer (irrespective of login status)
  $('#story-list').show();
  $('#main-viewer').show();

 $('#login').on('click', (event) => {
   event.preventDefault();
   const $userInput = $('#login-form').serialize();

   console.log('Login button clicked!');

   $.ajax({
     method: 'POST',
     url: 'users/login',
     data: $userInput
   })
   .done(response => {
     console.log(response);
     // After login success, check for user type.
     if (response.success) {

       // If user is 'admin', show button.
       if (response.userType === 'admin') {
         $('#add-story').show;
       // If user is not 'admin', hide button.
       } else if(response.userType !== 'guest') {
         $('#add-story').hide;
       } else {
         console.log(response.message || 'Error logging in.');
       }
     }
   })
   .catch(err => {
     console.log(err.message);
   });
 });
});
