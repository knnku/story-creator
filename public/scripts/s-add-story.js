$(document).ready(() => {

  const $newStoryForm = () => {
    const storyForm = `
      <div class="story-creation-form">
        <input type="text" id="new-story-title" placeholder="Enter your title.">
        <textarea id="new-story-text" placeholder="Begin your story!"></textarea>
        <button id="submit-story">CREATE</button>
        <button id="cancel-story">Cancel</button>
      </div>
    `;
    return storyForm;
  }

  $('#add-story').on('click', () => {
    $("#story-view").empty();
    $(".story-creation-form").show();
  })

});
