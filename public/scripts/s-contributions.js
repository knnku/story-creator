

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

  //Event listener for click on story view to get all contributions.
  $("body").on("click", "#story-list article[id]", function () {
    // 'this' refers to the clicked div
    var storyId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: `/contributions/story/${storyId}`, // Point to specific ID.
    })
      .done((contributionsPkg) => {
        const contribs = contributionsPkg.contributions;
        // Render contribution to view.
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

  // Event listener when contribution proposal is submitted.
  $("#story-view-container").on("click", "#submit-contribution", () => {

    // Trim whitespace.
    const contributionInput = $(".contribution-input-text").val().trim();
    const storyId = $(".story-view").attr("id");

    // Check for empty input.
    if (!contributionInput) {
        alert("Please enter a contribution before submitting.");
        return;
    }

    // Check if there are any contributions inside the contributions-list container.
    // if ($(".contributions-list .contribution").length > 0) {
    //   alert("Only one contribution proposal can be added at a time. Please wait for the current proposal to be resolved.");
    //   return;
    // }

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
          // alert("Your contribution has been proposed successfully!");
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

  // Event listener to navigate to the starting page when 'Cancel' is clicked.
  $(document).on("click", "#cancel-contribution", () => {
    window.location.href = '/'; // Navigate to the starting page.
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
    // .done((response) => {
    //     if(response.success) {
    //         // alert("Contribution has been approved!");
    //         // Grab the story proposal and user ID from the response.
    //         const approvedStoryText = response.contribution.story_proposal;
    //         const userId = response.contribution.user_id;
    //         // Append the approved contribution text to the main story.
    //         const $mainStory = $(".story-paragraph");
    //         const currentText = $mainStory.text();
    //         const newText = `${currentText}\n\n${approvedStoryText}\n\n`; // Stretch: identify contributor.
    //         $mainStory.text(newText);
    //         // Remove the contribution element from the DOM
    //         $contributionElem.remove();
    //     } else {
    //         alert(response.message);
    //     }
    // })
    .done((response) => {
      if(response.success) {
          // Grab the story proposal from the response.
          const approvedStoryText = response.contribution.story_proposal;

          // Get the existing story content.
          const existingStory = $(".story-paragraph").text();

          // Check if the last character of the existing story is a punctuation mark or not.
          const lastChar = existingStory[existingStory.length - 1];
          const punctuations = [".", "!", "?"];
          const separator = punctuations.includes(lastChar) ? " " : "";

          // Create a new <span> element with the contribution text and set it to hidden.
          const $newContributionElem = $(`<span style="display: none;">${separator}${approvedStoryText}</span>`);

          // Append the new element to the main story.
          $(".story-paragraph").append($newContributionElem);

          // Fade in the new element over 1 second.
          $newContributionElem.fadeIn(1000);

          // Remove the contribution proposal from the view.
          $contributionElem.remove();
      } else {
          alert(response.message);
      }
    })
    .fail((error) => {
        alert("There was an error approving the contribution. Please try again.");
    });
  });

  // Event listener when admin accepts the contribution proposal.
  $("body").on("click", ".reject-contribution", function() {
    const $contributionElem = $(this).closest(".contribution");
    const contributionId = $contributionElem.data("id");

    $.ajax({
        method: "POST",
        url: "/contributions/reject",
        data: {
            contribution_id: contributionId
        }
    })
    .done((response) => {
        if(response.success) {
            // alert("Contribution has been rejected!");
            // Remove the contribution from the DOM.
            $contributionElem.remove();
        } else {
            alert(response.message);
        }
    })
    .fail((error) => {
        alert("There was an error rejecting the contribution. Please try again.");
    });
  });

  // Event listener for upvoting a contribution.
  $("body").on("click", ".upvote-btn", function() {
    const $contributionElem = $(this).closest(".contribution");
    const contributionId = $contributionElem.data("id");

    $.ajax({
        method: "POST",
        url: "/contributions/upvote",
        data: {
            contribution_id: contributionId
        }
    })
    .done((response) => {
        if(response.success) {
            // alert("Contribution upvoted!");
            // Update the votes in the UI
            const updatedVotes = response.contribution.votes;
            $contributionElem.find("small").text(function(_, oldText) {
                return oldText.replace(/Votes: \d+/, `Votes: ${updatedVotes}`);
            });
        } else {
            alert(response.message);
        }
    })
    .fail((error) => {
        alert("There was an error upvoting the contribution. Please try again.");
    });
  });


});
