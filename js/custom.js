$(document).ready(function() {
    initHomeSlider();

    function initHomeSlider() {
        if ($('.home_slider').length) {
            var homeSlider = $('.home_slider');

            homeSlider.owlCarousel({
                items: 1,
                loop: true,
                autoplay: false,
                smartSpeed: 1200,
                dotsContainer: 'main_slider_custom_dots'
            });

            /* Custom nav events */
            if ($('.home_slider_prev').length) {
                var prev = $('.home_slider_prev');

                prev.on('click', function() {
                    homeSlider.trigger('prev.owl.carousel');
                });
            }

            if ($('.home_slider_next').length) {
                var next = $('.home_slider_next');

                next.on('click', function() {
                    homeSlider.trigger('next.owl.carousel');
                });
            }

            /* Custom dots events */
            if ($('.home_slider_custom_dot').length) {
                $('.home_slider_custom_dot').on('click', function() {
                    $('.home_slider_custom_dot').removeClass('active');
                    $(this).addClass('active');
                    homeSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
                });
            }

            /* Change active class for dots when slide changes by nav or touch */
            homeSlider.on('changed.owl.carousel', function(event) {
                $('.home_slider_custom_dot').removeClass('active');
                $('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
            });

            // add animate.css class(es) to the elements to be animated
            function setAnimation(_elem, _InOut) {
                // Store all animationend event name in a string.
                // cf animate.css documentation
                var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                _elem.each(function() {
                    var $elem = $(this);
                    var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

                    $elem.addClass($animationType).one(animationEndEvent, function() {
                        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
                    });
                });
            }

            // Fired before current slide change
            homeSlider.on('change.owl.carousel', function(event) {
                var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-out]");
                setAnimation($elemsToanim, 'out');
            });

            // Fired after current slide has been changed
            homeSlider.on('changed.owl.carousel', function(event) {
                var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-in]");
                setAnimation($elemsToanim, 'in');
            })
        }
    }


    // ------------------------------------------------------- //
    // Custom Scrollbar
    // ------------------------------------------------------ //

    if ($(window).outerWidth() > 992) {
        $("nav.side-navbar").mCustomScrollbar({
            scrollInertia: 200
        });
    }

    // Main Template Color
    var brandPrimary = '#33b35a';

    // ------------------------------------------------------- //
    // Side Navbar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function(e) {

        e.preventDefault();

        if ($(window).outerWidth() > 1194) {
            $('nav.side-navbar').toggleClass('shrink');
            $('.page').toggleClass('active');
        } else {
            $('nav.side-navbar').toggleClass('show-sm');
            $('.page').toggleClass('active-sm');
        }
    });
});
$(function() {
    "use strict ";

    if ($(".hero-slider-block ").length) {
        var sync1 = $(".hero-slider-block ");
        // var sync2 = $(".testimonial-thumbs ");
        // sync2.owlCarousel({
        //     autoPlay: true,
        //     singleItem: true,
        //     slideSpeed: 1000,
        //     navigation: false,
        //     pagination: true,
        //     responsiveRefreshRate: 200
        // });

        sync1.owlCarousel({
            autoPlay: true,
            items: 1,
            slideSpeed: 1000,
            // itemsDesktop: [1199, 3],
            navigation: true,
            // itemsDesktopSmall: [979, 1],
            // itemsTablet: [768, 3],
            // itemsMobile: [479, 3],
            pagination: false,
            responsiveRefreshRate: 100,
            afterInit: function(el) {
                $(".owl-item ").eq(0).addClass("synced ");
            }
        });

        $(".hero-slider-block ").on("click ", ".owl-item ", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem ");
            //sync2.trigger("owl.goTo ", number);
        });

        // setInterval(function () {
        //     var index_val = sync2.find('.owl-pagination .owl-page.active').index();
        //     sync1.find(".owl-item ").removeClass('active');
        //     sync1.find(".owl-item ").eq(index_val).addClass('active');
        // }, 10);

    };
});

$(document).ready(function() {
    $(".dropdown-trigger ").dropdown();
});
// heavily modified BS4 version of https://github.com/openam/bootstrap-responsive-tabs
var fakewaffle = (function($, fakewaffle) {
    'use strict';

    fakewaffle.responsiveTabs = function(collapseDisplayed) {

        fakewaffle.currentPosition = 'tabs';

        var tabGroups = $('.nav-tabs.responsive');
        var hidden = '';
        var visible = '';
        var activeTab = '';

        // if ( collapseDisplayed === undefined ) {
        // collapseDisplayed = [ 'xs', 'sm' ];
        // }

        // $.each( collapseDisplayed, function () {
        // hidden += ' banana-' + this;
        // visible += ' visible-' + this;
        // } );

        hidden = ' d-none d-sm-flex';
        visible = ' d-sm-none';

        $.each(tabGroups, function(index) {
            var collapseDiv;
            var $tabGroup = $(this);
            var tabs = $tabGroup.find('li a');

            if ($tabGroup.attr('id') === undefined) {
                $tabGroup.attr('id', 'tabs-' + index);
            }

            collapseDiv = $('<div></div>', {
                'class': 'card-soup responsive' + visible,
                'id': 'collapse-' + $tabGroup.attr('id')
            });

            $.each(tabs, function() {
                var $this = $(this);
                var oldLinkClass = $this.attr('class') === undefined ? '' : $this.attr('class');
                var newLinkClass = 'accordion-toggle';
                var oldParentClass = $this.parent().attr('class') === undefined ? '' : $this.parent().attr('class');
                var newParentClass = 'card';
                var newHash = $this.get(0).hash.replace('#', 'collapse-');

                if (oldLinkClass.length > 0) {
                    newLinkClass += ' ' + oldLinkClass;
                }

                if (oldParentClass.length > 0) {
                    oldParentClass = oldParentClass.replace(/\bactive\b/g, '');
                    newParentClass += ' ' + oldParentClass;
                    newParentClass = newParentClass.replace(/\s{2,}/g, ' ');
                    newParentClass = newParentClass.replace(/^\s+|\s+$/g, '');
                }

                if ($this.parent().hasClass('active')) {
                    activeTab = '#' + newHash;
                }

                collapseDiv.append(
                    $('<div>').attr('class', newParentClass).html(
                        $('<div>').attr('class', 'card-header').html(
                            $('<h4>').attr('class', 'card-title').html(
                                $('<a>', {
                                    'class': newLinkClass,
                                    'data-toggle': 'collapse',
                                    'data-parent': '#collapse-' + $tabGroup.attr('id'),
                                    'href': '#' + newHash,
                                    'html': $this.html()
                                })
                            )
                        )
                    ).append(
                        $('<div>', {
                            'id': newHash,
                            'class': 'collapse'
                        })
                    )
                );
            });

            $tabGroup.next().after(collapseDiv);
            $tabGroup.addClass(hidden);
            $('.tab-content.responsive').addClass(hidden);

            if (activeTab) {
                $(activeTab).collapse('show');
            }
        });

        fakewaffle.checkResize();
        fakewaffle.bindTabToCollapse();
    };

    fakewaffle.checkResize = function() {

        if ($('.card-soup.responsive').is(':visible') === true && fakewaffle.currentPosition ===
            'tabs') {
            fakewaffle.tabToPanel();
            fakewaffle.currentPosition = 'panel';
        } else if ($('.card-soup.responsive').is(':visible') === false && fakewaffle.currentPosition ===
            'panel') {
            fakewaffle.panelToTab();
            fakewaffle.currentPosition = 'tabs';
        }

    };

    fakewaffle.tabToPanel = function() {

        var tabGroups = $('.nav-tabs.responsive');

        $.each(tabGroups, function(index, tabGroup) {

            // Find the tab
            var tabContents = $(tabGroup).next('.tab-content').find('.tab-pane');

            $.each(tabContents, function(index, tabContent) {
                // Find the id to move the element to
                var destinationId = $(tabContent).attr('id').replace(/^/, '#collapse-');

                // Convert tab to panel and move to destination
                $(tabContent)
                    .removeClass('tab-pane')
                    .addClass('card-body fw-previous-tab-pane')
                    .appendTo($(destinationId));

            });

        });

    };

    fakewaffle.panelToTab = function() {

        var panelGroups = $('.card-soup.responsive');

        $.each(panelGroups, function(index, panelGroup) {

            var destinationId = $(panelGroup).attr('id').replace('collapse-', '#');
            var destination = $(destinationId).next('.tab-content')[0];

            // Find the panel contents
            var panelContents = $(panelGroup).find('.card-body.fw-previous-tab-pane');

            // Convert to tab and move to destination
            panelContents
                .removeClass('card-body fw-previous-tab-pane')
                .addClass('tab-pane')
                .appendTo($(destination));

        });

    };

    fakewaffle.bindTabToCollapse = function() {

        var tabs = $('.nav-tabs.responsive').find('li a');
        var collapse = $('.card-soup.responsive').find('.card-collapse');

        // Toggle the panels when the associated tab is toggled
        tabs.on('shown.bs.tab', function(e) {

            if (fakewaffle.currentPosition === 'tabs') {
                var $current = $(e.currentTarget.hash.replace(/#/, '#collapse-'));
                $current.collapse('show');

                if (e.relatedTarget) {
                    var $previous = $(e.relatedTarget.hash.replace(/#/, '#collapse-'));
                    $previous.collapse('hide');
                }
            }

        });

        // Toggle the tab when the associated panel is toggled
        collapse.on('shown.bs.collapse', function(e) {

            if (fakewaffle.currentPosition === 'panel') {
                // Activate current tabs
                var current = $(e.target).context.id.replace(/collapse-/g, '#');
                $('a[href="' + current + '"]').tab('show');

                // Update the content with active
                var panelGroup = $(e.currentTarget).closest('.card-soup.responsive');
                $(panelGroup).find('.card-body').removeClass('active');
                $(e.currentTarget).find('.card-body').addClass('active');
            }

        });
    };

    $(window).resize(function() {
        fakewaffle.checkResize();
    });

    return fakewaffle;
}(window.jQuery, fakewaffle || {}));

fakewaffle.responsiveTabs();











document.documentElement.setAttribute("lang", "en");
document.documentElement.removeAttribute("class");

//axe.run(function(err, results) {
//  console.log(results.violations);
//});

// Get IE or Edge browser version
var version = detectIE();

if (version !== false) {
    alert('Please view in Chrome/Safari/Firefox');
}
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
//data table js
$(document).ready(function() {
    $('#example').DataTable();
});