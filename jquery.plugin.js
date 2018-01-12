/* 
# Start template jQuery plugin v.1.0.0
# Plugin logic building on $.data and $.extend jQuery
*/
(function($, window, undefined) {
	'use strict';
	var defaults = {
		/* default options */
		color: 'red',
		padding: '20px',
		background: 'white'
	};
	/* public methods */
	var methods = {
		init: function(object, setting) {
			$(object).data('options', $.extend({}, defaults, setting));
			var $this = $(object), data = $this.data('options');
			/* private jQuery function */
			$.fn.extend({
				createParagraph: function(text) {
					// in $.fn.jQuery function this == $(this)
					this.after($('<p/>', {'class': 'private', text: text, 'style': 'font-size: 12px; color: #999;'}));
					return this.siblings('.private');
					// always return [this] for support jquery chainability even if your function return nothing
					// example: $(selector).yourPlugin().css(...).append(...);
				}
				// other $.fn.jQuery function ...
			});
			/* START plugin code */
			$this.css({
				color: data.color,
				padding: data.padding,
				background: data.background
			});

			if ($this.siblings('.private').length === 0) {
				$this.createParagraph('This is result of private jQuery function').css('color', 'gray');
			}
			/* END plugin code */
		},
		set: function(object, key, value) {
			var $this = $(object), data = $this.data('options');
			if (key !== null && typeof key === 'object') {
				for (var prop in key) {
					data[prop] = key[prop];
				}
			} else {
				data[key] = value;
			}
			$this.data('options', data);
			methods.init($this, data);
		},
		get: function(object, key) {
			var data = $(object).data('options');
			return Object.getOwnPropertyDescriptor(data, key).value;
		},
		destroy: function(object) {
			var $this = $(object);
			$this.remove();
		}
	};
	/* `plugin` - this is your plugin name */
	$.fn.plugin = function(method, options, value) {
		if (typeof method === 'object' || !method) {
			return this.each(function() {
				methods.init(this, method);
			});
		} else if (typeof method === 'string') {
			switch (method.toLowerCase()) {
				case 'set': {
					return methods.set(this, options, value);
				}
				case 'get': {
					return methods.get(this, options);
				}
				case 'destroy': {
					return methods.destroy(this);
				}
			}
		}
	};
})(jQuery, window);
