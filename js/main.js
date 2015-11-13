var ae = {}; //closure namespace to avoid collisions with other js functions and keep variables out of the global window namespace

(function () {
	$("document").ready(function () {
		console.log("jquery is a go-go.");
	});

	ae.init = function () {
		console.log("rest of document loaded.");

		/**
		 * set buttons to active state when clicked.
		 */
		$("nav.top li").on("click.active", function () {
			$("nav.top li").removeClass("active");
			$(this).addClass("active");
		});
		
		/**
		 * nav.map clicks will toggle item aside info opacity. moving out of nav.map
		 * will hide info opacity.
		 */
		$("nav.map").on("click.revealAside", function () {
			( Number($("nav.map aside").css("opacity")) === 0 ) ? $("nav.map aside").fadeTo("slow", 1) : $("nav.map aside").fadeTo("slow", 0); 
		});
		
		$("nav.map").on("mouseleave.hideAside", function () {
			$("nav.map aside").fadeTo("slow", 0);
		});
	}










	window.onload = ae.init;
})();
