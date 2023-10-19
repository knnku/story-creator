$(document).ready(function () {

  // Submitted contribution proposal appears below contribution proposal form.
  const genContributionView = (contribution) => {
    let {
      story_proposal: storyProposal,
      id: contributionId,
      user_id: userId,
      votes,
      date_created: dateCreated,
      proposal_status: proposalStatus
    } = contribution;

    const $contributionView = `
      <div class="contribution" data-id="${contributionId}">
        <p>${storyProposal}</p>
        <small>Proposed on: ${formattedDate} | Status: ${proposalStatus} | Votes: ${votes}</small>
        <button class="upvote-btn">Upvote</button>
        ${isAdmin ? '<button class="approve-btn">Approve</button>' : ''}
      </div>`;

    return $contributionView;
  };

  $('#submit-contribution').on('click', () => {
    const storyProposal = $('#exampleFormControlTextarea1').val();
    const storyId = $("#story-id").val();

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
        // Generate the contribution view and insert it right after the contribution form.
        const newContribution = genContributionView(storyProposal, response.contribution.id, response.isAdmin);
        $(".new-contributions-container").after(newContribution);  // Using .after() instead of .append()
      } else {
        alert(response.message);
      }
    })
    .fail((error) => {
      alert("There was an error submitting your contribution. Please try again.");
    });
  });

  // // Admin view and function for approving contributions.
  // $(document).on('click', '.approve-btn', function() {
  //   const contributionId = $(this).closest(".contribution").data("id");
  //   const contributionText = $(this).siblings("p").text();

  //   $.ajax({
  //     method: 'POST',
  //     url: '/contributions/approve',
  //     data: {
  //       contribution_id: contributionId
  //     }
  //   })
  //   .done((response) => {
  //     if (response.success) {
  //       // Visually merge the contribution below the main story.
  //       $("#story-text").append("<p>" + contributionText + "</p>");
  //     } else {
  //       alert(response.message);
  //     }
  //   })
  //   .fail((error) => {
  //     alert("There was an error approving the contribution. Please try again.");
  //   });
  // });

});
