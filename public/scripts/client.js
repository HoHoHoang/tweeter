$(document).ready(function() {

  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
        const $tweets = $('#tweetContainer')
        const $article = createTweetElement(tweet)

        $tweets.prepend($article);
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
    let $spanDays = $('<span>').addClass('daysFooter').text(moment(tweet.created_at).format("MMM Do YYYY, h:mm a"));
    let $spanEmoji = $('<span>').addClass('emojiFooter').text("emojis");
    $footer.append($spanDays, $spanEmoji);

    $tweet.append($header, $p, $hr, $footer);
    return $tweet;
  }
   
  const $form = $('#postForm');
  const $textField = $('#field');
  const $errorMessage = $('.error-message')
  const $errorMessageEmpty = $ ('.error-message-empty')


 $form.on('submit', (event) => {
   event.preventDefault();
   const serialized = $form.serialize();
   let charNum = document.getElementById("charNum").innerText;

   if (charNum < 0) {
    $errorMessage.slideDown()
  } else {
    $errorMessage.slideUp()

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
      $errorMessageEmpty.slideUp()
     })
     .fail((err) => {
      $errorMessageEmpty.slideDown()
       console.error(err);
       $('#field').focus();

     });
    }
 });

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

$('.scroll-down').click(function() {
  $('#postForm').slideToggle();
  $('#field').focus();
})

})