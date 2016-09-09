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
	arrPages.push( {id: "hamtarro", data: "<p>Because he likes cheese.</p>"} );
	arrPages.push( {id: "slamsorrow", data: "<p>Young HARLEM.</p>"} );
	arrPages.push( {id: "contraBand", data: "<p>HARLEM.</p>"} );
	arrPages.push( {id: "country", data: "<p>sizlzling turkey on a stikck.</p>"} );
	arrPages.push( {id: "ROAD", data: "<p>mayheM makers.</p>"} );
	arrPages.push( {id: "machi", data: "<p>it means town.</p>"} );
	arrPages.push( {id: "sound", data: "<p>scent of your hair.</p>"} );
	arrPages.push( {id: "realize", data: "<p>that you twirl in your fingers.</p>"} );


	// create pages dynamically
	// create nav links first so they can be inserted into each page
	var strNav = "";
	var arrStrTransitions = ["fade", "flip", "pop", "flow", "slidefade", "slideup", "slidedown"];
	for ( var i = 0; i < arrPages.length; ++i ) {
		strNav += `<a href="#` + arrPages[i].id + `" data-role="button" data-transition="` + arrStrTransitions[i % arrStrTransitions.length] + `" class="nav-button ui-link ui-btn ui-shadow ui-corner-all" role="button"><div class="nav-container"><img src="/img/snowballin_nav.png"></div></a>`
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
					<section class="polaroid">
						<div class="polaroid-container"><a href="https://github.com/afable" target="_blank"><img src="/img/snowballin.png" class="unselectable ` + strOrientation + `" style="opacity: 0" alt="snowballin" title="view on github"></a></div>
						<p>Something Obtrustive about OrcaJam, 2016... Javascript.</p>
					</section>
				</div><!-- /main -->
				<div data-role="footer" class="footer ui-footer ui-footer-fullscreen ui-bar-inherit ui-footer-fixed slideup center" data-position="fixed" data-fullscreen="true" data-tap-toggle="true">
					<footer> 
						<p>Written and coded by <a href="#afable">afable</a> <a href="https://github.com/afable" target="_blank" title="GitHub"><i class="fa fa-github fa-lg"></i></a> <a href="https://twitter.com/superafable" target="_blank" title="Twitter"><i class="fa fa-twitter fa-lg"></i></a> <a href="https://www.linkedin.com/in/erik-afable-176a3231" target="_blank" title="LinkedIn"><i class="fa fa-linkedin fa-lg"></i></a> <a href="https://codepen.io/afable/" target="_blank" title="CodePen"><i class="fa fa-codepen fa-lg"></i></a> <a href="https://www.freecodecamp.com/afable" target="_blank" title="Free Code Camp"><i class="fa fa-leaf fa-lg"></i></a> <a href="https://www.hackerrank.com/afable" target="_blank"><i class="fa fa-hashtag fa-lg" title="HackerRank"></i></a></p>
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
		// remove any .ui-btn-active that exists in current page
		$(".ui-page-active a.ui-btn-active").removeClass("ui-btn-active");

		// add .ui-btn-active to the current active page
		var currPage = "#" + $(".ui-page-active").prop("id");
		$(".ui-page-active a[href='" + currPage + "']").addClass("ui-btn-active");

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