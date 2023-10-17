$(document).ready(function () {

  // IMPORTANT: Renders stories.
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

    let contributeButton = '';

    // If story_status is false (meaning incomplete)
    if (!story_status) {
        contributeButton = `
        <button class="contribute-to-story" data-story-id="${id}">Contribute</button>

        <!-- Contribution form within the story -->
        <form class="contribution-form" style="display:none;">
            <textarea class="contribution-text" placeholder="Add your part to this story."></textarea>
            <input type="submit" value="Submit">
            <button type="button" class="cancel-contribution">Cancel</button>
        </form>
        `;
    }

    const $storyBuild = `
    <article>
      <header>
        <h3>Created by user: #${user_id}</h2>
        <h3>${title}</h2>
      </header>
      <p>${main_story}</p>
      <footer>
        <div>Story completion: ${story_status}</div>
        <div>Date created: ${date_created}</div>
        <div>Date completed: ${date_completed}</div>
        ${contributeButton}
      </footer>
    </article>
    `;

    return $storyBuild;
  };

  // Fetch and display stories from the database to append contribution buttons.
  $.ajax({
    method: "GET",
    url: "/stories",
  })
    .done((stories) => {
      stories.forEach((story) => {
        const $storyElement = createStoryElement(story);
        $(".story-list").append($storyElement);
      });
    })
    .catch((err) => {
      console.log("Error fetching stories for contributions:", err);
    });

  // Event handler for showing the contribution modal
  $(".story-list").on("click", ".contribute-to-story", function() {
    // Toggle the form's visibility.
    $(this).siblings('.contribution-form').toggle();
  });

  // Event handler for cancelling contribution.
  $(".story-list").on("click", ".cancel-contribution", function() {
    // Hide the form.
    $(this).closest('.contribution-form').hide();
  });

  // Event handler for submitting a contribution.
  $(".story-list").on("submit", ".contribution-form", function(event) {
    event.preventDefault();

    const storyId = $(this).siblings(".contribute-to-story").data("story-id");
    const contributionText = $(this).find(".contribution-text").val();

    // Make an AJAX POST request to send the contribution to the server.
    $.ajax({
        method: "POST",
        url: `/stories/${storyId}/contribute`,
        data: { contribution: contributionText }
    })
    .done(response => {
        alert(response.message);
        $(this).hide();
    })
    .catch(err => {
        console.log("Error contributing to the story:", err);
    });
  });
});
