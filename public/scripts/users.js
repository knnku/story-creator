// Client facing scripts here

$(document).ready(function () {

  $('#login').on('click', (event) => {
    event.preventDefault();

    const $userInput = $('#login-form').serialize();

    console.log('login button clicked!!');
    $.ajax({
      method: 'POST',
      url: '/users/login',
      data: $userInput
    })
    .done((response) => {
      console.log(response);
      
      if(response.success) {
        $('#message').text(response.message).show();
      } else {
        $('#message').text(response.message || "Error logging in.").show()
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
  });


console.log('DOM ready!');
});



