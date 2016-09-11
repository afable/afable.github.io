/* main.js: afable 2016 */

// ============================================================================
// ============================= Global Variables =============================
// ============================================================================
var g_bLandscape = true;

// document and window ready functions (test which loads first)
window.onload = function() { console.log("LOADED window.onload..."); };
(function() { console.log("LOADED IIFE.."); })();
$(document).ready(function() { console.log("LOADED $(document).ready...") });

// show viewport size on re-size (chrome no longer shows it by default)
window.addEventListener('resize', function(event){
  console.log("(vw, vh): (" + window.innerWidth + ", " + window.innerHeight + ")");
});


// ============================================================================
// ========================== Main Javascript Routine =========================
// ============ ( encapsulate js so there are no naming conflicts ) ===========
// ============================================================================
(function($) {

	
	// get if this viewport is hortizontal or vertical
	g_bLandscape = ( window.innerWidth > window.innerHeight )? true : false;


	// initialize page data for all pages
	var arrPages = [];
	arrPages.push( {id: "afable",
		icon: "fa-user",
		img: "jpg", 
		url: "https://www.linkedin.com/in/erik-afable-176a3231",
		title: "#afable, @superafable",
		caption: "<p>That's me. I like video games and the web.<br>Swipe for more.</p>"} );
	arrPages.push( {id: "fathom",
		icon: "fa-eye",
		img: "jpg",
		url: "http://fathomgame.github.io/",
		title: "Play the game",
		caption: "<p>A game I made with friends @OrcaJam2015 &mdash; a 48 hour game jam.</p>"} );
	arrPages.push( {id: "snowballin",
		icon: "fa-circle-o",
		img: "jpg",
		url: "http://snowballin.github.io/",
		title: "Play the game",
		caption: "<p>Helped some friends @OrcaJam2014.<br>You roll around. It's awesome.</p>"} );
	arrPages.push( {id: "shoal",
		icon: "fa-cloud",
		img: "png",
		url: "http://web.uvic.ca/~eafable/shoal/index.html",
		title: "View the website",
		caption: "<p>A school project to improve Shoal.<br>I made pamphlets.</p>"} );
	arrPages.push( {id: "healthyTweets",
		icon: "fa-heartbeat",
		img: "jpg",
		url: "http://afable.github.io/HealthyTweets/",
		title: "View the website",
		caption: "<p>Healthy tweets by state.<br>Texans tweet a lot about obesity.</p>"} );
	arrPages.push( {id: "firstGameEngine",
		icon: "fa-gamepad",
		img: "jpg",
		url: "https://www.youtube.com/watch?v=Wea4-eTkD1A",
		title: "Watch demo (source in description)",
		caption: "<p>My first game engine &mdash; a simple platformer.<br>Still took me a month.</p>"} );
	arrPages.push( {id: "simpleParticleSystem",
		icon: "fa-coffee",
		img: "jpg",
		url: "https://www.youtube.com/watch?v=DBiua8HTWSg",
		title: "Watch demo (source in description)",
		caption: "<p>A very simple particle system.<br>The teapot shoots bubbles.</p>"} );
	arrPages.push( {id: "simpleRayTracer",
		icon: "fa-arrows-alt",
		img: "jpg",
		url: "http://afable.github.io/images/projects/ray_trace.png",
		title: "View on GitHub",
		caption: "<p>A simple ray tracer.<br>You can't maths the tri-force.</p>"} );
	arrPages.push( {id: "firstWorldCrawler",
		icon: "fa-star-half-o",
		img: "jpg",
		url: "https://www.youtube.com/watch?v=Xcm5j0kkxO0",
		title: "Watch demo (source in description)",
		caption: "<p>A simple world crawler (+1 star hippie).</p>"} );


	// create pages dynamically
	// create nav links first so they can be inserted into each page
	var strNav = "";
	var arrStrTransitions = ["fade", "flip", "pop", "flow", "slidefade", "slideup", "slidedown"];
	for ( var i = 0; i < arrPages.length; ++i ) {
		strNav += `<a href="#` + arrPages[i].id + `" data-role="button" data-transition="` + arrStrTransitions[i % arrStrTransitions.length] + `" class="nav-button ui-link ui-btn ui-shadow ui-corner-all" role="button"><i class="fa ` + arrPages[i].icon + ` fa-2x"></i></a>`
	}

	// create each page's main section and base image sizes on whether viewport
	// is landscape vs portrait
	var strOrientation = ( g_bLandscape )? "landscape" : "portrait";

	// now create the pages by prepending to body (#afable comes last so that
	// it is the first page element in body)
	for ( var i = arrPages.length-1; i >= 0; --i ) {
		// create header (from previously created strNav), main, and footer
		var newPage = $(`
			<div data-role=page id=` + arrPages[i].id + ` class=ui-page>
			
				<div data-role="header" class="header ui-header ui-header-fullscreen ui-header-fixed slidedown ui-bar-inherit center" data-position="fixed" data-fullscreen="true" data-tap-toggle="true" role="banner"> 
					<nav class="nav">` + strNav + `</nav>
				</div><!-- /header -->
				
				<div role="main" class="main ui-content">
					<table class="polaroid-container">
						<tr>
							<td><i class="fa fa-arrow-left fa-3x"></i></td>
							<td><section class="polaroid rotate">
								<div class="polaroid-img-container">
									<a href="` + arrPages[i].url + `" target="_blank">
										<img src="/img/` + arrPages[i].id + `.` + arrPages[i].img + `" class="unselectable ` + strOrientation + `" style="opacity: 0" alt="` + arrPages[i].id + `" title="` + arrPages[i].title + `"></a>
								</div>
								<div class="polaroid-p-container">
									<p>` + arrPages[i].caption + `</p>
								</div>
							</section></td>
							<td><i class="fa fa-arrow-right fa-3x"></i></td>
						</tr>
					</table>
				</div><!-- /main -->

				<div data-role="footer" class="footer ui-footer ui-footer-fullscreen ui-bar-inherit ui-footer-fixed slideup center" data-position="fixed" data-fullscreen="true" data-tap-toggle="true">
					<footer> 
					
						<p>Created by <a href="#afable" title="#afable, @superafable">afable</a> <a href="https://github.com/afable" target="_blank" title="GitHub"><i class="fa fa-github fa-lg"></i></a> <a href="https://twitter.com/superafable" target="_blank" title="Twitter"><i class="fa fa-twitter fa-lg"></i></a> <a href="https://www.linkedin.com/in/erik-afable-176a3231" target="_blank" title="LinkedIn"><i class="fa fa-linkedin fa-lg"></i></a> <a href="https://codepen.io/afable/" target="_blank" title="CodePen"><i class="fa fa-codepen fa-lg"></i></a> <a href="https://www.freecodecamp.com/afable" target="_blank" title="Free Code Camp"><i class="fa fa-leaf fa-lg"></i></a> <a href="https://www.hackerrank.com/afable" target="_blank"><i class="fa fa-hashtag fa-lg" title="HackerRank"></i></a></p>
					</footer>
				</div><!-- /footer -->

			</div>
		`);

		// prepend new page to the page container (manually used body since
		// page container isn't initialized yet at this point)
		newPage.prependTo( $("body") );
	}


	// change .ui-btn-active manually as it does not persist after transitions
	// in jquerymobile-1.4.5 with jquery-2.2.4
	$(document).on("pagecontainerchange", function() {
		// remove any nav-active's that exist
		$(".nav a.nav-active").removeClass("nav-active");
		// make current page the nav-active page
		var currPage = "#" + $(".ui-page-active").prop("id");
		$(".ui-page-active a[href='" + currPage + "']").addClass("nav-active");

		// show any hidden ui after page transition (sometimes header and footer
		//  will be hidden after a transition)
    	if ( $(".ui-fixed-hidden").length ) {
			$(".ui-fixed-hidden").toolbar('show');
		}

		// remove any opacity of all imgs that have opacity (so far best selector
		// is to target all imgs with style attributes)
		$("section img").css("opacity", 0);
		// perform animation to easein main img into view
		$(".ui-page-active section img").animate({ opacity: 1 }, "slow", "easeInOutCubic");

		// update sections and re-adjust viewport
		updateView();
	});


	// update viewport display on orientation changes (resize event is more
	// secure/supported and worked better in this case
	// http://davidwalsh.name/orientation-change)
	$(window).on("resize", function() {
		// update sections and re-adjust viewport
		updateView();
	});


	// capture left swipes on header, main, and footer
	// left swipes move to next page in sequience
	$(document).on("swipeleft", function() {
		// get current page and transition to next page
		var currPage = $(".ui-page-active").prop("id");
		var iPage = arrPages.findIndex(p => p.id === currPage);
		// if we are on the last page, go to first page
		var FIRST_PAGE = 0;
		var nextPage = ( arrPages[iPage+1] === undefined )? arrPages[FIRST_PAGE].id : arrPages[iPage+1].id;
		$.mobile.changePage("#" + nextPage, { transition: 'flow', reverse: false });
	});

	// capture right swipes on header, main, and footer
	// right swipes move to previous page in sequence
	$(document).on("swiperight", function() {
		// get current page and transition to previous page
		var currPage = $(".ui-page-active").prop("id");
		var iPage = arrPages.findIndex(p => p.id === currPage);
		// if we are on the first page, go to the last page
		var LAST_PAGE = arrPages.length-1;
		var prevPage = ( arrPages[iPage-1] === undefined )? arrPages[LAST_PAGE].id : arrPages[iPage-1].id;
		$.mobile.changePage("#" + prevPage, { transition: 'flow', reverse: true });
	});

	// swipe right on left-arrow click
	$(".fa-arrow-left").on("click", function () {
		$(document).trigger("swiperight");
	});
	// change cursor and left-arrow colour on mouseover
	$(".fa-arrow-left").on("mouseover", function () {
		$(this).css("cursor", "pointer");
	});

	// swipe left on right-arrow click
	$(".fa-arrow-right").on("click", function () {
		$(document).trigger("swipeleft");
	});
	// change cursor and right-arrow colour on mouseover
	$(".fa-arrow-right").on("mouseover", function () {
		$(this).css("cursor", "pointer");
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


})(jQuery);