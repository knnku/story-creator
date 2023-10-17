$(document).ready(() => {

  // Function that returns an HTML structure for a story creation form.
  const $newStoryForm = () => {
    const storyForm = `
      <div class="story-creation-form" style="display:none;">
        <input type="text" id="new-story-title" placeholder="Enter your title.">
        <textarea id="new-story-text" placeholder="Begin your story!"></textarea>
        <button id="submit-story">CREATE</button>
        <button id="cancel-story">Cancel</button>
      </div>
    `;
    return storyForm;
  }

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

});
