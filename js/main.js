/**
 * @fileOverview Main js implementation of afable.github.io, 2016
 * @author afablee@gmail.com, @superafable
 */

"use strict";

// document and window ready functions (test which loads first)
//window.onload = function() { console.log("LOADED window.onload..."); };
//(function() { console.log("LOADED IIFE.."); })();
//$(document).ready(function() { console.log("LOADED $(document).ready..."); });

// show viewport size on re-size (chrome no longer shows it by default)
// window.addEventListener('resize', function(event){
//   console.log("(vw, vh): (" + window.innerWidth + ", " + window.innerHeight + ")");
// });


// ============================================================================
// ========================== Main Javascript Routine =========================
// ============ ( encapsulate js so there are no naming conflicts ) ===========
// ============================================================================
( function( afable, $, undefined ) {

// ============================================================================
// ============================= Global Variables =============================
// ============================================================================
	var g_bLandscape = true;
	var g_bToolbarVisible = false;
	var g_bToolbarAnimating = false;
	var LEFT_ARROW = 37, UP_ARROW = 38, RIGHT_ARROW = 39, DOWN_ARROW = 40;
	
	// get if this viewport is hortizontal or vertical
	g_bLandscape = ( window.innerWidth > window.innerHeight )? true : false;


	// initialize page data for all pages
	var arrPages = [];
	arrPages.push( {id: "afable",
		icon: "fad fa-user-alt fa-2x",
		iconTitle: "me me me", 
		img: "jpg", 
		url: "https://github.com/afable",
		title: "afable",
		caption: "That's me. I ♥ video games and the web.<br>←Swipe for more→"} );
	arrPages.push( {id: "fall",
		icon: "fas fa-umbrella fa-2x",
		iconTitle: "don't fall", 
		img: "png",
		url: "https://afable.github.io/fall",
		title: "fall",
		caption: "48 hour game jam themed 'fall'. @orcajam2019"} );
	arrPages.push( {id: "quotr",
		icon: "fad fa-quote-left fa-2x",
		iconTitle: "everyone needs a lil Lv", 
		img: "png",
		url: "https://quotr.github.io/",
		title: "quotes",
		caption: "Get random quotes from the indie game Undertale (everyone needs a lil Lv.)."} );
	arrPages.push( {id: "cat",
		icon: "fad fa-cat-space fa-2x",
		iconTitle: "psychedelic & cat-tastic", 
		img: "png",
		url: "https://afable.github.io/cat",
		title: "80's cat",
		caption: "A psychedelic cat-tastic experience. @orcajam2017."} );
	arrPages.push( {id: "witchr",
		icon: "fad fa-door-closed fa-2x",
		iconTitle: "a door", 
		img: "jpg",
		url: "https://fathomgame.github.io/",
		title: "a door",
		caption: "A game made with friends &mdash; find souls & avoid fishes. @orcajam2015"} );
	arrPages.push( {id: "fathom",
		icon: "fad fa-fish fa-2x",
		iconTitle: "find souls, avoid fishes", 
		img: "jpg",
		url: "https://fathomgame.github.io/",
		title: "go fish",
		caption: "A game made with friends &mdash; find souls & avoid fishes. @orcajam2015"} );
	arrPages.push( {id: "snowballin",
		icon: "fad fa-frosty-head fa-2x",
		iconTitle: "go snowballin", 
		img: "jpg",
		url: "https://snowballin.github.io/",
		title: "roll and poll",
		caption: "Helped friends make a game. You roll around. It's awesome. @orcajam2014"} );


	// create pages dynamically
	// create nav links first so they can be inserted into each page
	var strNav = "";
	var arrStrTransitions = ["fade", "flip", "pop", "flow", "slidefade", "slideup", "slidedown"];
	for ( var i = 0; i < arrPages.length; ++i ) {
		strNav += '<a href="#' + arrPages[i].id + '" data-role="button" data-transition="' + arrStrTransitions[i % arrStrTransitions.length] + '" class="nav-button ui-link ui-btn ui-shadow ui-corner-all" role="button" title="' + arrPages[i].iconTitle + '"><i class="' + arrPages[i].icon +'"></i></a>';
	}

	// create each page's main section and base image sizes on whether viewport
	// is landscape vs portrait
	var strOrientation = ( g_bLandscape )? "landscape" : "portrait";

	// now create the pages by prepending to body (#afable comes last so that
	// it is the first page element in body)
	for ( var i = arrPages.length-1; i >= 0; --i ) {
		// create header (from previously created strNav), main, and footer
	var newPage = $([
			'<div data-role="page" id="' + arrPages[i].id + '" class="ui-page">',
			
			'	<div data-role="header" class="header ui-header ui-header-fullscreen ui-header-fixed slidedown ui-bar-inherit center" data-position="fixed" data-fullscreen="true" data-tap-toggle="false" role="banner">',
			'		<nav class="nav">' + strNav + '</nav>',
			'	</div><!-- /header -->',
				
			'	<div role="main" class="main ui-content">',
			'		<table class="polaroid-container">',
			'			<tr>',
			'				<td class="td-arrow"><i class="fa fa-arrow-left fa-3x"></i>',
			'				</td>',
			'				<td class="td-polaroid"><section class="polaroid rotate">',
			'					<a href="' + arrPages[i].url + '" target="_blank" class="in-polaroid">',
			'						<div class="polaroid-img-container">',
			'							<img src="/img/' + arrPages[i].id + '.' + arrPages[i].img + '" class="unselectable ' + strOrientation + ' in-polaroid" style="opacity: 0" alt="' + arrPages[i].id + '" title="' + arrPages[i].title + '">',
			'						</div>',
			'						<div class="polaroid-p-container">',
			'							<p class="in-polaroid">' + arrPages[i].caption + '</p>',
			'						</div>',
			'					</a>',
			'					<i class="img-gesture fa fa-hand-o-up fa-5x"><p class="click-me">click<br>me</p></i>',
			'					<div class="img-gesture-popup"><p>Try clicking the polaroid or swiping the page.</p></div></section>',
			'				</td>',
			'				<td class="td-arrow"><i class="fa fa-arrow-right fa-3x"></i>',
			'				</td>',
			'			</tr>',
			'		</table>',
			'	</div><!-- /main -->',

			'	<div data-role="footer" class="footer ui-footer ui-footer-fullscreen ui-bar-inherit ui-footer-fixed slideup center" data-position="fixed" data-fullscreen="true" data-tap-toggle="false">',
			'		<footer>',
					
			'			<p><a href="https://twitter.com/afab1e" target="_blank" title="Twitter"><i class="fa fa-twitter fa-2x"></i></a> </p>',
			'		</footer>',
			'	</div><!-- /footer -->',

			'</div>',
		].join("\n"));

		// prepend new page to the page container (manually used body since
		// page container isn't initialized yet at this point)
		newPage.prependTo( $("body") );
	}

	// update the nav link widths by (100vw / # buttons) and floor so all
	// links can fit on one line
	var vwNavLink = Math.floor(100 / arrPages.length);
	$(".nav-button").css("width", vwNavLink + "vw");	
	

	// change .ui-btn-active manually as it does not persist after transitions
	// in jquerymobile-1.4.5 with jquery-2.2.4
	$(document).on("pagecontainerchange", function() {
		// remove any nav-active's that exist
		$(".nav a.nav-active").removeClass("nav-active");
		// make current page the nav-active page
		var currPage = "#" + $(".ui-page-active").prop("id");
		$(".ui-page-active a[href='" + currPage + "']").addClass("nav-active");

		// remove any opacity of all imgs that have opacity (so far best selector
		// is to target all imgs with style attributes)
		$("section img").css("opacity", 0);
		// perform animation to easein main img into view
		$(".ui-page-active section img").animate({ opacity: 1 }, "slow", "easeInOutCubic");

		// update sections and re-adjust viewport
		updateView();
	});

	// setup initial toolbar visibility
	if ( g_bToolbarVisible ) {
		g_bToolbarVisible = true;
		showToolbar(g_bToolbarVisible);
	} else {
		g_bToolbarVisible = false;
		showToolbar(g_bToolbarVisible);
	}

	// handle toolbar toggle, i.e. user clicks on img-gesture hand pointer
	// or clicks somewhere on the background
	$(document).on("click.toggleToolbar", function (e) {
		// show toolbar only if td background, img-gesture or click-me clicked
		var senderElement = $(e.target);
		if ( senderElement.is("td") ||
			senderElement.hasClass("img-gesture") ||
			senderElement.hasClass("click-me") )
		{
			// release senderElement as not using it anymore
			senderElement = null;

			// toggle toolbar show/hide only if not already animating
			toggleToolbar();
		}
	});
	

	// update viewport display on orientation changes (resize event is more
	// secure/supported and worked better in this case
	// http://davidwalsh.name/orientation-change)
	$(window).on("resize", function() {
		// update sections and re-adjust viewport
		updateView();
	});

	// handle keyboard presses to support more web accessibility needs
	// keydown event handler set so that users cannot queue
	// multiple keydown events by holding down or pressing a key multiple
	// times very quickly (undesirable behaviour on page transitions)
	$(document).on("keydown.arrowNav", function(e) {
		// only allow keydown events if not page transitioning
		// (fixes queued up keydown events)
		if ( $("body.ui-mobile-viewport-transitioning").length ) {
			return;
		}
		
		// keyboard arrows up/down toggles toolbar
		if ( e.keyCode === UP_ARROW || e.keyCode === DOWN_ARROW ) {
			toggleToolbar();
		}
		// keyboard arrows left/right swipes right/left respectively
		// to accommodate for users with accessibility needs
		if ( e.keyCode === LEFT_ARROW ) {
			$(document).trigger("swiperight");
		}
		if ( e.keyCode === RIGHT_ARROW ) {
			$(document).trigger("swipeleft");
		}
	});

	// scrolling up/down & left/right swipe left/right event, respectively
	// scroll event handler set so that users cannot queue
	// multiple events (undesirable behaviour on page transitions)
	$(window).on("wheel.scrollNav", function(e) {
		// only allow scroll events if not page transitioning
		// (fixes queued up keydown events)
		if ( $("body.ui-mobile-viewport-transitioning").length ) {
			return;
		}

		// scroll up/left & down/right toggles swiperight & swiperight
		// respectively
		if ( e.originalEvent.deltaY < 0 || e.originalEvent.deltaX < 0 ) {
			$(document).trigger("swiperight");
		}
		if ( e.originalEvent.deltaY > 0 || e.originalEvent.deltaX > 0 ) {
			$(document).trigger("swipeleft");
		}
	});

	// swipe right on left-arrow click
	$(".fa-arrow-left").on("click.left-arrow", function () {
		$(document).trigger("swiperight");
	});
	// change cursor and left-arrow colour on mouseover
	$(".fa-arrow-left").on("mouseover.left-arrow", function () {
		$(this).css("cursor", "pointer");
	});

	// swipe left on right-arrow click
	$(".fa-arrow-right").on("click.right-arrow", function () {
		$(document).trigger("swipeleft");
	});
	// change cursor and right-arrow colour on mouseover
	$(".fa-arrow-right").on("mouseover.right-arrow", function () {
		$(this).css("cursor", "pointer");
	});

	// capture left swipes on header, main, and footer
	// left swipes move to next page in sequence
	$(document).on("swipeleft", function() {
		// get current page, find its index in the array of pages by looking for
		// arrPages[#page].id
		var strCurrPage = $(".ui-page-active").prop("id");
		var indexes = $.map(arrPages, function(obj, index) {
			if(obj.id === strCurrPage ) { return index; }
		});
		var iCurrPageIndex = indexes[0];

		// change to next page unless if we are on the last page, then 
		// change to first page
		var FIRST_PAGE = 0;
		var strNextPage = ( arrPages[iCurrPageIndex+1] === undefined )? arrPages[FIRST_PAGE].id : arrPages[iCurrPageIndex+1].id;
		$.mobile.changePage("#" + strNextPage, { transition: 'flow', reverse: false });
	});

	// capture right swipes on header, main, and footer
	// right swipes move to previous page in sequence
	$(document).on("swiperight", function() {
		// get current page, find its index in the array of pages by looking for
		// arrPages[#page].id
		var strCurrPage = $(".ui-page-active").prop("id");
		var indexes = $.map(arrPages, function(obj, index) {
			if(obj.id === strCurrPage ) { return index; }
		});
		var iCurrPageIndex = indexes[0];

		// change to previous page unless if we are on the first page, then 
		// change to last page
		var LAST_PAGE = arrPages.length-1;
		var strPrevPage = ( arrPages[iCurrPageIndex-1] === undefined )? arrPages[LAST_PAGE].id : arrPages[iCurrPageIndex-1].id;
		$.mobile.changePage("#" + strPrevPage, { transition: 'flow', reverse: true });
	});


	// always show popup text on hand gesture click
	$(".img-gesture").on("click.showPopup", function () {
		$(".ui-page-active .img-gesture-popup").attr("style", "display: table;");
		$(".ui-page-active .img-gesture-popup").animate({ opacity: 0.66 }, "slow", "easeInOutCubic");
	});
	// only show popup text on hand gesture hover if not animating
	$(".img-gesture").on("mouseover.showPopup", function () {
		// show popup only if it is not already visible
		if ( $(".ui-page-active .img-gesture-popup").css("display") === "none" ) {
			$(".ui-page-active .img-gesture-popup").attr("style", "display: table;");
			$(".ui-page-active .img-gesture-popup").animate({ opacity: 0.66 }, "slow", "easeInOutCubic");
		}
	});
	$(".img-gesture").on("mouseout.hidePopup", function () {
		// only fadeout popup gesture if not animating. it's okay for popup
		// gesture to always show up on mouseover or click but it should only
		// disappear on mouseout (this fixes disappearing even on mouseover)
		$(".ui-page-active .img-gesture-popup").animate({ opacity: 0 }, "slow", "easeInOutCubic");

		// display: none on img-gesture-popup of all pages when mouseout
		// to prevent toolbar toggle when mouse click on popup text
		// (after a slight delay for better UI/UX)
		recurseCheck();
	});
	

	// recursively call to display: none until mouse not over img-gesture-popup
	// not really recursion but I just want to loop a check to make sure that
	// the img-gesture-pop doesn't get display: none abruptly (better UI/UX)
	var recurseCheck = function () {
		window.setTimeout( function () {
			// base case
			if ( $(".ui-page-active .img-gesture-popup").css("opacity") === "0" ) {
				$(".img-gesture-popup").attr("style", "display: none;");
				return;
			}
			// recursive case
			return recurseCheck();
		}, 1000);
	};

	
	// fade in the "click me" text a few seconds after this js has loaded
	window.setTimeout(function () {
		$(".ui-page-active .img-gesture p").transition({ opacity: 0.66, }, "slow", "easeInOutCubic");
	}, 1500);
	// when clicking on the gesture, make sure to fade out the "click me" helper
	// text as user will already know what clicking on the hand pointer does
	$(".img-gesture").on("click.clickme", function () {
		if ( $(".ui-page-active .img-gesture p").css("opacity") !== "0" ) {
			$(".ui-page-active .img-gesture p").transition({ opacity: 0, }, "slow", "easeInOutCubic");
		}
	});


	



// ============================================================================
// ============================= Helper Functions =============================
// =================== ( can be commented out for release ) ===================
// ============================================================================
	// update sections and re-adjust viewport for any orientation and
	// pagecontainer changes
	function updateView() {
		// display viewport information on page changes
		displayViewport();
		// update img sizes to fit viewport orientation
		imgSize();
	}

	// display viewport in a paragraph element appended to main's section
	function displayViewport() {
		// update if viewport is hortizontal or vertical
		g_bLandscape = ( window.innerWidth > window.innerHeight )? true : false;
		// display window sizes for different viewports somewhere
		// printViewport();
	}

	function printViewport() {
		var strViewport = "viewport (w, h): (" + window.innerWidth + "," + window.innerHeight + ") & horizontal: " + g_bLandscape;
		if ( $(".ui-page-active #displayviewport").length === 0 ) {
			$(".ui-page-active section").append("<p id='displayviewport' style='font-size: xx-large; padding: 10%;'>" + strViewport + "</p>");
		} else {
			$(".ui-page-active #displayviewport")[0].innerHTML = strViewport;
		}
	}

	// fix img size to perfectly fit landscape and portrait orientations
	function imgSize() {
		// switch landscape and portrait classes if orientation changes
		if ( g_bLandscape ) {
			$("img.portrait").removeClass("portrait").addClass("landscape");
		} else {
			$("img.landscape").removeClass("landscape").addClass("portrait");
		}
	}

	// show or unshow the toolbars (header & footer)
	function showToolbar(bShow) {
		if ( bShow ) {
			// display:table all toolbars since toolbars are actually shown on
			// page container change regardless of show/hide setting but when
			// we want to the user to see the toolbar come into view, only show
			// it for the active page
			$("[data-position='fixed']").attr("style", "display: table !important;");
			$(".ui-page-active [data-position='fixed']").toolbar("show");
		} else {
			// display:none all toolbars since toolbars are actually shown on
			// page container change regardless of show/hide setting but when
			// we want to the user to see the toolbar leave from view, only show
			// it for the active page... the 300ms delay assures that the toolbar
			// has completely left view before we set display:none (UI/UX)
			window.setTimeout(function() {
				$("[data-position='fixed']").attr("style", "display:none !important;");
			}, 300);
			$(".ui-page-active [data-position='fixed']").toolbar("hide");
		}
	}

	// handle toolbar toggle animation so users can only toggle toolbar if
	// not already animating
	function toggleToolbar() {
		// toggle toolbar show/hide only if not already animating
		if ( !g_bToolbarAnimating ) {
			// since we are animating, set flag that animation will finish
			// in a little bit
			g_bToolbarAnimating = true;
			window.setTimeout(function() { g_bToolbarAnimating = false; }, 300);
			
			// show toolbars if they aren't already visible 
			if ( !g_bToolbarVisible ) {
				g_bToolbarVisible = true;
				showToolbar(g_bToolbarVisible);
			// otherwise, hide toolbars if they are visible (with a slight delay)
			} else {
				g_bToolbarVisible = false;
				showToolbar(g_bToolbarVisible);
			}
		}
	}

}( window.afable = window.afable || {}, jQuery ));
