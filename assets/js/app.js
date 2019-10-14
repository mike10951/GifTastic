var moviesList = [
    "The Matrix",
    "Fight Club",
    "The Grand Budapest Hotel",
    "Inglorious Basterds",
    "Apocalypse Now",
    "The Big Lebowski",
    "The Dark Knight",
    "The Room",
    "No Country for Old Men"
]
createButtons();

$("#add-movie").on("click", function(evt) {
    evt.preventDefault();
    $("#buttons").empty();
    var newMovie = $("#text-movie").val().trim();
    console.log(newMovie);
    moviesList.push(newMovie);
    console.log(moviesList);
    createButtons();
});

$("#buttons").on("click", "button", function() {
    $("#gifs-appear-here").empty();
    var movie = $(this).attr("movie-title");
    //Constructing a URL to search giphy for a movie
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
    movie + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    //Performing AJAX GET request
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        //Response fro the API
        .then(function(response) {
            //Storing results in a variable
            console.log(response);
            var results = response.data;

            //Looping over each result
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    //Creating a div for the gif
                    var gifDiv = $("<div>");
                    //Storing the rating of the item
                    var rating = results[i].rating;
                    //Creating paragraph for rating
                    var ratingP = $("<p>").text("Rating: " + rating);
                    //Creating an image tag
                    var movieImage = $("<img>");
                    movieImage.attr("src", results[i].images.fixed_width_still.url);
                    movieImage.attr("data-animate", results[i].images.fixed_width.url);
                    movieImage.attr("data-still", results[i].images.fixed_width_still.url);
                    movieImage.attr("data-state", "still");
                    gifDiv.append(ratingP);
                    gifDiv.append(movieImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});
$("#gifs-appear-here").on("click", "img", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

function createButtons() {
    for (i = 0; i < moviesList.length; i++) {
        var movieButton = $("<button>");
        movieButton.addClass("btn");
        movieButton.text(moviesList[i]);
        movieButton.attr("movie-title", moviesList[i]);
        $("#buttons").append(movieButton);
    }    
}