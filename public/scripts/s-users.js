$(document).ready(function () {
  const usrCookie = document.cookie;
  const userWho = usrCookie.split("="); //bruteforce cookie params to get admin

  console.log(userWho[1]);

  if (userWho[1] === "admin" || userWho[1] === "guest") {
    $("#login-form").removeClass("d-flex").hide(); //Remove 'd-flex class' becase it overrides hide using !important
    $("#login-message span").text(`Welcome, ${userWho[1]}`);
    $("#login-message").show();
  }

  $("#login").on("click", (event) => {
    event.preventDefault();
    const $userInput = $("#login-form").serialize();

    $.ajax({
      method: 'POST',
      url: '/users/login',
      data: $userInput
    })
      .done((response) => {
        // console.log(response);

        if (response.success) {
          $("#login-form").removeClass("d-flex").hide();
          $("#login-message span").text(response.message).show();
          $("#login-message").show();
        } else {
          $("#login-message span")
            .text(response.message || "Error logging in.")
            .show();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  console.log('DOM ready!');

  $("#logout").on("click", (event) => {
    event.preventDefault();
    //need to post to logout or somehow delete the cookie and then get form back
    userWho = 'noOne';
  });

});
