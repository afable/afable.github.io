// document and window ready functions (test which loads first)
window.onload = function() { console.log("LOADED window.onload..."); };
(function() { console.log("LOADED IIFE.."); })();
$(document).ready(function() { console.log("LOADED $(document).ready...") });


// encapsulate js so there are no naming conflicts
(function($) {


	// initialize page data for all pages
	var arrPages = [];
	arrPages.push( {id: "afable", data: "<p>Paragraph element for #afable.</p>"} );
	arrPages.push( {id: "hamtarro", data: "<p>Because he likes cheese.</p>"} );
	arrPages.push( {id: "slamsorrow", data: "<p>Young HARLEM.</p>"} );


	// create nav links first so they can be inserted into each page
	var strNav = "";
	var arrStrTransitions = ["fade", "flip", "pop", "flow", "slidefade", "slideup", "slidedown"];
	for ( var i = 0; i < arrPages.length; ++i ) {
		strNav += `<a href="#` + arrPages[i].id + `" data-role="button" data-transition="` + arrStrTransitions[i % arrStrTransitions.length] + `" class="nav-button ui-link ui-btn ui-shadow ui-corner-all" role="button">` + arrPages[i].id + `</a>`
	}

	// create all pages dynamically
	for ( var i = 0; i < arrPages.length; ++i ) {
		// header (from previously created strNav), main, and footer
		var newPage = $(`
			<div data-role=page id=` + arrPages[i].id + ` class=ui-page>
				<div data-role="header" class="header ui-header ui-header-fullscreen ui-header-fixed slidedown ui-bar-inherit" data-position="fixed" data-fullscreen="true" data-tap-toggle="true" role="banner"> 
					<nav id="nav">` + strNav + `</nav>
				</div><!-- /header -->
				<div role="main" class="main ui-content">
					<section style="background-color: #fef; height: 111px;" class="content">
						<h3>Some Title</h3>
					</section>
				</div><!-- /main -->
				<div data-role="footer" class="footer ui-footer ui-footer-fullscreen ui-bar-inherit ui-footer-fixed slideup" data-position="fixed" data-fullscreen="true" data-tap-toggle="true">
					<footer> 
						<p>Written and coded by <a href="#">afable</a></p>
					</footer>
				</div><!-- /footer -->
			</div>
		`);

		// prepend it to the page container
		// newPage.prependTo( $.mobile.pageContainer );
		newPage.prependTo( $("body") );
		console.log("NEW PAGES CREATED");

		
	}


	// // bind an event handler to the "pagecreate" event for all
	// // "data-role='page'" elements
	// var iPageCounter = 0;
	// $(document).on("pagecreate", "[data-role='page']", function () {

	// 	// prepend header and append footer divs to all newly created pages
	// 	// that are not the first page
	// 	++iPageCounter;
	// 	if ( $(this)[0].getAttribute("id") !== "afable" ) {
	// 		console.log("cloning header & footer for " + $(this)[0].getAttribute("id"));

	// 		// prepend header clone from #afable
	// 		$("#afable > div.header").clone(true).prependTo(this);

	// 		// append footer clone from #afable
	// 		$("#afable > div.footer").clone(true).appendTo(this);
	// 	}
	// 	console.log(iPageCounter + " pages created...");
	// });


	// change .ui-btn-active manually as it does not persist after transitions
	// in jquerymobile-1.4.5 with jquery-2.2.4
	$(document).on("pagecontainerchange", function() {
		// remove any .ui-btn-active that exists in current page
		var currPage = "#" + $(".ui-page-active").prop("id");
		$(currPage + " a.ui-btn-active").removeClass("ui-btn-active");

		// add .ui-btn-active to the current active page
		$(currPage + " a[href='" + currPage + "']").addClass("ui-btn-active");

		console.log("currPage page is " + currPage);
	});


	// capture left swipes on header, main, and footer
	// left swipes move to next page in sequience
	$(document).on("swipeleft", "[data-role='header']", function() {
		console.log("swiped left on header");
		var currPage = $(".ui-page-active").prop("id");
		
	});
	$(document).on("swipeleft", "[role='main']", function() {
		console.log("swiped left on main");
	});
	$(document).on("swipeleft", "[data-role='footer']", function() {
		console.log("swiped left on footer");
	});


	// capture right swipes on header, main, and footer
	// right swipes move to previous page in sequence
	$(document).on("swiperight", "[data-role='header']", function() {
		console.log("swiped right on header");
	});
	$(document).on("swiperight", "[role='main']", function() {
		console.log("swiped right on main");
	});
	$(document).on("swiperight", "[data-role='footer']", function() {
		console.log("swiped right on footer");
	});


})(jQuery);