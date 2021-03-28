
$(function() {
    $("#friend_form").submit(function(event) {
        // Stop form from submitting normally
        event.preventDefault();
        var friendForm = $(this);
        // Send the data using post
        var posting = $.post( friendForm.attr('action'), friendForm.serialize() );
        // if success:
        posting.done(function(data) {
            // success actions, maybe change submit button to 'friend added' or whatever
        });
        // if failure:
        posting.fail(function(data) {
            // 4xx or 5xx response, alert user about failure
        });
    });
});



$(document).ready(function () {

    time_setting = 30;
// How much to 'sway' (random * this-many-milliseconds)
random_setting = 100;
// The text to use NB use \n not real life line breaks!

// Where to fill up
target_setting = $("#output");
// Launch that function!

function type(input, target, current, time, random){
  // If the current count is larger than the length of the string, then for goodness sake, stop
	if(current > input.length){
    // Write Complete
		console.log("Complete.");
	}
	else{
	 // console.log(current)
    // Increment the marker
		current += 1;
    // fill the target with a substring, from the 0th character to the current one
		target.text(input.substring(0,current));
    // Wait ...
		setTimeout(function(){
      // do the function again, with the newly incremented marker
			type(input, target, current, time, random);
      // Time it the normal time, plus a random amount of sway
		},time + Math.random()*random);
	}
}




    $("#start_test_tg").click(function () {
        document.getElementById("reset").click();
        $("#start_page").toggle("slow");
        $("#start_speedtest").toggle("slow");
        setTimeout(function(){
            nameUser = jQuery('input[name="name"]').val();
            input_text = "Hey, " + nameUser + "! How fast can you type?";
            type(input_text, target_setting, 0, time_setting, random_setting);
        }, 500);
    });
});


$(window).keypress(function(e) {
    if (e.which == 32)
        return false;
});

$(output).keypress(function(e) {
    if (e.which == 32)
        return true;
});
