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
    $("#story-view-container").empty();

    // If the form doesn't already exist in the DOM, append it. Otherwise, just show it.
    if (!$(".story-creation-form").length) {
        $("#story-view-container").append($newStoryForm());
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

    let userWho = document.cookie.split("="); //KT Grab cookie info and dfine if admin or not
    let user_id = null;

    console.log("submit story button clicked!");

    console.log(userWho[1]); //current user

    if (userWho[1] === "admin") {
      user_id = 1;
    }

    if (userWho[1] === "guest") {
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

          // Assuming you have a function createStoryElement in this file or it's globally available:
          const newStoryHTML = createStoryElement(response.story);
          const $newStory = $(newStoryHTML); // Convert the string to a jQuery object
          $("#story-list").prepend($newStory); // Add the new story at the beginning of the list.
          $newStory.hide().fadeIn(1000);
          $('#cancel-story').click(); // Hide the creation form.
      }
    })
    .fail(function(error) {
        alert("There was an error posting your story. Please try again.");
    });
  });

});
