/* main.js: afable 2016 */

// ============================================================================
// ============================= Global Variables =============================
// ============================================================================
var g_bLandscape = true;

// document and window ready functions (test which loads first)
window.onload = function() { console.log("LOADED window.onload..."); };
(function() { console.log("LOADED IIFE.."); })();
$(document).ready(function() { console.log("LOADED $(document).ready...") });


// ============================================================================
// ========================== Main Javascript Routine =========================
// ============ ( encapsulate js so there are no naming conflicts ) ===========
// ============================================================================
(function($) {

	
	// get if this viewport is hortizontal or vertical
	g_bLandscape = ( window.innerWidth > window.innerHeight )? true : false;


	// initialize page data for all pages
	var arrPages = [];
	arrPages.push( {id: "afable", data: "<p>Paragraph element for #afable.</p>"} );
	arrPages.push( {id: "fathom", data: "<p>Because he likes cheese.</p>"} );
	arrPages.push( {id: "snowballin", data: "<p>Young HARLEM.</p>"} );
	arrPages.push( {id: "prodCons", data: "<p>HARLEM.</p>"} );
	arrPages.push( {id: "healthytweets", data: "<p>sizlzling turkey on a stikck.</p>"} );
	arrPages.push( {id: "squid", data: "<p>mayheM makers.</p>"} );
	arrPages.push( {id: "firstWorldCrawler", data: "<p>it means town.</p>"} );


	// create pages dynamically
	// create nav links first so they can be inserted into each page
	var strNav = "";
	var arrStrTransitions = ["fade", "flip", "pop", "flow", "slidefade", "slideup", "slidedown"];
	for ( var i = 0; i < arrPages.length; ++i ) {
		strNav += `<a href="#` + arrPages[i].id + `" data-role="button" data-transition="` + arrStrTransitions[i % arrStrTransitions.length] + `" class="nav-button ui-link ui-btn ui-shadow ui-corner-all" role="button"><i class="fa fa-twitter fa-2x"></i></a>`
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
					<table class="polaroid-container"><tr>
					<td><i class="fa fa-arrow-left fa-3x"></i></td>
					<td><section class="polaroid">
						<div class="polaroid-img-container">
							<a href="http://www.google.com" target="_blank">
								<img src="/img/snowballin.png" class="unselectable ` + strOrientation + `" style="opacity: 0" alt="snowballin">
							</a>
						</div>
						<div class="polaroid-p-container">
							<p>Something Obtrustive about OrcaJam, 2016... Javascript.</p>
						</div>
					</section></td>
					<td><i class="fa fa-arrow-right fa-3x"></i></td>
					</tr>
					</table>
				</div><!-- /main -->
				<div data-role="footer" class="footer ui-footer ui-footer-fullscreen ui-bar-inherit ui-footer-fixed slideup center" data-position="fixed" data-fullscreen="true" data-tap-toggle="true">
					<footer> 
						<p>Created by <a href="#afable">afable</a> <a href="https://github.com/afable" target="_blank" title="GitHub"><i class="fa fa-github fa-lg"></i></a> <a href="https://twitter.com/superafable" target="_blank" title="Twitter"><i class="fa fa-twitter fa-lg"></i></a> <a href="https://www.linkedin.com/in/erik-afable-176a3231" target="_blank" title="LinkedIn"><i class="fa fa-linkedin fa-lg"></i></a> <a href="https://codepen.io/afable/" target="_blank" title="CodePen"><i class="fa fa-codepen fa-lg"></i></a> <a href="https://www.freecodecamp.com/afable" target="_blank" title="Free Code Camp"><i class="fa fa-leaf fa-lg"></i></a> <a href="https://www.hackerrank.com/afable" target="_blank"><i class="fa fa-hashtag fa-lg" title="HackerRank"></i></a></p>
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
		// stay on current page if we are on the last page
		var nextPage = ( arrPages[iPage+1] === undefined )? currPage : arrPages[iPage+1].id;
		$.mobile.changePage("#" + nextPage, { transition: 'flow', reverse: false });
	});

	// capture right swipes on header, main, and footer
	// right swipes move to previous page in sequence
	$(document).on("swiperight", function() {
		// get current page and transition to previous page
		var currPage = $(".ui-page-active").prop("id");
		var iPage = arrPages.findIndex(p => p.id === currPage);
		// stay on current page if we are on the first page
		var prevPage = ( arrPages[iPage-1] === undefined )? currPage : arrPages[iPage-1].id;
		$.mobile.changePage("#" + prevPage, { transition: 'flow', reverse: true });
	});

	// swipe right on left-arrow click
	$(".fa-arrow-left").on("click", function () {
		$(document).trigger("swiperight");
	});
	// change cursor and left-arrow colour on mouseover
	$(".fa-arrow-left").on("mouseover", function () {
		$(this).css("cursor", "pointer");
		$(".fa-arrow-left").addClass("left-arrow-hover");
	}).on("mouseout", function () {
		$(".fa-arrow-left").removeClass("left-arrow-hover");
	});

	// swipe left on right-arrow click
	$(".fa-arrow-right").on("click", function () {
		$(document).trigger("swipeleft");
	});
	// change cursor and right-arrow colour on mouseover
	$(".fa-arrow-right").on("mouseover", function () {
		$(this).css("cursor", "pointer");
		$(".fa-arrow-right").addClass("right-arrow-hover");
	}).on("mouseout", function () {
		$(".fa-arrow-right").removeClass("right-arrow-hover");
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