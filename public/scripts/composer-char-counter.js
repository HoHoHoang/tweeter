$(document).ready(function() {

  const $charNum = $('#charNum');
  const $field = $('#field');
  
  $field.on('input', function() {
    countChar(this);
  })
  
  function countChar(input) {
    var charLength = input.value.length;
    if (charLength > 140) {
      $charNum.css('color', 'red')
      $charNum.text(140 - charLength);
    } else {
      $charNum.css('color', 'black')
      $charNum.text(140 - charLength);
    }
  };

});



