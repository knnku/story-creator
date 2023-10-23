// Build tweet element and hydrate with object data from db.
const createStoryElement = story => {
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
      <article class="story" id="${id}">
      <header class="story-header">
      <h4>${title}</h4>
      <i>Creator: #${user_id}</i>
      </header>

      <p>${main_story}</p>

      <footer>
      <div>Completed: ${story_status}</div>
      <div>Date Created: ${date_created}</div>
      <div>Date Completed: ${date_completed}</div>
      </footer>

    </article>`;

    return $storyBuild;
};

$(document).ready(function () {

  $.ajax({
    method: "GET",
    url: "/stories",
  })
  .done((stories) => {
    // Render story to view.
    stories.forEach(story => {
      const $storyElement = createStoryElement(story);
      $("#story-list").prepend($storyElement);
    });
  })
  .catch((err) => {
    console.log("Error fetching stories:", err);
  });

});
