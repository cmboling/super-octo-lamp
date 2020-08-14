var default_content="";

$(document).ready(function(){
	
	checkURL();
	$('ul li a').click(function (e){

			checkURL(this.hash);

	});
	
	//filling in the default content
	default_content = $('#pageContent').html();
	
	
	setInterval("checkURL()",250);
	
});

var lasturl="";
var someList=[];

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;
	
	if(hash != lasturl)
	{
		lasturl=hash;
				
		if(hash=="")
		$('#pageContent').html(default_content);
		
		else
		loadPage(hash);
	}
}

function loadSomeRecords() {
	if(someList) {
		var someDisplayedList = document.getElementId("someElement");
		var nextRecords = someDisplayedList.innerHTML;
		var size = recordOffset + recordSize;
		eval("alert('hey there in loadSomeRecords~')");

		someList.forEach(item => {
			nextRecords += `<li><a href="#" onclick="someFunction('${item}'); return false;">${item}</a></li>`;
		 });

		 someDisplayedList.innerHTML = nextRecords;
	}
	else {
		eval("alert('hey there in the else~')");
	}
}

function loadPage(url)
{
	url=url.replace('#page','');
	
	$('#loading').css('visibility','visible');
	
	$.ajax({
		type: "POST",
		url: "load_page.php",
		data: 'page='+url,
		dataType: "html",
		success: function(){
			someList=['bananas, cheese, watermelon, bread'];
			loadSomeRecords();

			$('#pageContent').html(msg);
			$('#loading').css('visibility','hidden');

			eval("alert('hey there~')");

		}
		
	});

}
