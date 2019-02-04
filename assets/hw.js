$(document).ready(function () {
    var bands = [
        "Adele", "Bebe Rexha", "The Beatles", "Coldplay", "Eminem", "Green Day",
        "Justin Timberlake", "Jimi Hendrix", "John Mayer", "Led Zeppelin", "Oasis",
        "Pink Floyd", "Queen", "Radiohead", "Rage Against The Machine", "Red Hot Chili Peppers",
        "Slipknot", "Sublime", "System Of A Down", "Travis Scott", "Tenacious D", "The Lumineers"
    ];

    //Buttons to Add to page
    function populateButtons(arrayUsed, classAdd, areaAdd) {
        $(areaAdd).empty();

        for (var i = 0; i < arrayUsed.length; i++) {
            var a = $("<button>");
            a.addClass(classAdd);
            a.attr("data-type", arrayUsed[i]);
            a.text(arrayUsed[i]);
            $(areaAdd).append(a);
        }

    }

    $(document).on("click", ".band-button", function() {
        $("#bands").empty();
        $(".band-button").removeClass("highlight");
        $(this).addClass("highlight");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=trcNwpqVrzBv6sBoHn8d15MtlglSAsL5&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var bandDiv = $("<div class=\"band-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var bandImage = $("<img>");
                    bandImage.attr("src", still);
                    bandImage.attr("data-still", still);
                    bandImage.attr("data-animate", animated);
                    bandImage.attr("data-state", "still");
                    bandImage.addClass("band-image");

                    bandDiv.append(p);
                    bandDiv.append(bandImage);

                    $("#bands").append(bandDiv);
                }
            });
    });

    $(document).on("click", ".band-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-band").on("click", function(event) {
        event.preventDefault();
        var newBand = $("input").eq(0).val();

        if (newBand.length > 2) {
            bands.push(newBand);
        }

        populateButtons(bands, "band-button", "#band-buttons");

    });

    populateButtons(bands, "band-button", "#band-buttons");
});