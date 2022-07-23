

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);
$(document).ready(function() {

    // show/hide the mobile menu based on class added to container
    $('.menu-icon').click(function() {
        $(this).parent().toggleClass('is-tapped');
        $('#hamburger').toggleClass('open');
    });

    // handle touch device events on drop down, first tap adds class, second navigates
    $('.touch .sitenavigation li.nav-dropdown > a').on('touchend',
        function(e) {
            if ($('.menu-icon').is(':hidden')) {
                var parent = $(this).parent();
                $(this).find('.clicked').removeClass('clicked');
                if (parent.hasClass('clicked')) {
                    window.location.href = $(this).attr('href');
                } else {
                    $(this).addClass('linkclicked');

                    // close other open menus at this level
                    $(this).parent().parent().find('.clicked').removeClass('clicked');

                    parent.addClass('clicked');
                    e.preventDefault();
                }
            }
        });

    // handle the expansion of mobile menu drop down nesting
    $('.sitenavigation li.nav-dropdown').click(
        function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }

            if ($('.menu-icon').is(':visible')) {
                $(this).find('> ul').toggle();
                $(this).toggleClass('expanded');
            }
        }
    );

    // prevent links for propagating click/tap events that may trigger hiding/unhiding
    $('.sitenavigation a.nav-dropdown, .sitenavigation li.nav-dropdown a').click(
        function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    );

    // javascript fade in and out of dropdown menu
    $('.no-touch .sitenavigation li').hover(
        function() {
            if (!$('.menu-icon').is(':visible')) {
                $(this).find('> ul').fadeIn(100);
            }
        },
        function() {
            if (!$('.menu-icon').is(':visible')) {
                $(this).find('> ul').fadeOut(100);
            }
        }
    );
});
