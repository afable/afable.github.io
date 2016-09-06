(function() {


	// bind an event handler to the "pagecreate" event for all
	// "data-role='page'" elements
	var iPageCounter = 0;
	$(document).on("pagecreate", "[data-role='page']", function () {

		// prepend header and append footer divs to all newly created pages
		// that are not the first page
		++iPageCounter;
		if ( $(this)[0].getAttribute("id") !== "afable" ) {
			console.log("cloning header & footer for " + $(this)[0].getAttribute("id"));

			// prepend header clone from #afable
			$("#afable > div.header").clone(true).prependTo(this);

			// append footer clone from #afable
			$("#afable > div.footer").clone(true).appendTo(this);
		}
		console.log(iPageCounter + " pages created...");
	});


	// change .ui-btn-active manually as it does not persist after transitions
	// in jquerymobile-1.4.5 with jquery-2.2.4
	$(document).on("pagecontainerchange", function() {
		// remove any .ui-btn-active that exists in current page
		var current = "#" + $(".ui-page-active").prop("id");
		$(current + " a.ui-btn-active").removeClass("ui-btn-active");

		// add .ui-btn-active to the current active page
		$(current + " a[href='" + current + "']").addClass("ui-btn-active");

		console.log("current page is " + current);
	});


	// capture left swipes on header, main, and footer
	// left swipes move to next page in sequience
	$(document).on("swipeleft", "[data-role='header']", function() {
		console.log("swiped left on header");
		var current = $(".ui-page-active").prop("id");
		
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



	// document and window ready functions
	// $(document).ready(function() { console.log("$(document).ready...") });
	// window.onload = function() { console.log("window.onload..."); };
	
})();