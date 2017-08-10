$(document).ready(function() {
    

//function countChar(){
//      const textInput = $('.newTweet .formText').val()
//      return textInput.length;
//    }
$('.new-tweet textarea').on('keyup', function(event) {
        let input = $(this).val().length;
        let totalChars = 140;
        let remainingChars = totalChars - input;    
        let counter = $(this).siblings(".counter");
    console.log(counter)
    
        if (remainingChars >= 0) {
            counter.text(remainingChars);
            counter.removeClass("makeRed");
        } else {
            counter.text(remainingChars);
            counter.addClass("makeRed");
        }
    
    });
});