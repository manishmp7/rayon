$(function() {

    $('.customer img').tooltip();

    $('.goToTop, #navigation a, .home').click(function(event) {
	event.preventDefault();
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#" + trgt).offset();
	var target_top = target_offset.top - 80;

	if (target_top < 0) {
	    target_top = 0;
	}

	$('html, body').animate({scrollTop: target_top}, 1000);
    });

    fullScreenContainer();
    animations();
    contactForm();
});

/* animations */

function animations() {
    delayTime = 0;
    $('[data-animate]').css({opacity: '0'});
    $('[data-animate]').waypoint(function(direction) {
	delayTime += 150;
	$(this).delay(delayTime).queue(function(next) {
	    $(this).toggleClass('animated');
	    $(this).toggleClass($(this).data('animate'));
	    delayTime = 0;
	    next();
	    //$(this).removeClass('animated');
	    //$(this).toggleClass($(this).data('animate'));
	});
    },
	    {
		offset: '95%',
		triggerOnce: true
	    });

    $('[data-animate-hover]').hover(function() {
	$(this).css({opacity: 1});
	$(this).addClass('animated');
	$(this).removeClass($(this).data('animate'));
	$(this).addClass($(this).data('animate-hover'));
    }, function() {
	$(this).removeClass('animated');
	$(this).removeClass($(this).data('animate-hover'));
    });

}

/* full screen intro */

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = $(window).height() + "px";
    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}

$(window).resize(function() {
    setTimeout(function() {
	fullScreenContainer();

    }, 150);
});

/* ajax contact form */

function contactForm() {
    $("#contact-form").submit(function() {

	var url = "contact.php"; // the script where you handle the form input.

	$.ajax({
	    type: "POST",
	    url: url,
	    data: $(this).serialize(), // serializes the form's elements.
	    success: function(data)
	    {
		var messageAlert = 'alert-' + data.type;
		var messageText = data.message;

		var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

		if (messageAlert && messageText) {
		    $('#contact-form').find('.messages').html(alertBox);
		}
	    }
	});

	return false; // avoid to execute the actual submit of the form.
    });
}