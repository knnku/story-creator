

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
      <article class="storyView" id="article${id}">

      <header class="storyViewHeader">
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

     return $storyView;
  };

  $("#story-list").on("click", 'article[id]', function () {
    // 'this' refers to the clicked div
    var storyId = $(this).attr("id");
    alert("Clicked on story#" + storyId); //test

    $.ajax({
      method: "GET",
      url: `/stories/${storyId}`, //Point to specific ID
    })
      .done((stories) => {
        // console.log(stories); //Test

        // Render story to view section.
        stories.forEach((story) => {
          const $story = genStoryView(story);
          $("#story-view").append($story);
        });
      })
      .catch((err) => {
        console.log("Error fetching story:", err);
      });
  });



});
