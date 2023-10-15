// Story scripts
// if neither admin or guest, stories are still shown by default

$(document).ready(function () {
  // Initially show stories and main viewer (irrespective of login status)
  $("#story-list").show();
  $("#main-viewer").show();

  /** ---------------------------------------------------------------------
   * Render stories according to wire frame.
   * --------------------------------------------------------------------- */

  // Build tweet element and hydrate with object data from db
  const createStoryElement = (story) => {
    const {
      id,
      user_id,
      main_story,
      title,
      story_status,
      date_created,
      date_completed,
    } = story;

    console.log(
      id,
      user_id,
      main_story,
      title,
      story_status,
      date_created,
      date_completed
    ); //test

    const $storyElement =
    `<article>

      <header>
      <h2>Created By: ${user_id}</h2>
      <h2>${title}</h2>
      </header>

      <p>${main_story}</p>

      <footer>
      <div>${story_status}</div>
      <div>${date_created}</div>
      <div>${date_completed}}</div>
      </footer>

    </article>`;

    return $storyElement;
  };

  // Fetch and display stories from the database as soon as the page loads
  $.ajax({
    method: "GET",
    url: "/stories",
  })
    .done((stories) => {
      // console.log(stories); //Test

      // Render story to view.
      stories.forEach((story) => {
        // $('#story-list').append(`<div>${story.main_story}</div>`);
         const storyOuput = createStoryElement(story);
        $('.story-list').prepend(storyOuput)
      });
    })
    .catch((err) => {
      console.log("Error fetching stories:", err);
    });

  /** ---------------------------------------------------------------------
   * End of rendering code block.
   * --------------------------------------------------------------------- */

  // Login event handler for type of user.
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
        console.log(response);
        // After login success, check for user type.
        if (response.success) {
          // If user is 'admin', show button.
          if (response.userType === "admin") {
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
});
