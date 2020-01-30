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
    let $spanDays = $('<span>').addClass('daysFooter').text(tweet.created_at);
    let $spanEmoji = $('<span>').addClass('emojiFooter').text("emojis");
    $footer.append($spanDays, $spanEmoji);

    $tweet.append($header, $p, $hr, $footer);
    return $tweet;
  }
   
  const $form = $('#postForm');
  const $textField = $('#field');
  const $errorMessage = $('.error-message')
 
  



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

      $textField.val('')   // Makes the textarea value an empty string.
      loadTweet(); // allows upon a finished post to get the object.

     })
     .fail((err) => {
       console.error(err);
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

 loadTweet()

//  $('button').animate({
//    scrollTop: ($('#tweetContainer').offset().top)
//  }, 500)

// use a .focus() for your textarea to have the type cursor in there.

 $('.scroll-down').click(function() {
   console.log('is this working')
   $('html, body').animate({
     scrollTop: $('div#empty-space').offset().top
   }, 500)
 })


})