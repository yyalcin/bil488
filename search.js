var url; // variable for url
var query;
var repeat;

$(document).ready(function ()
{			   
   $('#search').click(function()	// run this code block  when search button is clicked
   {
		var selectedTime = $("#time").val();	// determine that how much time tweets are refreshed
		if( $("#query").val() != '' ){
			clearInterval(repeat); // reset interval
			searchTweets();		//search at starting
			repeat = setInterval("searchTweets()",selectedTime*1000);	// refresh searcing results in every selectedTime seconds
		}
		else
			alert("You should any word for searching tweets!");
	});
	
	$(document).keypress(function(e) // run this code block when enter key is pressed on keyboard
	{		
		if(e.which == 13) {
			if( $("#query").val() != '' ){
				var selectTime = $("#time").val();
				clearInterval(repeat);  // reset interval
				searchTweets();		//search at starting
				repeat = setInterval("searchTweets()",selectTime*1000);	// refresh searcing results in every 10 seconds
			}
			else{
				alert("You should any word for searching tweets!");
			}
		}
	});
});

function searchTweets()	// search and write appropriate tweets
{
	var tweetNumber = 0;
	showContentDiv();
	query = $("#query").val();	//take query word(s) from search box
	var selectedValue = $("#tOption").val();	// determine that how many tweets are listed
	var tmpHeight = selectedValue;
	tmpHeight = parseInt(tmpHeight)*80;
	document.getElementById("content").style.height = tmpHeight + "px";	// increase height of content div according to tweet numbers
	document.getElementById("results").style.height = parseInt(tmpHeight+40) + "px";  // increase height of results div according to tweet numbers
	
	url = "http://search.twitter.com/search.json?callback=?&rpp="+selectedValue+"&result_type=recent&q=";	//determine url for required data
	$('#content').html('');	// remove previous tweets before refresh
	$.getJSON( url + query, function( data ){		// get datas from twitter url with getJSON method
		tweetNumber = data.results.length;
		$.each( data.results, function( index, item ) 
		{
			/* list required informations in content div */
			$("#content").append('<table><tr><td><img src="'+item.profile_image_url+'" width="64" height="64" align="middle"/></td><td><p>&nbsp<b>'+
			  item.from_user_name+'</b>&nbsp'+item.from_user+'&nbsp'+item.created_at+'</br>&nbsp'+item.text+'</p></td></tr></table>');
			
		});
		// if no tweet found, give an message
		if(tweetNumber == 0){	
			document.getElementById('content').innerHTML = '<img id="notFoundImg" src="img/not_found.jpg" width="" height="" />'+
			'&nbsp<p id="notFoundMessage"> No tweet found! </p>';
		}
	});		

}

function showContentDiv() // when search button was clicked, show content div
{
	var showContent = document.getElementById('content');
	showContent.style.display = 'block';
}

function changeButton()	// change search button image when mouse hover it
{
	var element = document.getElementById('search');
	element.src="img/button_hover.png";
}

function changeBack() // change back search button image  when mouse hover out it
{
	var element = document.getElementById('search');
	element.src="img/button.png";
}
