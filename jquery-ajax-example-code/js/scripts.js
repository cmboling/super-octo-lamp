// some globals
var someList=[];

// jQuery wrapper to talk to the DOM
$(document).ready(function() {

    // first button
    $('#first-button').click(function() {
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
          loadSomeRecords(someList, 'more-info');

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
            $('#search-results').html('No results found!');
          }
          else {
            // Need to alert - Security/CWE-079/ReflectedXss.ql
            // $.each(results, function(key, value){
            //   $('#search-results').append(key + ': ' + value + '<br>');
            // }); Or this way...
            // displayedResults.forEach(item => {
            //   $('#search-results').append(`<li>${item}</li><br>`)
            // }) //Or this way...
            $('#search-results').empty();
            loadSomeRecords(displayedResults, 'search-results');
          }
        }
     });
    });

});

function loadSomeRecords(someList, element) {
	if(someList) {
		var someDisplayedList = document.getElementById(element);
		var nextRecords = '';

    // Alert - Declarations/UnusedVariable.ql
		var size = 1 + 1;

		someList.forEach(item => {
      nextRecords += `<li><a href="#" onclick="logResults('${item}');">${item}</a></li>`
    })

    someDisplayedList.innerHTML += nextRecords;
	}
}

function logResults(name) {
  eval("console.log('This is a result: ' + name)");
}
