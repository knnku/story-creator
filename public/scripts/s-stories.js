// Build tweet element and hydrate with object data from db.
const createStoryElement = story => {
  const {
    id,
    user_id,
    main_story,
    title,
    story_status,
    date_created,
    date_completed,
  } = story;

 const $storyBuild = `
      <article class="story">

      <header class="story-header">
      <h4>${title}</h4>
      <i>Creator: #${user_id}</i>
      </header>

      <p>${main_story}</p>

      <footer>
      <div>Open: ${story_status}</div>
      <div>Date Created: ${date_created}</div>
      <div>Date Completed: ${date_completed}</div>
      </footer>

    </article>`;

    return $storyBuild;
  };

$(document).ready(function () {

  const usrCookie = document.cookie; // Brute force cookie params to get admin.
  const queryToUser = usrCookie.split("=");

  if (queryToUser[1] !== "admin") {
    $("#add-story").hide(); //hide add story button in pageLoad
  }

  $.ajax({
    method: "GET",
    url: "/stories",
  })
    .done((stories) => {
      // console.log(stories); //Test

      // Render story to view.
      stories.forEach((story) => {
        // $('#story-list').append(`<div>${story.main_story}</div>`);
        const $storyElement = createStoryElement(story);
        $("#story-list").append($storyElement);
      });
    })
    .catch((err) => {
      console.log("Error fetching stories:", err);
    });

  // Event handler for login with type of user.
  $("#login").on("click", (event) => {
    event.preventDefault();
    const $userInput = $("#login-form").serialize();

    console.log("Login button clicked!");

    $.ajax({
      method: "POST",
      url: "users/login",
      data: $userInput,
    })
      .done((response) => {
        // console.log('post response:',  response.data[0].username);
        const userType = response.data[0].username; // Store user type admin/guest

        // After login success, check for user type.
        if (response.success) {
          // If user is 'admin', show button.
          if (userType === "admin") {
            $("#add-story").show();
            // If user is not 'admin', hide button.
          } else {
            $("#add-story").hide();
          }
        } else {
          console.log(response.message || "Error logging in.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // Event handler for adding story.
  $("#add-story").on("click", function() {
    // Toggle the story creation form's visibility
    $("#story-creation-form").toggle();
  });

  // Event handler for story submission.
  $("#submit-story").on("click", function() {
    const storyText = $("#new-story-text").val();
    const storyTitle = $("#new-story-title").val();
    const currentUser = document.cookie.split('=');
    let user_id = null;

    console.log("submit story button clicked!");

    console.log(currentUser[1]); //current user

    if (currentUser[1] === "admin") {
      user_id = 1;
    }

    if (currentUser[1] === "guest") {
      user_id = 2;
    }

    console.log(`New story titled "${storyTitle}" added with text: ${storyText}`);
  });

});
