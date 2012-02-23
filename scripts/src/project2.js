/*
Billy Mills
CSCI 344
project2.js
Feb 20, 2012
*/



function getSearchTerm () {

	//run main on click
	$("#search_button").click(function() {
		main($("#term").val());
	}); //end click function
	
	//run main if 'enter' is pressed
	$("#term").keypress(function(e) {
    	if(e.keyCode == 13) {
        	//alert('You pressed enter!');
        	main($("#term").val());
   		 } //end if
	}); //end function
	
	
}





function main(test_term) {
	
	changeHeader();
	resultsBox();  //call function to fadeIn results and new search button
	
	var tweet_div = document.getElementById("tweets");
	while( tweet_div.hasChildNodes() ){
    	tweet_div.removeChild(tweet_div.lastChild);
	}
	
	var count = 0;  //used for alternating colors
	var love_count = 0;
	var hate_count = 0;
	var paragraphs = [];  //declare new array alt var object_array = new Array();
	var search_term = test_term;
	var s = new Spotter("twitter.search",
			{q:test_term, period:120}, //check for bieber every 120 seconds
			{buffer:true, bufferTimeout:1000}
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
			
		if(tweet.text.match(/(^|\s)love($|\s)/i)) {
	    	love_count++;
	    	$("#love_div").replaceWith("<div id='love_div'># of loves:  "+love_count+"</div>");
		} //end if
		
		if(tweet.text.match(/(^|\s)hate($|\s)/i)) {
			hate_count++;
			$("#hate_div").replaceWith("<div id='hate_div'># of hates:  "+hate_count+"</div>");
		} //end if
			
		var new_paragraph = $("<p class ='"+color+"'>"+profile_image+tweet.text+"</p>");  //single quote stays within doubles bc class needs quotes
		if (paragraphs.length >= 4) {  //if count is 10 or larger remove element from array
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
	var new_contents = $("<div id='search_contents'><div id = 'love_div'>no love so far</div><br><div id = 'hate_div'>no haters yet</div><br><button class='btn' value='Reload Page' onClick='window.location.reload()'>New Search</button></div>") ;
	new_contents.hide();
	$("#search_contents").fadeOut(1000, function() {
    	$("#search_contents").replaceWith(new_contents);
    	$(new_contents).fadeIn(1000);
	});	
}

function changeHeader() {
	var new_contents = $("<div id='tweet_header'><h4>some recent tweets</h4></div>");
	new_contents.hide();
	$("#tweet_header").replaceWith(new_contents);
	$(new_contents).fadeIn(1000);
}

$(document).ready(function() {
	getSearchTerm();
	
});

