$(document).ready(function() {
  console.log("Waiting");
  $("#tweet-text").on("input", function() {
    let textCount = $(this).val(); //capturing all characters in the textarea
    let newCount = 140 - textCount.length;
    $(".counter").val(newCount);

    if (newCount < 0) {
      $(".counter").css({color: "#ff0000"});
    } else {
      $(".counter").css({color: "#545149"});
    }
  });

});


