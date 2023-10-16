// Contribution Scripts
$(document).ready(function () {

  /** ---------------------------------------------------------------------
   * Render stories according to wire frame.
   * --------------------------------------------------------------------- */
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

    const $storyBuild = `
    <article>
      <header>
        <h3>Created by user: #${user_id}</h2>
        <h3>${title}</h2>
      </header>
      <p>${main_story}</p>
      <footer>
        <div>${story_status}</div>
        <div>${date_created}</div>
        <div>${date_completed}</div>
        <button class="contribute-to-story" data-story-id="${id}">Contribute</button>

        <!-- Contribution form within the story -->
        <div class="contribution-form" style="display:none;">
            <textarea class="contribution-text" placeholder="Write your contribution here..."></textarea>
            <input type="submit" value="Submit Contribution">
        </div>

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

  /** ---------------------------------------------------------------------
   * Event Handler for Contribution.
   * --------------------------------------------------------------------- */
    // Event handler for showing the contribution modal
    $(".story-list").on("click", ".contribute-to-story", function() {
      // Toggle the form's visibility
      $(this).siblings('.contribution-form').toggle();
  });

  //   $(".story-list").on("click", ".contribute-to-story", function() {
  //     const storyId = $(this).data("story-id");

  //     // Assign the storyId to the modal for reference when submitting
  //     $("#contribution-modal").data("story-id", storyId).show();
  // });

  // Event handler for submitting a contribution
  $("#contribution-form").on("submit", function(event) {
      event.preventDefault();

      const storyId = $("#contribution-modal").data("story-id");
      const contributionText = $("#contribution-text").val();

      // Make an AJAX POST request to send the contribution to the server
      $.ajax({
          method: "POST",
          url: `/stories/${storyId}/contribute`,
          data: { contribution: contributionText }
      })
      .done(response => {
          alert(response.message);
          $("#contribution-modal").hide();
      })
      .catch(err => {
          console.log("Error contributing to the story:", err);
    });
  });
});
