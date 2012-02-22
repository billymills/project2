/*
Billy Mills
CSCI 344
project2.js
Feb 20, 2012
*/



function getSearchTerm () {
	$("#search_button").click(function() {
		main($("#term").val());
	}); //end click function
}


function main(test_term) {

	resultsBox();  //call function to fadeIn results and new search button

	var p_to_remove = document.getElementById("temp_par");
	var remove = document.getElementById("tweets").removeChild(p_to_remove);
	
	var count = 0;  //used for alternating colors
	var love_count = 0;
	var hate_count = 0;
	
	var paragraphs = [];  //declare new array alt var object_array = new Array();
	var search_term = test_term;
	var s = new Spotter("twitter.search",
		{q:test_term, period:120}, //check for bieber every 120 seconds
		{buffer:true, bufferTimeout:750}
		);
	//function will get one new tweet	
	s.register(function(tweet) {
		count = count+1;  //increment count
		var color;  //variable to alternate color
		var profile_image = "<img class='pic_class' src='"+tweet.profile_image_url+"' />"; //profile image into var
		if(count%2 === 0) {  //alternate colors based on count
				color= "gray";  //alt "'gray'" then single quotes not necessary below
			} else {
				color = "dkGray";
			} //end else
			
		if(tweet.text.match(/(^|\s)karl($|\s)/i)) {
	    love_count++;
	    $("#love_div").replaceWith("<div id='love_div'>"+love_count+"</div>");
		} //end if
		
		if(tweet.text.match(/(^|\s)hess($|\s)/i)) {
		hate_count++;
		$("#hate_div").replaceWith("<div id='hate_div'>"+hate_count+"</div>");
		} //end if
			
		var new_paragraph = $("<p class ='"+color+"'>"+profile_image+tweet.text+"</p>");  //single quote stays within doubles bc class needs quotes
		if (paragraphs.length >= 5) {  //if count is 10 or larger remove element from array
			var p = paragraphs.shift(); //fifo first in first out
			p.fadeOut(1000, function() { // callback function applies funtion to last item
				p.remove();	
			}); //end fadeOut
		}; //end if

		paragraphs.push(new_paragraph); //add paragraph to array
		new_paragraph.hide();
		$("#tweets").prepend(new_paragraph);  //newest tweets first
		new_paragraph.slideDown();		
	}); //end register
	
	s.start();
	
} //end main

function resultsBox (){

	//$("#search_box").replaceWith($("<div id='search_box'><div id = 'love_div'>love</div><br><div id = 'hate_div'>hate</div></div>"));
	var new_contents = $("<div id='search_contents'><div id = 'love_div'>love</div><br><div id = 'hate_div'>hate</div></div>") ;
	new_contents.hide();
	$("#search_contents").fadeOut(600, function() {
    	$("#search_contents").replaceWith(new_contents);
    	$(new_contents).fadeIn(600);
	});


	//hide the results box then have it fade in
	//var new_div = $("<div id='results'><div id = 'love_div'>love</div><br><div id = 'hate_div'>hate</div></div>");
	//new_div.hide();
	//$("#main").append(new_div);
	//new_div.fadeIn(1400);
	
	//hide the refresh button will appear once search is run
	var refresh = $("<button class='btn' value='Reload Page' onClick='window.location.reload()'>New Search</button>");
	refresh.hide();
	$("#refresh_button").append(refresh);
	refresh.fadeIn(600);
}

$(document).ready(function() {
	getSearchTerm();
});


//now i want to do a search again

//<input type="button" value="Reload Page" onClick="window.location.reload()">

//on click result go in search box div and new search appears original contents go away
