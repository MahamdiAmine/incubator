//image preview
var loadFile = function (event) {
    var output = document.getElementById('img-preview');
    output.src = URL.createObjectURL(event.target.files[0]);
    $("#filepath").html(event.target.files[0]["path"]).hide();
};

//collapsible
var coll = document.getElementsByClassName("collapse-btn");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

var test_count = 1;
$("#test-add").click(function () {
    test_count++;
    var row = "<div id=\"test-" + test_count + "\"><div class=\"col s12\"><input type=\"text\" placeholder=\"Duration\"></div></div>";
    $("#test-row").html($("#test-row").html() + row);
    $("#test-rem").css("display", "inline-block");
});

$("#test-rem").click(function () {
    $("#test-" + test_count).remove();
    test_count--;
    if (test_count <= 1) {
        $("#test-rem").css("display", "none");
    }
});

/*******************************************************************/
/************             SIGN UP VALIDATION            ************/
/*******************************************************************/

//Email validation
$('#mail').on('blur', function () {
    if (!this.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        $('#error_email').html('Please provide a valid email address.').css('color', '#D32F2F').css('padding-top', '10px').css('font-size', '16px');
        return false;
    }
    $('#error_email').html('');
    $('#error_email').hide();
});

//PAssword validation
$('#cpwd').on('keyup', function () {
    if ($('#pwd').val() == $('#cpwd').val()) {
        $('#message_cpwd').html('');
        $('#message_cpwd').hide();
        $('#signup-submit').prop('disabled', false);
    } else {
        $('#message_cpwd').html('Passwords do not Match. Register button has been Disabled.').css('color', '#D32F2F');
        $('#signup-submit').prop('disabled', true);
    }
});

$('#pwd').on('blur', function () {
    if (this.value.length < 8) {
        $('#message_pwd').html('Passwords must be atleast 8 characters long.').css('color', '#D32F2F');
        //$(this).focus();
        return false;
    } else {
        $('#message_pwd').html('');
        $('#message_pwd').hide();
    }
});

//modl close
$("#button_close").click(function () {
    $("#success-modal").hide();
});

/*******************************************************************/
/************                   ROUTING                 ************/
/*******************************************************************/

$('.signup-btn').click(function () {
    $('#signin').fadeOut();
    $('#signup').delay(500).fadeIn();
});

$('.signin-link').click(function () {
    $('#signup').fadeOut();
    $('#signin').delay(500).fadeIn();
});

// add batch
$('#add-batch-btn').click(function () {
    $('#view-batch').fadeOut();
    $('#edit-batch').fadeOut();
    $('#view-batch17').fadeOut();
    $('#view-batch21').fadeOut();
    $('#counter-stats').fadeOut();
    $('#add-batch').delay(500).fadeIn();
    document.getElementById("edit-batch").classList.add("hidden");
    document.getElementById("view-batch").classList.add("hidden");
    document.getElementById("view-batch17").classList.add("hidden");
    document.getElementById("view-batch21").classList.add("hidden");
    document.getElementById("counter-stats").classList.remove("hidden");
    document.getElementById("add-batch").classList.remove("hidden");
    $('#dashboard-nav').removeClass('actv');
    $('#batch-nav').addClass('actv');
    $('#contacts-nav').removeClass('actv');
});

// view Batch
$('#view-batch-btn').click(function () {
    $('#edit-batch').fadeOut();
    $('#add-batch').fadeOut();
    $('#view-batch').fadeOut();
    $('#view-batch17').fadeOut();
    $('#view-batch21').fadeOut();
    $('#counter-stats').fadeOut();
    $('#view-batch').delay(500).fadeIn();
    document.getElementById("add-batch").classList.add("hidden");
    document.getElementById("edit-batch").classList.add("hidden");
    document.getElementById("view-batch17").classList.add("hidden");
    document.getElementById("view-batch21").classList.add("hidden");
    document.getElementById("counter-stats").classList.add("hidden");
    document.getElementById("view-batch").classList.remove("hidden");
    $('#dashboard-nav').removeClass('actv');
    $('#batch-nav').addClass('actv');
    $('#contacts-nav').removeClass('actv');
    document.getElementById("batch_4_date").classList.add("hidden");
    document.getElementById("batch_17_date").classList.add("hidden");
});

// view Batch17
$('#view-batch17-btn').click(function () {
    $('#edit-batch').fadeOut();
    $('#add-batch').fadeOut();
    $('#view-batch').fadeOut();
    $('#view-batch17').fadeOut();
    $('#view-batch21').fadeOut();
    $('#counter-stats').fadeOut();
    $('#view-batch17').delay(500).fadeIn();
    document.getElementById("add-batch").classList.add("hidden");
    document.getElementById("edit-batch").classList.add("hidden");
    document.getElementById("view-batch").classList.add("hidden");
    document.getElementById("view-batch21").classList.add("hidden");
    document.getElementById("counter-stats").classList.add("hidden");
    document.getElementById("view-batch17").classList.remove("hidden");
    $('#dashboard-nav').removeClass('actv');
    $('#batch-nav').addClass('actv');
    $('#contacts-nav').removeClass('actv');
    document.getElementById("batch_4_date").classList.add("hidden");
    document.getElementById("batch_17_date").classList.add("hidden");
});

// view Batch21
$('#view-batch21-btn').click(function () {
    $('#edit-batch').fadeOut();
    $('#add-batch').fadeOut();
    $('#view-batch').fadeOut();
    $('#view-batch17').fadeOut();
    $('#view-batch21').fadeOut();
    $('#counter-stats').fadeOut();
    $('#view-batch21').delay(500).fadeIn();
    document.getElementById("add-batch").classList.add("hidden");
    document.getElementById("edit-batch").classList.add("hidden");
    document.getElementById("view-batch").classList.add("hidden");
    document.getElementById("view-batch17").classList.add("hidden");
    document.getElementById("counter-stats").classList.add("hidden");
    document.getElementById("view-batch21").classList.remove("hidden");
    $('#dashboard-nav').removeClass('actv');
    $('#batch-nav').addClass('actv');
    $('#contacts-nav').removeClass('actv');
    document.getElementById("batch_4_date").classList.add("hidden");
    document.getElementById("batch_17_date").classList.add("hidden");
});

//show stats
$("#show-stats-btn").click(function () {
    $('#edit-batch').fadeOut();
    $('#add-batch').fadeOut();
    $('#view-batch').fadeOut();
    $('#view-batch17').fadeOut();
    $('#view-batch21').fadeOut();
    $('#counter-stats').fadeOut();
    $('#counter-stats').delay(500).fadeIn();
    document.getElementById("add-batch").classList.add("hidden");
    document.getElementById("edit-batch").classList.add("hidden");
    document.getElementById("view-batch").classList.add("hidden");
    document.getElementById("view-batch17").classList.add("hidden");
    document.getElementById("view-batch21").classList.add("hidden");
    document.getElementById("counter-stats").classList.remove("hidden");
    $('#dashboard-nav').removeClass('actv');
    $('#batch-nav').removeClass('actv');
    $('#contacts-nav').addClass('actv');
    document.getElementById("batch_4_date").classList.add("hidden");
    document.getElementById("batch_17_date").classList.add("hidden");
});

