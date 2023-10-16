// Story scripts
// if neither admin or guest, stories are still shown by default

$(document).ready(function () {
  // Initially show stories and main viewer (irrespective of login status)
  $("#story-list").show();
  $("#main-viewer").show(); //we can just show by default

  /** ---------------------------------------------------------------------
   * Hide and Persist addstory login button.
   * --------------------------------------------------------------------- */
  const usrCookie = (document.cookie);
  const queryToUser = usrCookie.split("=") //bruteforce cookie params to get admin

  console.log(queryToUser[1]);

  if (queryToUser[1] !== "admin") {
     $("#add-story").hide(); //hide addstory button in pageLoad
  }

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

    const $storyBuild = `
      <article class="story" id="article${id}">

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
        $("#story-list").append($storyElement);
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

   $("#story-list").on("click", 'article[id^="article"]', function () {
     // 'this' refers to the clicked div
     var clickedDivId = $(this).attr("id");
     alert("Clicked on " + clickedDivId);
     // Your click handling logic here
   });

});
