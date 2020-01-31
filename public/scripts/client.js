$(document).ready(function() {
  const $form = $('#postForm');
  const $textField = $('#field');
  const $errorMessage = $('.error-message')
  const $errorMessageEmpty = $ ('.error-message-empty')

// ************* HELPER FUNCTIONS BELOW **************
// Appends all the data together for the tweet box.
  const createTweetElement = function(tweet) {
    let $tweet = $('<div>').addClass('tweetBox tweetBoxHover');

    let $header = $('<header>').addClass('tweetHeader');    
    let $spanName = $('<span>').addClass('profileName').text(tweet.user.name);
    let $spanHandle = $('<span>').addClass('profileHandle').text(tweet.user.handle);
    let $img = $('<img>').addClass('profilePicture').attr("src", tweet.user.avatars);
    $header.append($img, $spanName, $spanHandle);

    let $p = $('<p>').addClass('theTweet').text(tweet.content.text);
    let $hr = $('<hr>');

    let $footer = $('<footer>');
    let $spanDays = $('<span>').addClass('daysFooter').text(moment(tweet.created_at).format("MMM Do YYYY, h:mm a"));
    let $spanEmoji = $('<span>').addClass('emojiFooter').text("emojis");
    $footer.append($spanDays, $spanEmoji);

    $tweet.append($header, $p, $hr, $footer);
    return $tweet;
  }

// Renders the data to display the tweet box.
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
      const $tweets = $('#tweetContainer');
      const $article = createTweetElement(tweet);
      $tweets.prepend($article);
    })
  };

// Loads all the data up to be required by a POST.
  const loadTweet = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
      success: (post) => {
        renderTweets(post);
      }
    })
  }
  loadTweet();
// ************* HELPER FUNCTIONS ABOVE **************

// Goes through error checking, then runs an ajax request for the text input.
 $form.on('submit', (event) => {
   event.preventDefault();
   const serialized = $form.serialize();
   let charNum = document.getElementById("charNum").innerText;

   if (charNum < 0) {
    $errorMessage.slideDown();
    $errorMessageEmpty.slideUp();
  } else {
    $errorMessage.slideUp();

   $.ajax({
     url: '/tweets',
     method: 'POST',
     data: serialized
   })
     .done((post) => {
      document.getElementById("charNum").innerText = 140
      $textField.val('')   // Makes the textarea value an empty string.
      loadTweet(); // allows upon a finished post to get the object.
      $('#field').focus();
      $errorMessageEmpty.slideUp();
     })
     .fail((err) => {
      $errorMessageEmpty.slideDown();
       $('#field').focus();
     });
    }
  });

// Toggles the tweet form to slide down/up.
  $('.toggle-form').click(function() {
    $('#postForm').slideToggle();
    $('#field').focus();
  });

})