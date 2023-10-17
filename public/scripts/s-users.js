$(document).ready(function () {
  const usrCookie = document.cookie;
  const userWho = usrCookie.split("="); // Brute force cookie params to get admin.

  // If a user is already logged in, display a welcome message and handle "admin" functionalities.
  if (userWho[1] === "admin" || userWho[1] === "guest") {
    $("#login-form").removeClass("d-flex").hide(); // Remove 'd-flex class' because it overrides hide using !important
    $("#login-message span").text(`Welcome, ${userWho[1]}`);
    $("#login-message").show();

    // WL new - Show add story button for admins.
    if (userWho[1] === "admin") {
      $("#add-story").show();
    }
    // ----- fin
  }

  // Event handler for login.
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

          // WL new - Check if the user type is admin and show the "Add Story" button.
          const userType = response.data[0].username;
          if (userType === "admin") {
            $("#add-story").show();
          }
          // ----- fin

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

  // Event handler for logout.
  $("#logout").on("click", (event) => {
    event.preventDefault();

    // Hide all admin stuff and set cookie to null.
    $("#add-story").hide();
    $("#login-message span").hide();
    $("#login-message").hide();
    $("#login-form").addClass("d-flex").show();
    document.cookie = "username=;"
  });

});
