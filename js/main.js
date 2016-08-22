var ae = {}; //closure namespace to avoid collisions with other js functions and keep variables out of the global window namespace

(function () {
	/**
	 * document constants
	 */
	var PAGE = 0;
	
	/**
	 * jquery ready function
	 */
	$("document").ready(function () {
		console.log("jquery is a go-go.");
	});

	/**
	 * init function after document loaded
	 */
	ae.init = function () {
		console.log("rest of document loaded.");
		
		/**
		 * hide all pages that are not active. hide all main.home section/aside info pages that are not active. 
		 */
		$("main:not(.active)").fadeOut("slow");
		$("main.home > section:not(.active), main.home > aside:not(.active)").fadeOut("slow");

		/**
		 * set buttons to active state when clicked. load the correct page after button clicked.
		 */
		$("nav.top li").on("click.active", function () {
			var pageNext = $(this).attr("class").split(" ")[PAGE];
			var pageCurr = $("main.active").attr("class").split(" ")[PAGE];

			if (pageNext !== pageCurr) {
				$("nav.top li").removeClass("active");
				$(this).addClass("active");

				$("main." + pageCurr + ", footer").removeClass("active").fadeOut("fast", function () {
					$("main." + pageNext + ", footer").addClass("active").fadeIn("fast");
				});
			}
		});
		
		/**
		 * nav.map clicks will toggle item aside info opacity. clicks on nav.map aside when visible will load more detailed info below about target clicked. moving out of nav.map will hide info opacity.
		 */
		$("nav.map").on("click.revealAside", function (event) {
			// if we click on nav.map aside while it's visible then we want to view more info
			if (event.target.nodeName === "ASIDE" && Number(event.target.style.opacity) === 1) {
				// for now, get "date[\d+]" string and increment the digit to load next info page 
				var infoCurr = $("main .active")[PAGE].className.split(" ")[PAGE];
				var infoNext = infoCurr.replace(/[\d+]/i, function (n) { return (n%3)+1; });
				$("main ." + infoCurr).removeClass("active").fadeOut("fast", function () {
					$("main ." + infoNext).addClass("active").fadeIn("fast");
				});
			}
			// nav.map clicks toggle nav.map aside opacity
			(Number($("nav.map aside").css("opacity")) === 0) ? $("nav.map aside").fadeTo("fast", 1) : $("nav.map aside").fadeTo("slow", 0);
		});
		// leaving nav.map sets nav.map aside opacity to 0
		$("nav.map").on("mouseleave.hideAside", function () {
			$("nav.map aside").fadeTo("slow", 0);
		});
	}
	


	window.onload = ae.init;
})();
