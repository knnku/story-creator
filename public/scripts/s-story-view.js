$(document).ready(() => {

  const genStoryView = (story) => {
     let {
       id,
       user_id,
       main_story,
       title,
       story_status,
       date_created,
       date_completed,
     } = story;

     if (story_status) {
      story_status = "Complete"
     }

     if (!story_status) {
      story_status = "Incomplete"
     }

     if (!date_completed) {
      date_completed = "N/A"
     }

     const $storyView = `
      <article class="story-view container-sm" id="${id}">

        <header class="story-view-header">
          <h4 class="story-title">"${title}"</h4>
          <i class="story-creator">Creator: user#${user_id}</i>
        </header>
        <hr class="hr"/>
        <p class="story-paragraph">${main_story}</p>

        <footer class="story-view-footer">
          <div>Story Status: ${story_status}</div>
          <div>Date Created: ${date_created}</div>
          <div>Date Completed: ${date_completed}</div>
          <button type="button" class="btn btn-primary" id="complete-story">Complete Story</button>
        </footer>

      </article>
        <hr>
      <div class="new-contributions-container container-sm" style="display: ${story_status === "Complete" ? "none" : "inline"}">
        <form class="add-contribution">
          <label for="contribution-add" class="form-label">Contribute:</label>
          <textarea class="form-control contribution-input-text" rows="3"></textarea>
        </form>
        <div class="contribution-ctrls">
          <button type="button" class="btn btn-primary" id="submit-contribution">Submit Contribution</button>
          <button type="button" class="btn btn-primary" id="cancel-contribution">Cancel</button>
        </div>
      </div>
      <hr>
      <div class="contributions-list container"></div>

      `;

     return $storyView;
  };

  $("#story-list").on("click", 'article[id]', function () {
    // 'this' refers to the clicked div
    var storyId = $(this).attr("id");
    // alert("Clicked on story#" + storyId); //test

    $.ajax({
      method: "GET",
      url: `/stories/${storyId}`, //Point to specific ID
    })
      .done((story) => {
         $("#story-view-container").empty();
         const $story = genStoryView(story);
         $("#story-view-container").append($story);
      })
      .catch((err) => {
        console.log("Error fetching story:", err);
      });
  });

  //KT event listenery for completing/closing a story
  $('#story-view-container').on("click", '#complete-story', function () {
    var storyId = $(event.target).closest('article').attr('id')
    console.log(storyId); //Test

    $.ajax({
      method: "POST",
      url: `/stories/${storyId}/complete`,
    })
      .done(() => {
        console.log(story);
      })
      .catch((err) => {
        console.log("Error completing story:", err);
      });
  })

});
