$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
        const $tweets = $('#tweetContainer')
        const $article = createTweetElement(tweet)

        $tweets.append($article);
    })
  }

  const createTweetElement = function(tweet) {
    let $tweet = $('<div>').addClass('tweetBox tweetBoxHover');

    let $header = $('<header>').addClass('tweetHeader');    
    let $spanName = $('<span>').addClass('profileName').text(tweet.user.name);
    let $spanHandle = $('<span>').addClass('profileHandle').text(tweet.user.handle);
    let $img = $('<img>').addClass('profilePicture').attr("src", tweet.user.avatars);
    $header.append($img, $spanName, $spanHandle);

    let $p = $('<p>').addClass('theTweet').text(tweet.content.text);
    
    let $hr = $('<hr>')

    let $footer = $('<footer>');
    let $spanDays = $('<span>').addClass('daysFooter').text(tweet.created_at);
    let $spanEmoji = $('<span>').addClass('emojiFooter');
    $footer.append($spanDays, $spanEmoji);

    $tweet.append($header, $p, $hr, $footer);
    return $tweet;
  }
  
  // renderTweets(data);
  
  const $input = $('input');
  $input.click(() => {
    renderTweets(data)
  })
})