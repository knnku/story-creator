$(document).ready(function () {
  const usrCookie = document.cookie;
  const userWho = usrCookie.split("="); //bruteforce cookie params to get admin

  if (userWho[1] === "admin" || userWho[1] === "guest") {
    $("#login-form").removeClass("d-flex").hide(); //Rmv 'd-flex class' becase overrides hide using !important
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

  $("#logout").on("click", (event) => {
    event.preventDefault();

    //hide all admin stuff and set cookie to null
    $("#add-story").hide();
    $("#login-message span").hide();
    $("#login-message").hide();
    $("#login-form").addClass("d-flex").show();
    document.cookie = "username=;"
  });


    console.log("DOM ready!");
});
