/*global $, jQuery*/
/*jslint plusplus: true*/

/*!
* jQuery Feedback Me Plugin
* 
* File:			jquery.feedback_me.js
* Version:		0.5.6
* 
* Author:      Daniel Reznick
* Info:        https://github.com/vedmack/feedback_me 
* Contact:     vedmack@gmail.com
* Twitter:	   @danielreznick
* Q&A		   https://groups.google.com/forum/#!forum/daniels_code	
* 
* Copyright 2013 Daniel Reznick, all rights reserved.
* Copyright 2013 Licensed under the MIT License (just like jQuery itself)
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
*/

var fm = (function ($) {

	'use strict';

	var fm_options_arr = {},
		supportsTransitions = false;

	function getFmOptions(event, position) {
		var className,
			selector;
		if ($(event.target).closest(".feedback_trigger").length === 1) {
			className = $(event.target).closest(".feedback_trigger")[0].className;
		} else if ($(event.target).closest(".feedback_content").length === 1) {
			className = $(event.target).closest(".feedback_content")[0].className;
		} else {
			if (position === undefined) {
				position = 'left-top';
			}
			className = position;
		}

		if (className.indexOf('left-top') !== -1) {
			selector = 'left-top';
		} else if (className.indexOf('left-bottom') !== -1) {
			selector = 'left-bottom';
		} else if (className.indexOf('right-top') !== -1) {
			selector = 'right-top';
		} else if (className.indexOf('right-bottom') !== -1) {
			selector = 'right-bottom';
		}
		return fm_options_arr[selector];
	}

	function triggerAction(event, position) {

		var animation_show = {},
			animation_hide = {},
			$fm_trigger,
			$fm_content;

		animation_show.marginLeft = "+=380px";
		animation_hide.marginLeft = "-=380px";

		if (fm.getFmOptions(event, position).position.indexOf("right-") !== -1) {
			animation_show.marginRight = "+=380px";
			animation_hide.marginRight = "-=380px";
		}

		$fm_trigger = $(event.target).closest(".feedback_trigger");
		if ($fm_trigger.length === 1) {
			$fm_content = $fm_trigger.next();
		} else {
			$fm_content = $(event.target).closest(".feedback_content");
			$fm_trigger = $fm_content.prev();
		}
		if ($fm_content.length === 0 || $fm_trigger.length === 0) {
			if (position === undefined) {
				position = 'left-top';
			}
			$fm_content = $('.' + position).closest(".feedback_content");
			$fm_trigger = $fm_content.prev();
		}

		if ($fm_trigger.hasClass("feedback_trigger_closed")) {
			if (supportsTransitions === true) {
				$fm_trigger.removeClass("feedback_trigger_closed");
				$fm_content.removeClass("feedback_content_closed");
			} else {
				$fm_trigger.add($fm_content).animate(
					animation_show,
					150,
					function () {
						$fm_trigger.removeClass("feedback_trigger_closed");
						$fm_content.removeClass("feedback_content_closed");
					}
				);
			}
		} else {
			//first add the closed class so double (which will trigger closeFeedback function) click wont try to hide the form twice
			$fm_trigger.addClass("feedback_trigger_closed");
			$fm_content.addClass("feedback_content_closed");
			if (supportsTransitions === false) {
				$fm_trigger.add($fm_content).animate(
					animation_hide,
					150
				);
			}
		}
	}

	function closeFeedback(event) {

		if (($(".feedback_content").length === 1 && $(".feedback_content").hasClass("feedback_content_closed")) ||
				$(event.target).closest('.feedback_content').length === 1) {
			return;
		}

		var animation_hide = {},
			option;
		animation_hide.marginLeft = "-=380px";
		for (option in fm_options_arr) {
			if (fm_options_arr.hasOwnProperty(option)) {
				if (option.indexOf("right-") !== -1) {
					animation_hide.marginRight = "-=380px";
				}

				$(".feedback_trigger").addClass("feedback_trigger_closed");
				$(".feedback_content").addClass("feedback_content_closed");
				if (supportsTransitions === false) {
					$(".feedback_trigger , .feedback_content").animate(
						animation_hide,
						150
					);
				}
			}
		}
	}
    
    */
	function validateFeedbackForm(event, position) {
		var	fm_options = getFmOptions(event, position);

		return true;
	}



	function applyCloseOnClickOutside() {
		var jqVersion = $().jquery.split(".");
		jqVersion[0] = +jqVersion[0];
		jqVersion[1] = +jqVersion[1];
		if (jqVersion[0] >= 1 && jqVersion[1] >= 7) {
			$(document).on("click", document, function (event) {
				closeFeedback(event);
			});
		} else {
			$(document).delegate("body", document, function (event) {
				closeFeedback(event);
			});
		}
	}


	function appendFeedbackToBody(fm_options) {
		var form_html = "",
			iframe_html = "",
			jQueryUIClasses1 = "",
			jQueryUIClasses2 = "",
			jQueryUIClasses3 = "",
			jQueryUIClasses4 = "",
			email_html = "",
			email_feedback_content_class = "",
			radio_button_list_html = "",
			radio_button_list_class = "",
			fm_class = " fm_clean ",
			jquery_class = "",
			bootstrap_class = "",
			bootstrap_btn = "",
			bootstrap_hero_unit = "",

			name_pattern = fm_options.name_pattern === "" ? "" : "pattern=\"" + fm_options.name_pattern + "\"",

			name_required = fm_options.name_required ? "required" : "",
			email_required = fm_options.email_required ? "required" : "",
			message_required = fm_options.message_required ? "required" : "",
			radio_button_list_required = fm_options.radio_button_list_required ? "required" : "",

			name_asterisk  = fm_options.name_required && fm_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "",
			email_asterisk  = fm_options.email_required && fm_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "",
			message_asterisk  = fm_options.message_required && fm_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "",
			radio_button_list_asterisk = fm_options.radio_button_list_required && fm_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "";

		if (fm_options.bootstrap === true) {
			bootstrap_class = " fm_bootstrap ";
			bootstrap_btn = " btn btn-primary ";
			bootstrap_hero_unit = " hero-unit ";

			fm_class = "";
			jquery_class = "";
		}

	
		if (fm_options.iframe_url !== undefined) {
			iframe_html = '<iframe name="feedback_me_frame" class="feedback_me_frame" frameborder="0" src="' + fm_options.iframe_url + '"></iframe>';
		}

		$('body').append('<div onclick="fm.stopPropagation(event);fm.triggerAction(event);" class="feedback_trigger feedback_trigger_closed ' + fm_options.position + jQueryUIClasses1 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
				+	'<span class="feedback_trigger_text">' + fm_options.trigger_label
				+	'</span></div>');

		$('body').append('<div class="feedback_content feedback_content_closed ' + fm_options.position + email_feedback_content_class + radio_button_list_class + jQueryUIClasses2 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
							+ '<div class="feedback_title ' + jQueryUIClasses1 + jQueryUIClasses3 + '">'
							+	'<span class="' + jQueryUIClasses4 + '">' + fm_options.title_label + '</span>'
							+ '</div>'
							+  form_html
							+  iframe_html
							+  fm_options.custom_html
						+ '</div>');



	}



	function slideBack(fm_options, $fm_trigger, $fm_content) {
		var animation_hide = {};
		animation_hide.marginLeft = "-=380px";
		if (fm_options.position.indexOf("right-") !== -1) {
			animation_hide.marginRight = "-=380px";
		}

		if (supportsTransitions === true) {
			$fm_trigger.addClass("feedback_trigger_closed");
			$fm_content.addClass("feedback_content_closed");
		} else {
			$fm_trigger.add($fm_content).animate(
				animation_hide,
				150,
				function () {
					$fm_trigger.addClass("feedback_trigger_closed");
				}
			);
		}
	}

	function detectTransitionSupport() {
		var be = document.body || document.documentElement,
			style = be.style,
			p = 'transition',
			vendors,
			i;
		if (typeof style[p] === 'string') {
			supportsTransitions = true;
			return;
		}

		vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
		p = p.charAt(0).toUpperCase() + p.substr(1);
		for (i = 0; i < vendors.length; i++) {
			if (typeof style[vendors[i] + p] === 'string') {
				supportsTransitions = true;
				return;
			}
		}
		supportsTransitions = false;
		return;
	}

	function init(options) {

		var default_options = {
			position : "left-top",
			close_on_click_outside: true,
			title_label : "Feedback",
			trigger_label : "Feedback",
			iframe_url : undefined
		},
			tmp_options;

		tmp_options = $.extend(default_options, options);

		fm_options_arr[tmp_options.position] = tmp_options;

		appendFeedbackToBody(tmp_options);

		detectTransitionSupport(tmp_options);
	}

    return {
		init : init,
		getFmOptions : getFmOptions,
		triggerAction : triggerAction,
	    stopPropagation : function() { console.log("propagation stopped :D"); }
    };

}(jQuery));


var revoprint = function (ort, name, labeltext, labelcolor) {
    fm_options = {
        title_label: "Bei Revoprint drucken",
        trigger_label: labeltext,
        show_form: false,
        position: "left-bottom",
        iframe_url: "http://stage.revoprint.de/#!upload/ort/" +ort+ "/copyshop/" + name
    };
    fm.init(fm_options);
    
}


