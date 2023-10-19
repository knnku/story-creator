$(document).ready(function () {

  const genContributionView = (storyProposal, contributionId, isAdmin) => {
    return `
    <div class="contribution" data-id="${contributionId}">
      <p>${storyProposal}</p>
      <button class="upvote-btn">Upvote</button>
      ${isAdmin ? '<button class="approve-btn">Approve</button>' : ''}
    </div>`;
  };

  $('#submit-contribution').on('click', () => {
    const storyProposal = $('#exampleFormControlTextarea1').val();
    const storyId = $("#story-id").val();  // Assuming you have a hidden input with this id holding the story's id

    $.ajax({
      method: 'POST',
      url: '/contributions/add',
      data: {
        story_id: storyId,
        story_proposal: storyProposal
      }
    })
    .done((response) => {
      if (response.success) {
        // Generate the contribution view and append below the form.
        const newContribution = genContributionView(storyProposal, response.contribution.id, response.isAdmin);
        $(".contributions-list").append(newContribution);
      } else {
        alert(response.message);
      }
    })
    .fail((error) => {
      alert("There was an error submitting your contribution. Please try again.");
    });
  });

  // Admin view and function for approving contributions.
  $(document).on('click', '.approve-btn', function() {
    const contributionId = $(this).closest(".contribution").data("id");
    const contributionText = $(this).siblings("p").text();

    $.ajax({
      method: 'POST',
      url: '/contributions/approve',
      data: {
        contribution_id: contributionId
      }
    })
    .done((response) => {
      if (response.success) {
        // Visually merge the contribution below the main story.
        $("#story-text").append("<p>" + contributionText + "</p>");
      } else {
        alert(response.message);
      }
    })
    .fail((error) => {
      alert("There was an error approving the contribution. Please try again.");
    });
  });

});
