// Story scripts
// if neither admin or guest, stories are still shown by default

$(document).ready(function(){
  // if user is admin and clicks login then show story list
  // show the main viewer
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
      console.log(res);
      // After login success, display story and main viewer.
      if (response.success) {
        $('#story-list').show();
        $('#main-viewer').show();

        // Check if user is 'admin'.
        if (response.userType === 'admin') {
          $('#add-story').show;
        } else if(response.userType === 'guest') {
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
