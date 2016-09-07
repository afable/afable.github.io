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
	arrPages.push( {id: "contraBand", data: "<p>HARLEM.</p>"} );
	arrPages.push( {id: "country", data: "<p>sizlzling turkey on a stikck.</p>"} );
	arrPages.push( {id: "ROAD", data: "<p>mayheM makers.</p>"} );
	arrPages.push( {id: "machi", data: "<p>it means town.</p>"} );


	// create pages dynamically
	// create nav links first so they can be inserted into each page
	var strNav = "";
	var arrStrTransitions = ["fade", "flip", "pop", "flow", "slidefade", "slideup", "slidedown"];
	for ( var i = 0; i < arrPages.length; ++i ) {
		strNav += `<a href="#` + arrPages[i].id + `" data-role="button" data-transition="` + arrStrTransitions[i % arrStrTransitions.length] + `" class="nav-button ui-link ui-btn ui-shadow ui-corner-all" role="button">` + arrPages[i].id + `</a>`
	}

	// now create the pages by prepending to body (#afable comes last so that
	// it is the first page element in body)
	for ( var i = arrPages.length-1; i >= 0; --i ) {
		// create header (from previously created strNav), main, and footer
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

		// prepend new page to the page container (manually used body since
		// page container isn't initialized yet at this point)
		newPage.prependTo( $("body") );
	}


	// change .ui-btn-active manually as it does not persist after transitions
	// in jquerymobile-1.4.5 with jquery-2.2.4
	$(document).on("pagecontainerchange", function() {
		// remove any .ui-btn-active that exists in current page
		var currPage = "#" + $(".ui-page-active").prop("id");
		$(currPage + " a.ui-btn-active").removeClass("ui-btn-active");

		// add .ui-btn-active to the current active page
		$(currPage + " a[href='" + currPage + "']").addClass("ui-btn-active");
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


})(jQuery);