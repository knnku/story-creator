

$(document).ready(function () {

  // Submitted contribution proposal appears below contribution proposal form.
  const genContributionView = (contribution) => {
    let {
      story_proposal,
      story_id,
      id,
      user_id,
      votes,
      date_created,
      proposal_status,
    } = contribution;

    const $contributionView = `
    <div class="contribution" data-id="${id}">
      <p>${story_proposal}</p>
      <small>Proposed on: ${date_created} | Proposal Status: ${proposal_status} | Votes: ${votes}</small>
      <button class="upvote-btn">Upvote</button><br>
      <span class="admin-contribute-buttons" style="display: ${userWho[1] === "admin" ? "inline" : "none"}">
        <button class="accept-contribution">Accept</button>
        <button class="reject-contribution">Reject</button>
      </span>
    </div>`;

    return $contributionView;

  };

  // Event listener to hide the form when 'Cancel' is clicked.
  $(document).on("click", "#cancel-contribution", () => {
    $(".new-contributions-container").hide();
  });

  //KT Event listener for click on storyview to get all contributions
  $("body").on("click", "#story-list article[id]", function () {
    // 'this' refers to the clicked div
    var storyId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: `/contributions/story/${storyId}`, //Point to specific ID
    })
      .done((contributionsPkg) => {
        const contribs = contributionsPkg.contributions; //KT running out of variable names
        // KT render contribution to view
        contribs.forEach((contribution) => {
          const $contributionElement = genContributionView(contribution);
          console.log($contributionElement);
          $(".contributions-list").prepend($contributionElement)
        });
      })
      .catch((err) => {
        console.log("Error fetching story:", err);
      });
  });

  //Event listener for voting
  // $('#')

  // Event listener when contribution proposal is submitted.
  $("#story-view-container").on("click", "#submit-contribution", () => {

    // Check if there are any contributions inside the contributions-list container.
    if ($(".contributions-list .contribution").length > 0) {
      alert("Only one contribution proposal can be added at a time. Please wait for the current proposal to be resolved.");
      return; // Exit the event handler
    }

    const contributionInput = $(".contribution-input-text").val(); // KT For some reason it won't work with an id selector
    const storyId = $(".story-view").attr("id"); //KT Grab id from element tag with class story view

    console.log("tried to add contribution!"); // test
    console.log("s-contributions:", contributionInput, storyId); //test

    $.ajax({
      method: "POST",
      url: "/contributions/add",
      data: {
        story_id: storyId,
        story_proposal: contributionInput,
      },
    })
      .done((response) => {
        if (response.success) {
          // Clear the form field.
          $(".contribution-input-text").val('');

          alert("Your contribution has been proposed successfully!");

          // Add contribution to the contributions list.
          const newContributionHTML = genContributionView(response.contribution);
          const $newContribution = $(newContributionHTML); // Convert the string to a jQuery object
          $(".contributions-list").prepend($newContribution); // Add the new contribution at the beginning of the list.
          $newContribution.hide().fadeIn(1000);
        } else {
          alert(response.message);
        }
      })
      .fail((error) => {
        alert(
          "There was an error submitting your contribution. Please try again."
        );
      });
  });

  // Event listener when admin accepts the contribution proposal.
  $("body").on("click", ".accept-contribution", function() {
    const $contributionElem = $(this).closest(".contribution");
    const contributionId = $contributionElem.data("id");

    $.ajax({
        method: "POST",
        url: "/contributions/approve",
        data: {
            contribution_id: contributionId
        }
    })
    .done((response) => {
        if(response.success) {
            alert("Contribution has been approved!");
            // Grab the story proposal and user ID from the response.
            const approvedStoryText = response.contribution.story_proposal;
            const userId = response.contribution.user_id;

            // Here, append the approved contribution text to the main story.
            const $mainStory = $(".story-paragraph");
            const currentText = $mainStory.text();
            const newText = `${currentText}\n\n${approvedStoryText}\n\nContributed by User ID: ${userId}`;
            $mainStory.text(newText);
        } else {
            alert(response.message);
        }
    })
    .fail((error) => {
        alert("There was an error approving the contribution. Please try again.");
    });
  });


});
