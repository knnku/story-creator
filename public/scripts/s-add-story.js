$(document).ready(() => {

  const $newStoryForm = () => {
    const storyForm = `
    <form method="" action="">
      <label for="title">title</label>
      <input type="text" id="fname" name="fname"><br><br>

      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname"><br><br>

      <input type="submit" value="Submit">
    </form>
    `;


    return storyForm;
  }

  $('#add-story').on('click', () => {
    $("#story-view").empty();
    $('#story-view').append($newStoryForm);

  })

});
