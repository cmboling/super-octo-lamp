// some globals
var someList=[];

// jQuery wrapper to talk to the DOM
$(document).ready(function() {

    // first button
    $('#first-button').click(function() {
      // Need to alert - Security/CWE-079/ReflectedXss.ql
      $.ajax({
        type: 'GET',
        url: 'data/test-data.json',
        error: function() {
          // Alert - DOM/Alert.ql
          alert('an error occurred');
          $('#info').html('<p>An error has occurred</p>');
        },
        success: function(data) {
          alert('successfully clicked button. congrats!');

          var str = '({"team":"Advanced Security","handle":"cmboling"})';
          var obj = eval(str);
          // Alert - LanguageFeatures/TemplateSyntaxInStringLiteral.ql
          eval("console.log(`Here is the team name: ${obj.team}`)");

          // eval data
          var responseDataEval = eval(data);

          // do something with it
          var $title = $('<p>').text(responseDataEval[0].email);
          var $description = $('<p>').text(responseDataEval[0].registered);
          $('#info')
            .append($title)
            .append($description);

          // let's send an array to some function
          someList = responseDataEval[0].foodFavorites;
          loadSomeRecords(someList);

        }
     });
    });

    // second button
    $('#second-button').click(function() {
      // Need to alert - Security/CWE-079/ReflectedXss.ql
      var text = document.getElementById("user-text").value;
      document.getElementById("user-input-results").innerHTML = text;
      $.ajax({
        type: 'GET',
        url: 'php/search.php',
        data: {
          search_keyword: text
        },
        success: function(returnData) {
          $('#search_results').html('');

          //Parse what we got back from search.php
          var rawResults = eval(returnData);
          var displayedResults = Object.values(rawResults[0]);

          if(displayedResults.length == 0){
            $('#search_results').html('No results found!');
          }
          else {
            // $.each(results, function(key, value){
            //   $('#search_results').append(key + ': ' + value + '<br>');
            // }); Or this way... whichever
            displayedResults.forEach(item => {
              $('#search_results').append(`<li>${item}</li><br>`)
            })
          }
        }
     });
    });

});

function loadSomeRecords(someList) {
	if(someList) {
		var someDisplayedList = document.getElementById("more-info");
		var nextRecords = someDisplayedList.innerHTML;

    // unused variable
		var size = 1 + 1;

		someList.forEach(item => {
      nextRecords += `<li><a href="#" onclick="logFruitName('${item}');">${item}</a></li>`
    })

    someDisplayedList.innerHTML = nextRecords;
	}
}

function logFruitName(name) {
  eval("console.log('This is a fruit: ' + name)");
}
