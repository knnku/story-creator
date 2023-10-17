// Function that returns an HTML structure for a story creation form.
const $newStoryForm = () => {
  const storyForm = `
    <div class="story-creation-form" style="display:none;">
      <h2 class="story-form-heading">Tell Your Story</h2>
      <input type="text" id="new-story-title" placeholder="Enter your title.">
      <textarea id="new-story-text" placeholder="Type your story!"></textarea>
      <button id="submit-story">Create</button>
      <button id="cancel-story">Cancel</button>
    </div>
  `;
  return storyForm;
}

$(document).ready(() => {

  // Event listener for the 'add-story' button.
  $('#add-story').on('click', () => {
    $("#story-view").empty();

    // If the form doesn't already exist in the DOM, append it. Otherwise, just show it.
    if (!$(".story-creation-form").length) {
        $("#story-view").append($newStoryForm());
    }
    $(".story-creation-form").show();
  });

  // Event listener to hide the form when 'Cancel' is clicked.
  $(document).on('click', '#cancel-story', () => {
    $(".story-creation-form").hide();
  });

  // Event handler for story submission.
  $(document).on("click", "#submit-story", function() {
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

    // Send the new story to the server.
    $.ajax({
      method: "POST",
      url: "/stories",
      data: {
        main_story: storyText,
        title: storyTitle,
        user_id: user_id // TODO: validate with session cookie.
      }
    })
    .done(function(response) {
      if (response.success) {
          // Clear the form fields.
          $("#new-story-text").val(''); //point to current html forms
          $("#new-story-title").val('');

          alert("Your story has been posted successfully!");

          // Refresh the page or handle the successful addition
          // of the story to the list as you deem fit.
      }
    })
    .fail(function(error) {
        alert("There was an error posting your story. Please try again.");
    });
  });

});
