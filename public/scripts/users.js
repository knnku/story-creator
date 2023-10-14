// Client facing scripts here

$(document).ready(function () {

  $('#login').on('click', () => {
    event.preventDefault();

    const $userInput = $('#login-form').serialize();
    console.log($userInput);

    console.log('login button clicked!!');
    $.ajax({
      method: 'POST',
      url: '/users/login',
      data: $userInput
    })
    .done((response) => {

      // const $user= $('#users');
      // $usersList.empty();

      // for(const user of response.users) {
      //   $(`<li class="user">`).text(user.name).appendTo($usersList);
      // }
    });
  });


console.log('dom ready');
});
