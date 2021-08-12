$(document).ready(function() {
  console.log("Waiting");
  $("#tweet-text").on("input", function(e) {
    let counter = e.target.value.length;
    let inputLength = 140 - counter;
    $(".counter").val(inputLength);

    if (inputLength < 0) {
      $(".counter").css({color: "#ff0000"});
    } else {
      $(".counter").css({color: "#545149"});
    }
  });

});


