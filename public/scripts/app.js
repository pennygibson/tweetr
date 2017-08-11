/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 <img src="images/flag.icon.png" width="20px" height="20px">
                        <img src="images/retweet-icon.png" width="20px" height="20px">
                        <img src="images/heart-icon-614x460.png" width="18px" height="18px">
 */



function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetObject){
    return `

            <article class="tweets">
                <header class="tweetHeader">

                    <div class="avatar"> <img src="${escape(tweetObject.user.avatars.small)}" width="70px" height="70px"></div>
                    <div class="name">${escape(tweetObject.user.name)}</div>
                    <div class="email"> ${escape(tweetObject.user.handle)} </div>
                </header>
                <div class="textarea">
                    <textarea>${escape(tweetObject.content.text)}</textarea>
                </div>

                <footer class="tweetFooter">
                    <div  class="date">
                        <span>${escape(tweetObject.created_at)} </span>
                    </div>
                    <div class="icons">
                        <i class="fa fa-heart fa-lg logo"></i>
                        <i class="fa fa-retweet fa-lg logo"></i>
                        <i class="fa fa-flag fa-lg logo"></i>
                    </div>

                </footer>

            </article>`

}

const appendTweet = (tweetObject) => {
    //console.log(createTweetElement(tweetObject))
   $('#tweetSection').append(createTweetElement(tweetObject))
}

function renderTweets(tweets) {
  // loops through tweets
    console.log('renderTweets')
    $('#tweetSection').empty()
    var $tweets = tweets.reverse().map(function(tweet){
        appendTweet(tweet)
    })

}

$(document).ready(function(){
    $('.composeButton').click(function(){
       $('.new-tweet').slideToggle("slow", function(){
           $('.formText').focus()
       });
    });


    $('.newTweetForm').on('submit', function (event) {
        let input = $('.formText').val().length
        console.log(input)
        event.preventDefault();
    if (input === 0 || input > 140) {
        let error = $("<span class='error'>Please enter between 1-140 characters</span>");
        $('input#submitButton').after(error);
    } else {
        $('span.error').hide();
        $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
    }).done(function() {
        loadTweets();
            $('textarea').val('')
    });
    }
});

function loadTweets (){
    $.ajax({
            url: '/tweets',
            method: 'GET',
            success: function (tweets){
                console.log('Success: ', tweets);
                renderTweets(tweets)
            }
        });
    }
    loadTweets()
}); //end of $(document).ready

// need name, email and tweet content