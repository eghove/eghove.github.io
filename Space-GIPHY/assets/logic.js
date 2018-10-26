//VARIABLES
//==================================================================
let spaceObj = ['sun', 'moon', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'neptune', 'uranus', 'pluto', 'asteroid', 'space shuttle','rocket', 'nasa', 'astronaut', 'cosmonaut', 'space station', 'satellite', 'stars', 'space cat', 'alien'];

//my giphy API key
const APIKey='UZuL5oKY0dnXBTLXsEDplDOcXprF7LQV';

//FUNCTIONS
//=================================================================

//Function that builds the buttons in the array
function buildButtons() {
    for(var i=0; i < spaceObj.length; i++) {
        var button = $( '<button type="button" class="btn btn-light giphyButton">' )
        button.attr('data-name', spaceObj[i]);
        button.text(spaceObj[i]);
        $('#buttonRow').append(button);
    }
    //on click listener for the giphy button
    $( '.giphyButton').on("click", function() {
        var searchParam = $(this).attr('data-name');
        
        //pass the search paramater into the ajaxCall function
        ajaxCall(searchParam);
    });

    
}

//function that grabs the value in 'search bar', adds it to the spaceObj array
function addButton () {
    //grab text from spaceObject text bar
    var query=$( '#spaceObject' ).val().trim();
    //push it into array
    spaceObj.push(query);
    //clear out prior version of the button row
    $('#buttonRow').empty();
    //update the button row
    buildButtons();
    //ended up clearing the input using HTML, probably not ideal
}

//function that makes the ajax call, adds the gifs to the DOM
function ajaxCall (searchParam) {
    //set the GIPHY base URL
    var baseUrl = 'https://api.giphy.com/v1/gifs/search?';

    //add my API Key to basseURL
    baseUrl = baseUrl + 'api_key='+ APIKey;

    //set the result limit
    var resultLimit='10';

    //add the result limit to baseUrl
    baseUrl = baseUrl + '&limit=' + resultLimit;

    //set queryURL
    let queryURL = baseUrl + '&q=' + searchParam;
    //console.log(queryURL); //for debugging purposes
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            //clear out the previous items
            $( '#gifDisplay').empty();

            //put the data into a variable
            var results = response.data;

            //for loop to display the 10 GIFS
            for (var i = 0; i < results.length; i++) {
                let gifDiv = $("<div class='gifImage'>"); //set up gifImage blocks for styling

                //get the rating for a given GIF
                let rating = results[i].rating;

                //manipulate the rating data to make it capitalized
                rating = rating.toUpperCase();

                //set up the rating textt to display
                let p = $("<p class='ratingText'>").text("Rating: " + rating);

                //set up the actual gif image
                let gifImage = $("<img>");

                //set the initial link to the still image
                gifImage.attr("src", results[i].images.fixed_height_still.url);

                //set the data state to still
                gifImage.attr("data-state", "still");

                //save the url for the still image
                gifImage.attr("data-still-src", results[i].images.fixed_height_still.url);

                //save the url for the animate image
                gifImage.attr("data-animate-src", results[i].images.fixed_height.url);

                gifDiv.append(p);
                gifDiv.append(gifImage);

                $( "#gifDisplay" ).append(gifDiv);
            };

            //on click listener for the gifs themselves
            $( 'img' ).on("click", function(){
                //grab the data state of the gif
                let state = $(this).attr('data-state');
                
                //grab the link for the animated gif
                let animatedSRC = $(this).attr('data-animate-src');

                //grab the link for the still gif
                let stillSRC = $(this).attr('data-still-src');

                //if the data-state is still, play the gif and set the data-state to animated
                if (state==='still') {
                    $(this).attr("src", animatedSRC);
                    $(this).attr("data-state", "animated");

                //if the data-state is animated, reset the gif and set the data-state to still
                } else if (state==='animated') {
                    $(this).attr("src", stillSRC);
                    $(this).attr("data-state", "still")

                //default case
                } else {
                    console.log('ERROR');
                }   
            })

        });
};


//MAIN PROCESSES
//=================================================================

$(document).ready(function() {

    //intitial call
    buildButtons();

    //submit new buttons call
    $( '#submit' ).on("click", function(event){
        addButton();
    });

    
})//end of ready wrap function