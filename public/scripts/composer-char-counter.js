$(document).ready(function() {

  const $charNum = $('#charNum');
  const $field = $('#field');
  
  $field.on('input', function() {
    countChar(this);
  })
  
  function countChar(input) {
    var len = input.value.length;
    if (len > 140) {
      input.value = input.value.substring(0, 140);
    } else {
      $charNum.text(140 - len);
    }
  };

});



