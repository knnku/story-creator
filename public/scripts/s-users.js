const usrCookie = document.cookie;
const userWho = usrCookie.split("="); // Brute force cookie params to get admin.


$(document).ready(function () {

  // If a user is already logged in, display a welcome message and handle "admin" functionalities.
  if (userWho[1] === "admin" || userWho[1] === "guest") {

    $("#login-form").removeClass("d-flex").hide();
    $("#login-message span").text(`Welcome, ${userWho[1]}`);
    $("#login-message").show();

    // Show add story button for admins.
    if (userWho[1] === "admin") {
      $("#add-story").show();
    }
  }

  // Event handler for login.
  $("#login").on("click", (event) => {
    event.preventDefault();
    const $userInput = $("#login-form").serialize();
    console.log($userInput);

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

          // Check user type from the server's response.
          if (response.userType === "admin") {
              $("#add-story").show();
          } else {
              $("#add-story").hide();
          }
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

  // Event handler for logout.
  $("#logout").on("click", (event) => {
    event.preventDefault();

    // Hide all admin stuff and set cookie to null.
    $("#add-story").hide();
    $("#login-message span").hide();
    $("#login-message").hide();
    $("#login-form").addClass("d-flex").show();
    document.cookie = "username=;"

    // Cancel story creation form when admin logs out.
    $("#cancel-story").click();
  });

  console.log("DOM ready!");
});
