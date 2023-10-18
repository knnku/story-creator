

$(document).ready(() => {

  const genStoryView = (story) => {
     const {
       id,
       user_id,
       main_story,
       title,
       story_status,
       date_created,
       date_completed,
     } = story;

     const $storyView= `
      <article class="story-view container-sm" id="${id}">

      <header class="story-view-header">
        <h4 class="story-title">${title}</h4>
        <i class="story-creator">Created By: #${user_id}</i>
      </header>

      <p>${main_story}</p>

      <footer>
        <div>Open: ${story_status}</div>
        <div>Date Created: ${date_created}</div>
        <div>Date Completed: ${date_completed}</div>
      </footer>

    </article>`;

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
         $("#story-view").empty();
         const $story = genStoryView(story);
         $("#story-view").append($story);
      })
      .catch((err) => {
        console.log("Error fetching story:", err);
      });
  });



});
