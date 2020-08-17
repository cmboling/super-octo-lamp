// some globals
var someList=[];

// jQuery wrapper to talk to the DOM
$(document).ready(function() {
    // all custom jQuery will go here

    // first button
    $('#first-button').click(function() {
      $.ajax({
        url: 'data/test-data.json',
        // data: {
        //   format: 'json'
        // },
        error: function() {
          console.log('an error occurred!');
          $('#info').html('<p>An error has occurred</p>');
        },
        // dataType: 'json',
        success: function(data) {
          //random eval code
          var str = '({"team":"Advanced Security","handle":"cmboling"})';
          var obj = eval(str);
          eval("console.log(`Here is the team name: ${obj.team}`)");

          // eval data (even though data is returned as json which was inferred by default)
          var responseDataEval = eval(data);

          // do something with it
          var $title = $('<h1>').text(responseDataEval[0].email);
          var $description = $('<p>').text(responseDataEval[0].registered);
          $('#info')
            .append($title)
            .append($description);

          // let's send an array to some function
          someList = responseDataEval[0].foodFavorites;
          loadSomeRecords(someList);

        },
        type: 'GET'
     });
    });

    // second button
    $(".trigger").click(function() {
      $("#demo").html("Second Button was clicked");
      $(".overlay").toggle();
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
	else {
		eval("alert('loadSomeRecords: in the else)");
	}
}

function logFruitName(name) {
  console.log('This is a fruit: ' + name);
}
