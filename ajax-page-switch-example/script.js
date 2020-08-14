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

		someList.forEach(item => {
			nextRecords += `<li><a href="#" onclick="someFunction('${someItem}'); return false;">${someItem}</a></li>`;
		 });

		 someDisplayedList.innerHTML = nextRecords;
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
		success: function(msg){
			someList=['bananas, cheese, watermelon, bread'];
			loadSomeRecords();
			if(parseInt(msg)!=0)
			{
				$('#pageContent').html(msg);
				$('#loading').css('visibility','hidden');
			}
		}
		
	});

}
