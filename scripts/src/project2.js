/*
Billy Mills
CSCI 344
project2.js
Feb 20, 2012
*/



function getSearchTerm () {

$("#search_button").click(function() {
		alert($("#term").val());
		main($("#term").val());
	});
// var test_term = $("#term").val();

//main(test_term);
}


function main(test_term) {
	
	//$("#search_button").click(function() {
	//	alert($("#term").val());
//	});
//var test_term = $("#term").val();
	var count = 0;  //used for alternating colors
	var love_count = 0;
	
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
			}
			
		if(tweet.text.match(/\slove\s/)) {
	    love_count++;
		}
			
		var new_paragraph = $("<p class ='"+color+"'>"+profile_image+tweet.text+"</p>");  //single quote stays within doubles bc class needs quotes
		if (paragraphs.length >= 5) {  //if count is 10 or larger remove element from array
			var p = paragraphs.shift(); //fifo first in first out
			p.fadeOut(1000, function() { // callback function applies funtion to last item
				p.remove();	
			});
		};

		/*
		alt solutions
		
		if (count > 4) { //alt solution
			var object_to_remove = $("#tweets p:last-child");
			object_to_remove.fadeOut(500, function() { // callback function applies funtion to last item
			object_to_remove.remove();
			});
		};
		
		$("#tweets p:gt(4)").fadeOut(500, function() { //another alt solution
			$("#tweets p:gt(4)").remove();
		});
		*/

		paragraphs.push(new_paragraph); //add paragraph to array
		new_paragraph.hide();
		$("#tweets").prepend(new_paragraph);  //newest tweets first
		new_paragraph.slideDown();		
	}); 

	s.start();
}
$(document).ready(function() {
getSearchTerm();
});
