/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  
  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...
  return $tweet;
}

let tweet = `<div class="tweetBox tweetBoxHover">
<header class="tweetHeader">
  <img class="profilePicture" src="/images/profile-hex.png">
  <span class="profileName">${tweetData.user.name}</span>
  <span class="profileHandle">@Barney</span>
</header>

<p class="theTweet">Such Wow! Much Amazing! Great Job!</p>

<hr>

<footer>
  <span class="daysFooter">10 days ago</span>
  <span class="emojiFooter">emojis</span>
</footer>
</div>`

  const $input = $('input');

  $input.click((event) => {
    console.log(event)


    const $tweets = $('#tweetContainer')
    const $addTweet = $(tweet)

    // $addTweet.text("hello")

    // $addTweet.text(`${tweetData}`)



    $tweets.append($addTweet);

  })


})