$(document).ready(function () {

  // Event listener to hide the form when 'Cancel' is clicked.
  $(document).on('click', '#cancel-contribution', () => {
     $(".new-contributions-container").hide();
  });

  //KT Event listener for click on storyview to get all contributions
  $("#story-list").on("click", "article[id]", function () {
    // 'this' refers to the clicked div
    var storyId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: `/contributions/story/${storyId}`, //Point to specific ID
    })
      .done((contributions) => {
        console.log(contributions);
        // $(".contributions-list").append($story);
      })
      .catch((err) => {
        console.log("Error fetching story:", err);
      });
  });

  // Submitted contribution proposal appears below contribution proposal form.
  const genContributionView = (contribution) => {

    let {
      story_proposal,
      id,
      user_id,
      votes,
      date_created,
      proposal_status
    } = contribution;

    const $contributionView = `
      <div class="contribution" data-id="${id}">
        <p>${story_proposal}</p>
        <small>Proposed on: ${date_created} | Status: ${proposal_status} | Votes: ${votes}</small>
        <button class="upvote-btn">Upvote</button>
        ${isAdmin ? '<button class="approve-btn">Approve</button>' : ''}
      </div>`;

    return $contributionView;
  };

  $("#story-view-container").on('click','#submit-contribution',() => {
    const contributionInput = $('.contribution-input-text').val(); // KT For some reason it won't work with an id selector
    const storyId= $('.story-view').attr('id'); //KT Grab id from element tag with class story view

    console.log("tried to add contribution!") // test
    console.log("s-contributions:", contributionInput, storyId); //test

    $.ajax({
      method: 'POST',
      url: '/contributions/add',
      data: {
        story_id: storyId,
        story_proposal: contributionInput
      }
    })
    .done((response) => {
      if (response.success) {
        // Generate the contribution view and insert it right after the contribution form.
        const newContribution = genContributionView(storyProposal, response.contribution.id);
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
