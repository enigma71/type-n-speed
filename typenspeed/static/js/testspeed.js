/*
 * The animation at the start, made from my previous pen
 * https://codepen.io/EightArmsHQ/pen/HJsav
 */
$(document).ready(function () {
  // The base speed per character
  time_setting = 30;
  // How much to 'sway' (random * this-many-milliseconds)
  random_setting = 100;
  // The text to use NB use \n not real life line breaks!
  input_text = "How fast can you type?";
  // Where to fill up
  target_setting = $("#output");
  // Launch that function!
  //type(input_text, target_setting, 0, time_setting, random_setting);

  function type(input, target, current, time, random) {
    // If the current count is larger than the length of the string, then for goodness sake, stop
    if (current > input.length) {
      // Write Complete
      console.log("Complete.");
    } else {
      // console.log(current)
      // Increment the marker
      current += 1;
      // fill the target with a substring, from the 0th character to the current one
      target.text(input.substring(0, current));
      // Wait ...
      setTimeout(function () {
        // do the function again, with the newly incremented marker
        type(input, target, current, time, random);
        // Time it the normal time, plus a random amount of sway
      }, time + Math.random() * random);
    }
  }



  $(function () {
    $("#sub_form").submit(function (event) {
      // Stop form from submitting normally
      event.preventDefault();
      var friForm = $(this);
      // Send the data using post
      var posting = $.post(friForm.attr('action'), friForm.serialize());
      // if success:
      posting.done(function (data) {
        // success actions, maybe change submit button to 'friend added' or whatever
      });
      // if failure:
      posting.fail(function (data) {
        // 4xx or 5xx response, alert user about failure
      });
    });
  });






  function post(path, params, method = 'POST') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    form.setAttribute("id", "sub_form");

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    document.getElementById("sub_form").submit();
  }



  /*
   * The typing test stuff
   */
  var character_length = 31;
  var index = 0;
  var letters = $("#input_text").val();
  var started = false;
  var current_string = letters.substring(index, index + character_length);

  var wordcount = 0;

  $("html, body").click(function () {
    $("#textarea").focus();
  });

  $("#target").text(current_string);
  $(window).keypress(function (evt) {
    if (!started) {
      start();
      started = true;
    }
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charTyped = String.fromCharCode(charCode);
    if (charTyped == letters.charAt(index)) {
      if (charTyped == " ") {
        wordcount++;
        $("#wordcount").text(wordcount);
      }
      index++;
      current_string = letters.substring(index, index + character_length);
      $("#target").text(current_string);
      $("#your-attempt").append(charTyped);
      if (index == letters.length) {
        wordcount++;
        $("#wordcount").text(wordcount);
        $("#timer").text(timer);
        if (timer == 0) {
          timer = 1;
        }
        wpm = Math.round(wordcount / (timer / 60));
        $("#wpm").text(wpm);
        stop();
        finished();
      }
    } else {
      $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
      errors++;
      $("#errors").text(errors);
    }
  });

  var timer = 0;
  var wpm = 0;
  var errors = 0;
  var interval_timer;

  $("#reset").click(function () {
    reset();
  });

  $("#change").click(function () {
    $("#input_text").show().focus();
  });

  $("#pause").click(function () {
    stop();
  });

  $("#input_text").change(function () {
    reset();
  });

  function start() {
    interval_timer = setInterval(function () {
      timer++;
      $("#timer").text(timer);
      wpm = Math.round(wordcount / (timer / 60));
      $("#wpm").text(wpm);
    }, 1000)
  }

  function stop() {
    clearInterval(interval_timer);
    started = false;
  }

  function reset() {
    $("#input_text").blur().hide();;
    $("#your-attempt").text("");
    index = 0;
    errors = 0;
    clearInterval(interval_timer);
    started = false;
    letters = $("#input_text").val();
    $("#wpm").text("0");
    $("#timer").text("0");
    $("#wordcount").text("0");
    $("#errors").text("0");
    timer = 0;
    wpm = 0;
    current_string = letters.substring(index, index + character_length);
    $("#target").text(current_string);
  }

  function finished() {
    $("#idwpm").text(wpm);
    $("#idwc").text(wordcount);
    $("#iderr").text(errors);
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    nameUser = jQuery('input[name="name"]').val();
    //post('.', {name: nameUser, type_speed: wpm, csrfmiddlewaretoken: csrf_value});

    $.ajax({
      type: "POST",
      url: ".",
      data: {
        name: nameUser,
        type_speed: wpm,
        csrfmiddlewaretoken: csrf_value,
        dataType: "json",

      },

      success: function (data) {
        $('#output').html(data.msg) /* response message */
      },

      failure: function () {

      }


    });

    document.getElementById("reset").click();
    $("#start_speedtest").toggle("slow");
    $("#result_page").toggle("slow");

  }

  var window_focus;

  $(window).focus(function () {
    window_focus = true;
  }).blur(function () {
    window_focus = false;
  });

  $(document).ready(function () {
    if (window_focus) {
      $("#focus").hide();
    }
    $(window).focus(function () {
      $("#focus").hide();
    });
  });

});