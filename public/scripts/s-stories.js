$(document).ready(function () {
  // Initially show stories and main viewer (irrespective of login status)
  $("#story-list").show();
  $("#main-viewer").show(); //we can just show by default

  /** ---------------------------------------------------------------------
   * Hide and Persist add-story login button.
   * --------------------------------------------------------------------- */
  const usrCookie = (document.cookie);
  const queryToUser = usrCookie.split("=") //bruteforce cookie params to get admin

  console.log(queryToUser[1]);

  if (queryToUser[1] !== "admin") {
     $("#add-story").hide(); //hide add-story button in pageLoad
  }

  /** ---------------------------------------------------------------------
   * Render stories viewer.
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

    const $storyBuild = `<article>

      <header>
      <h3>Created by user: #${user_id}</h2>
      <h3>${title}</h2>
      </header>

      <p>${main_story}</p>

      <footer>
      <div>${story_status}</div>
      <div>${date_created}</div>
      <div>${date_completed}</div>
      </footer>

    </article>`;

    return $storyBuild;
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
        const $storyElement = createStoryElement(story);
        $(".story-list").append($storyElement); // Semantically should be id as we are pointing to a spcific container for stories
      });
    })
    .catch((err) => {
      console.log("Error fetching stories:", err);
    });

  /** ---------------------------------------------------------------------
   * End of rendering block.
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
        // console.log('post response:',  response.data[0].username);
        const userType = response.data[0].username; //Store usertype admin/guest

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
    $(".story-creation-form").toggle();
  });

  // Event handler for story submission.
  $("#submit-story").on("click", function() {
    const storyText = $("#new-story-text").val();
    const storyTitle = $("#new-story-title").val();

    $.ajax({
      method: 'POST',
      url: '/stories',
      data: {
        user_id: user_id, // TODO: Check with cookie!
        main_story: storyText,
        title: storyTitle
      },
    })
    .done(response => {
      console.log(response.message);
    })
    .catch(err => {
      console.log("Error adding story: ", err);
    })
  });

  // Event handler for cancelling story submission.
  $("#cancel-story").on("click", function() {
    // Hide the story creation form and reset its fields
    $(".story-creation-form").hide();
    $("#new-story-text").val('');
    $("#new-story-title").val('');
  });

});
