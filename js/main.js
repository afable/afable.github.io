(function() {

	// bind an event handler to the "pagecreate" event for all "data-role='page'
	// elements
	var iPageCounter = 0;
	$(document).delegate("[data-role='page']", "pagecreate", function () {

		// append and prepend header and footer divs to all newly created pages
		// that are not #page-1
		++iPageCounter;
		if ( $(this)[0].getAttribute("id") !== "page-1" ) {
			// prepend header clone from #page-1
			$("#page-1 > div.header").clone().prependTo(this);
			console.log("cloning header for page " + iPageCounter);

			// prepend footer clone from #page-1
			$("#page-1 > div.footer").clone().appendTo(this);
			console.log("cloning footer for page" + iPageCounter);
		}
		console.log("creating page " + iPageCounter);
	});

	$(document).ready(function() {
		console.log("$(document).ready...")
	});

	window.onload = function() {
		console.log("window.onload...");
	};
	
})();