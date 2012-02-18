/*
Billy Mills
CSCI 344
project2.js
Feb 20, 2012
*/

function main() {
	//1. Create a spotter and get it to insert tweets into the DOM
	//2. Add profile images
	//3. Make the tweets occur so the most recent are at the top
		//look at jQuery documentation for this
	//4. Make the tweets slide down used slideDown
	//5. Alternate colors
	//6. show 10 posts, remove old from DOM
	var count = 0;  //used for alternating colors
	var paragraphs = [];  //declare new array alt var object_array = new Array();
	var s = new Spotter("twitter.search",
		{q:"bieber", period:120}, //check for bieber every 120 seconds
		{buffer:true, bufferTimeout:750}
		);
	//function will get one new tweet	
	s.register(function(tweet) {
		count = count+1;  //increment count
		var color;  //variable to alternate color
		var profile_image = "<img src='"+tweet.profile_image_url+"' />"; //profile image into var
		if(count%2 === 0) {  //alternate colors based on count
				color= "gray";  //alt "'gray'" then single quotes not necessary below
			} else {
				color = "dkGray";
			}
		var new_paragraph = $("<p class ='"+color+"'>"+profile_image+tweet.text+"</p>");  //single quote stays within doubles bc class needs quotes
		if (paragraphs.length >= 10) {  //if count is 10 or larger remove element from array
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

main();