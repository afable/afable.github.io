var hdr;
// (function() {

	// bind an event handler to the "pagecreate" event for all "data-role='page'
	// elements
	var iPageCounter = 0;
	$(document).delegate("[data-role='page']", "pagecreate", function () {

		// append and prepend header and footer divs to all newly created pages
		// that are not #page-1
		++iPageCounter;
		if ( $(this)[0].getAttribute("id") !== "page-1" ) {
			hdr = $("#page-1 > div.header")[0].cloneNode(true);
			console.log($("this"))
			$(this).prepend(hdr);
			console.log("cloning header for page " + iPageCounter);
		}
		console.log("creating page " + iPageCounter);
	});

	$(document).ready(function() {
		console.log("$(document).ready...")
	});

	window.onload = function() {
		console.log("window.onload...");
	};
	
// })();