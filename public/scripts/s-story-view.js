

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
        <hr class="hr" />
        <p class="story-paragraph">${main_story}</p>

        <footer class="story-view-footer">
          <div>Complete: ${story_status}</div>
          <div>Date Created: ${date_created}</div>
          <div>Date Completed: ${date_completed}</div>
        </footer>

      </article>
        <hr>
      <div class="new-contributions-container container-sm">
        <form class="add-contribution">
          <label for="exampleFormControlTextarea1" class="form-label">Contribute:</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea
        </form>
        <button id="submit-contribution">Submit Contribution</button>
        <button id="cancel-story">Cancel</button>
      </div>
      <hr>
      <div class="contributions-list container">
      Contributions will live here. Upvote and downvote
      </div>

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



});
