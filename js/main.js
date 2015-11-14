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
		 * hide all pages that are not the active page
		 */
		$("main:not(.active)").fadeOut("slow");

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
		 * nav.map clicks will toggle item aside info opacity. moving out of nav.map
		 * will hide info opacity.
		 */
		$("nav.map").on("click.revealAside", function () {
			(Number($("nav.map aside").css("opacity")) === 0) ? $("nav.map aside").fadeTo("slow", 1) : $("nav.map aside").fadeTo("slow", 0);
		});

		$("nav.map").on("mouseleave.hideAside", function () {
			$("nav.map aside").fadeTo("slow", 0);
		});
	}










	window.onload = ae.init;
})();
