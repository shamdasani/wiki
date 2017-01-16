// HOMEPAGE

var term = document.getElementById('term');

window.onload = function() {
  term.focus();
  term.select();
}

function searchTerm() {

    $("#results").empty()
    $("#title").empty()
    $("#text").empty()


    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + term.value + "&callback=?",
        function(data) {

            if (data.hasOwnProperty("query")) {
                $.each(data.query.pages, function(skipThis, info) {

                    $("#results").append('<div class="result"><a href="/wiki/' + info.title + '"><h2 class="card-title">' + info.title + '</h2><p class="extract">' + info.extract + '</p></div></a>');
                    document.getElementById('bottom').style.display = "none";
                });

            };

        });

};

document.body.onkeyup = function(e) {
    if (e.keyCode == 13) {
        searchTerm();
    }
};

// WIKI PAGES

if (window.location.href.indexOf('/wiki/') > -1) {
  var clickedTerm = window.location.pathname.split('/wiki/');

  $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=" + clickedTerm[1] + "&prop=text",
    function(data) {

      var pageTitle = data.parse.title;
      var pageHTML = data.parse.text["*"];
      $("#title").append(pageTitle);
      $("#text").append(pageHTML);
      document.title = pageTitle;
      
  });
};

