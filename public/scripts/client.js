/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

// const { generateRandomUser } = require('')

$(document).ready(() => {
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().length;
    console.log(tweetLength);
    const $error = `<i class="fas fa-exclamation-triangle"></i>`;
    if (!tweetLength) {

      $("#error-1").empty();
      $("#error-2").empty();
      $(".error-message").slideDown(500);
      $(".error-message").text(`Text data is empty or invalid`);
      $("#error-1").append($error);
      $("#error-2").append($error);

    } else if (tweetLength > 140) {
      
      $("#error-1").empty();
      $("#error-2").empty();
      $(".error-message").slideDown(500);
      $(".error-message").text(`Text area is too long`);
      $("#error-1").append($error);
      $("#error-2").append($error);

    } else {
      const formData = $(this).serialize();
      $("#error-1").empty();
      $("#error-2").empty();
      $(".error-message").empty();
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: formData
      })
        .then(function() {
          $(".tweets-container").empty();
          loadTweets();
          console.log("Success!");
        })
        .catch(function(error) {
          console.log("Error!",error);
        });

    }
   
  });

  const createTweetElement = tweet => {
    const timeAgo = timeago.format(tweet.created_at);
    const htmlMarkup = `<article>
      <header class="tweets-header">
          <img src=${tweet.user.avatars} alt="" class="img">
          <div class="name-container">
            <span>${tweet.user.name}</span>
          </div>
          <span id="tweets-email">${tweet.user.handle}</span>
       </header>
      <div class="tweets-body">
        <p>${tweet.content.text}</p>
      </div>
      <div class="tweets-line"></div>
      <footer class="tweets-footer">
        <span class="how-long-ago">${timeAgo}</span>
        <ul class="emote-list">
          <li class="emote"><i class="fas fa-flag"></i></li>
          <li class="emote"><i class="fas fa-retweet"></i></li>
          <li class="emote"><i class="fas fa-heart"></i></li>
        </ul>
      </footer>
    </article>`;
  
    return htmlMarkup;
  };

  const renderTweets = tweets => {
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $(".tweets-container").prepend($newTweet);
    }
  };

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then(moreTweets => {
        renderTweets(moreTweets);
      });
  };
  loadTweets();
});

   

  