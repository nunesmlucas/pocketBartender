//on click event for alcohol submit button
$("#alcoholSubmit").on("click", function (event) {
    //defining the div sections and emptying them on click in order to remove 
    //default text and load new.
    var drinkHowTo = $(".drinks-instructions");
    drinkHowTo.empty();
    var drinkDiv = $("#imageDiv");
    drinkDiv.empty();
    var drinkIngredients = $("#ing-span");
    drinkIngredients.empty();
    var listDiv = $("#unordered");
    listDiv.empty();

    //preventing the default submit function from button
    event.preventDefault();
    // This line grabs the input from the textbox
    var alcohol = $("#alcoholType").val().trim();
    //adding to the API query URL
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;

    //ajax to GET the api search properties
    $.ajax({
        url: queryURL,
        method: "GET"
        //storing in response as standard
    }).then(function (response) {
        console.log(response);
        //If statement to make sure the user input is valid and the ingredient can be
        //found in the API. 
        if (response.drinks == null) {
            //var's created to add text for error searching and displaying
            //in paragraph div.
            var instructions = "Sorry we could not find any results for that type of alcohol. Please try again!";
            var instructionsParagraph = $("<p>").text(instructions);
            console.log(this);
            console.log(instructions);
            //appending to div here 
            drinkHowTo.append(instructionsParagraph);


            //image div var to add the img, src, and class to match css
            var drinkDiv = $("#imageDiv");
            var drinkImage = $("<img>").attr("src", "assets/images/sadFace.jpg");
            drinkImage.addClass("img-responsive");
            drinkDiv.prepend(drinkImage);

            //span tag in order to fill the drink name/default text from initial load.
            var drinkIngredients = $("#ing-span");
            drinkIngredients.text("No drink found!");
        }
        //else statement (when the API finds a drink with the searched ingredient) do this:
        else {
            //creating a variable to grab each strIngredient from the API Properties
            var ingredients = "strIngredient";
            //var rand to store random drink with searched ingredient
            var rand = response.drinks[Math.floor(Math.random() * response.drinks.length)];
            console.log(rand);
            //grabbing drinkID in order to pull another URL's information from their database
            var drinkID = rand.idDrink;
            console.log(drinkID);

            //second queryURL in order to search by drinkID
            var queryURL2 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
            console.log(queryURL2);

            $.ajax({
                url: queryURL2,
                method: "GET"
                //using response2 to differentiate in the event it causes issues - 
            }).then(function (response2) {
                console.log(response2);
                // var instructions storing the drink's instructions at index[0] 
                var instructions = response2.drinks[0].strInstructions;
                //creating a variable to store those instructions text to the <p> tag
                var instructionsParagraph = $("<p>").text(instructions);
                console.log(this);
                console.log(instructions);
                //appending the instructions to the div created above
                drinkHowTo.append(instructionsParagraph);
                //grabbing the drink name from the strDrink property and storing it in a variable
                var drinkName = rand.strDrink;
                console.log(drinkName);
                //grabbing the span created in HTML by ID and storeing it in the drinkIngredients var
                var drinkIngredients = $("#ing-span");
                //making the text for that div the drinkName stored above
                drinkIngredients.text(drinkName);

                //grabbing the same drinks'(rand = response.drinks[...]) image and storing it in drinkURL 
                var drinkURL = rand.strDrinkThumb;
                //creating a variable to store the predefined div in html 
                var drinkDiv = $("#imageDiv");
                //creating a variable to store the img tag and its src attribute using the defined URL var
                var drinkImage = $("<img>").attr("src", drinkURL);
                //add class for css and responsiveness (bootstrap)
                drinkImage.addClass("img-responsive");
                //prepending the image to the div.
                drinkDiv.prepend(drinkImage);

                //defining the list div 
                var listDiv = $("#unordered");
                //for loop to go through the number of ingredients as long as they dont equal
                //"" or null: 
                for (var i = 1; (response2.drinks[0][ingredients + i] != "") && (response2.drinks[0][ingredients + i] != null); i++) {
                    var listItem = (response2.drinks[0][ingredients + i]);
                    //variable created to store each ingredient item in the unordered list as a list item:
                    var listItemToAdd = $('<li> ' + listItem + "</li>");
                    console.log(listItem);
                    //appending to the list div created above.
                    listDiv.append(listItemToAdd);
                }
            });
        }
    });
});



// -------------------MUSIC SECTION---------------------------// -------------------MUSIC SECTION---------------------------
// -------------------MUSIC SECTION---------------------------// -------------------MUSIC SECTION---------------------------
// -------------------MUSIC SECTION---------------------------// -------------------MUSIC SECTION---------------------------


$("#artistSubmit").on("click", function (event) {
    //Clear functions here for artist name, albums, and images. 
    var listDivArtist = $("#unorderedArtist");
    listDivArtist.empty();
    var carouselInner = $(".carousel-inner");
    carouselInner.empty();
    var carouselIndicators = $(".carousel-indicators");
    carouselIndicators.empty();
    var carouselIndex = 0;
    var linkArea = $("#artist-link");
    linkArea.empty();


    //preventing default function of the on click button key
    event.preventDefault();
    // This line grabs the input from the textbox
    var artist = $("#artistType").val().trim();
    //adding the artist to the queryURL
    var queryURL = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artist;

    //ajax call to the query URL and grabbing the API's queries:
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //referencing the artist ID and storing it into an artistId variable from the API
        var artistId = response.album[0].idArtist;

        //for loop to grab five different albums in the album array object 
        for (var i = 0; i < 5; i++) {
            //random math function again to create another rand variable
            var randnum = Math.floor(Math.random() * response.album.length);
            //grabbing a new random album each time the for loop runs
            var rand = response.album[randnum];

            console.log(rand);
            //grabbing the album name and storing it in a variable
            var albumName = rand.strAlbum;
            console.log(albumName);
            //list item variable in order to add to the listDivArtist Div below
            var listAlbums = $("<li>" + albumName + "</li>");
            listDivArtist.append(listAlbums);
            //grabbing the span tag for artist-name in order to update the html for strArtist
            var artistNameSpan = $("#artist-name");
            //variable created to store the artist name from the random album
            var artistN = rand.strArtist;
            //making the text of the span equal to the artist name
            artistNameSpan.text(artistN);

            //variables created to add to the bootstrap carousel. 
            //An unordered list with list items to go through
            var carouselIndicators = $(".carousel-indicators");
            var carouselItem = $("<li>").attr("data-target", "#carouselExample").attr("data-slide-to", carouselIndex);
            //if the first item is equal to 0, set it to the class "active" so the current tick mark and image
            //display properly.
            if (i == 0) {
                carouselItem.addClass("active");
            }
            //adding each of the carousel items to the carousel OL 
            carouselIndicators.append(carouselItem);
            //incrementing the index to iterate through the number of tick marks displayed
            carouselIndex++;


            //creating a variable to grab the div created in HTML for the images
            var carouselInner = $(".carousel-inner");
            var caroItem = $("<div>");
            //adding the classes required for each bootstrap carousel item
            caroItem.addClass("carousel-item");
            //checking again if this is the first carousel item in order to display the active image 
            if (i == 0) {
                caroItem.addClass("active");
            }

            //creating an img tag for the html element and storing the rand album
            //thumb in the img tag. 
            var albumImg = $("<img>");
            var albumArtwork = rand.strAlbumThumb;
            //if there is no album artwork then we will display a sad face
            if (albumArtwork == "") {
                albumImg.attr("src", "assets/images/sadFace.jpg");

                //adding class
                albumImg.addClass("img-responsive img-center d-block");
                //appending the img to the img carousel div: 
                caroItem.append(albumImg);
                carouselInner.append(caroItem);
            }
            //similarly we do the same with the no album artwork if statement, 
            //but here we add the attribute with the album artwork URL stored from the API
            // in the variable albumArtwork
            else {
                albumImg.attr("src", albumArtwork);
                //adding class
                albumImg.addClass("img-responsive img-center d-block");
                //appending the img to the img carousel div: 
                caroItem.append(albumImg);
                carouselInner.append(caroItem);
                //removing the random album selected in order to not select the same again.
                //makes each one unique.
                response.album.splice(randnum, 1);
            }
        }
        //creating a second queryURL for the artists further information on annother API: 
        var queryURL2 = "https://theaudiodb.com/api/v1/json/1/artist.php?i=111239&i=" + artistId;
        //ajax again
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {
            //linkArea variable again to define it as it was emptied..
            var linkArea = $("#artist-link");
            //grabbing website from the api and storing it in the artistLink
            var artistLink = response2.artists[0].strWebsite;
            //if there is no URL stored in the artistLink
            if (artistLink == "") {
                //display "Sorry we couldnt find.."
                linkArea.text("Sorry we couldn't find an artist website!");
            }
            else {
                //creating a variable to add the anchor tag
                var artistDirectWeb = $("<a>");
                //creating and adding an attribute to store the href and URL:
                artistDirectWeb.attr("href", "https://" + artistLink);
                //adding attribute target with _blank in order to populate in new tab
                artistDirectWeb.attr("target", "_blank");
                //Link text
                artistDirectWeb.text("Click here!");
                //adding to the div variable
                linkArea.append(artistDirectWeb);
            }

        });
        //amount of time until the carousel rotates through the album slides.
        $('#carouselExample').carousel({
            interval: 2000
        });

    });
});