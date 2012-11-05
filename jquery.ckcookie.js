// ckCookie v1.0
// Written on jQuery 1.8.0
// Written by Dustin Newbold

;(function($) {
	var ckCookie = function() {};

	ckCookie.prototype.setCookie = function(get, set, expires) {
		var today = new Date(),
			expiresDate = null;

		if(set === null) {
			expiresDate = new Date(today.getTime() - 100000); // Expire long time ago
			document.cookie = get + '=' +
				';expires=' + expiresDate.toGMTString();

		} else if(expires !== undefined) {
			expires = expires * 1000 * 60 * 60 * 24; // per day
			expiresDate = new Date(today.getTime() + expires);

			document.cookie = get + '=' + escape(set) +
				';expires=' + expiresDate.toGMTString();

		} else {
			document.cookie = get + '=' + escape(set);
		}
	};

	ckCookie.prototype.init = function() {
		var ckc = this;

		ckc.cookies = {};
		$.each(document.cookie.split(';'), function() {
			var variable = "",
				value = "",
				both = "";

			both = $.trim(this.toString());
			variable = both.split('=')[0];
			value = both.split('=')[1];
			ckc.cookies[variable] = value;
		});
	};

	$.fn.ckcookie = function(get, set, expires) {
		var cookie = new ckCookie();
		cookie.init();

		if(set !== undefined) {
			cookie.setCookie(get, set, expires);
			cookie.init();
			return cookie;
		} else if(get !== undefined) {
			return cookie.cookies[get];
		} else {
			return cookie;
		}
	};
})(jQuery);