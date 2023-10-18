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
      <article class="story" id="${id}">
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

  $.ajax({
    method: "GET",
    url: "/stories",
  })
  .done((stories) => {
    // Render story to view.
    stories.forEach(story => {
      const $storyElement = createStoryElement(story);
      $("#story-list").prepend($storyElement);
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
      const userType = userWho[1]; // Store user type admin/guest

      // After login success, check for user type.
      if (response.success) {
        // If user is 'admin', show button.
        if (userType === "admin") {
          $("#add-story").show();
        } else {
          // If user is not 'admin', hide button.
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

  // We have moved the addition logic to the s-add-story.js file,
  // so no other change is necessary in this file.

});
