/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mb.zoomify.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 15/05/14 23.24
 *  *****************************************************************************
 */

/*Browser detection patch*/
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
	jQuery.browser = {};
	jQuery.browser.mozilla = !1;
	jQuery.browser.webkit = !1;
	jQuery.browser.opera = !1;
	jQuery.browser.safari = !1;
	jQuery.browser.chrome = !1;
	jQuery.browser.msie = !1;
	jQuery.browser.ua = nAgt;
	jQuery.browser.name = navigator.appName;
	jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;
	if (-1 != (verOffset = nAgt.indexOf("Opera")))jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR")))jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE")))jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
		jQuery.browser.msie = !0;
		jQuery.browser.name = "Microsoft Internet Explorer";
		var start = nAgt.indexOf("rv:") + 3, end = start + 4;
		jQuery.browser.fullVersion = nAgt.substring(start, end)
	} else-1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
	-1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
	-1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
	jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10);
	isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10));
	jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt);
jQuery.browser.blackberry = /BlackBerry/i.test(nAgt);
jQuery.browser.ios = /iPhone|iPad|iPod/i.test(nAgt);
jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt);
jQuery.browser.windowsMobile = /IEMobile/i.test(nAgt);
jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;


/*
 * inclusion jquery.mousewheel
 * */

(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0;a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;void 0!==b.axis&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);void 0!==b.wheelDeltaY&&(g=b.wheelDeltaY/120);void 0!==b.wheelDeltaX&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]= d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,!1);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,!1);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);


//fgnass.github.com/spin.js#v2.0.1
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});

var ua = navigator.userAgent.toLowerCase();
var isiOs = ua.match(/(iphone|ipod|ipad)/);
var isAndroid = ua.match(/android/);

var hasTouch = jQuery.browser.mobile;
var events = {};
events.start = hasTouch ? "touchstart" : "mousedown";
events.move = hasTouch ? "touchmove" : "mousemove";
events.end = hasTouch ? "touchend" : "mouseup";
events.windowResize = hasTouch && isiOs ? "orientationchange" : "resize";

(function ($) {

	$.mbZoomify = {
		name    : "mb.mbZoomify",
		author  : "Matteo Bicocchi",
		version : "1.7.1",
		defaults: {
//			zoomSteps:[1, 1.5, 2, 2.5, 3, 3.5, 100],
			zoomSteps       : [1, 2, 3, 100],
			screen          : "self",
			startLevel      : 0,
			activateKeyboard: true,
			onStart         : function () {},
			onZoomIn        : function () {},
			onZoomOut       : function () {},
			onDrag          : function () {}
		},
		init    : function (options) {
			var opt = {};
			$.extend(opt, $.mbZoomify.defaults, options);

			return this.each(function () {

				var el = this;
				var $el = $(el);
				el.opt = opt;

				if (!$el.is("img"))
					return;

				var isVertical = $el.width() < $el.height();

				if (el.opt.screen == "self") {

					var zoomWrapper = $("<div/>").addClass("zoomWrapper").css({
						width   : $el.outerWidth(),
						height  : $el.outerHeight(),
						overflow: "hidden",
						position: $el.css("position") == "static" ? "relative" : $el.css("position"),
						display : $el.css("display") == "inline" ? "inline-block" : "block"
					}).unselectable();

					$el.wrap(zoomWrapper);

					$el.css({
						border    : "none",
						position  : "absolute",
						width     : $el.width(),
						height    : $el.height(),
						left      : "50%",
						top       : "50%",
						marginLeft: -($el.width() / 2),
						marginTop : -($el.height() / 2)
					});

					$el.removeAttr("onclick");
					$el.parent().showLoader(function () {
						$el.mbZoomify_run()
					});

				} else {

					var screen = $(el.opt.screen).addClass("zoomWrapper").unselectable();

					var $elClone = $("<img>").attr("src", $el.attr("src")).css({opacity: 0}).data("highres", $el.data("highres")).on("load", function () {

						if (isVertical) {
							$elClone.css({
								height  : "100%",
								width   : "auto",
								position: "absolute"
							})
						} else {

							$elClone.css({
								width   : "100%",
								height  : "auto",
								position: "absolute"
							})
						}

						$elClone.css({
							width     : $elClone.width(),
							height    : $elClone.height(),
							left      : "50%",
							top       : "50%",
							marginLeft: -($elClone.width() / 2),
							marginTop : -($elClone.height() / 2),
							opacity   : 0
						});
					});

					$elClone.get(0).opt = opt;
					screen.css({
						overflow: "hidden",
						position: screen.css("position") == "static" ? "relative" : screen.css("position")
					}).empty().append($elClone);

					screen.showLoader(function () {
						$elClone.fadeIn(1000, function () {
							$elClone.mbZoomify_run();
						});
					});

				}
			})
		},
		run     : function () {
			var el = this.get(0);
			var $el = $(el);
			var rnd = $.browser.msie ? "?_=" + new Date().getTime() : "";

			var oCss = $.browser.msie && $.browser.version < 9
					? {position: "absolute", width: "100%", height: "100%", top: 0, left: 0, opacity: 0, background: "#fff"}
					: {position: "absolute", width: "100%", height: "100%", top: 0, left: 0};

			var overlay = $("<div/>").addClass("zoomOverlay").css(oCss);

			var highRes = $("<img>");
			highRes.addClass("zoomifyOutScreen").css({
				position : "absolute",
				left     : -5000,
				top      : -5000,
				maxWidth : "none",
				maxHeight: "none"
			}).load(function () {

				el.maxWidth = $(this).width();
				el.maxHeight = $(this).height();

				$.mbZoomify.setMaxMin(el);

				$(window).on("resize", function () {
					$.mbZoomify.setMaxMin(el);
					$el.mbZoomify_zoom();
				});

				el.zoomLevel = 0;

				$el.trigger("originalReady", false);
				$el.attr("src", highRes.attr("src"));
				$el.parent().hideLoader();
				$el.parent().append(overlay);
				setTimeout(function () {
					$el.fadeTo(700, 1);
				}, 1000);

				var controls = $("<div/>").addClass("zoomControls");

				var zoomin = $("<div/>").addClass("zoomInControl").on(events.end, function () {
					if (!el.reachedMax)
						++el.zoomLevel;
					$el.mbZoomify_zoom();
				});

				var zoomout = $("<div/>").addClass("zoomOutControl").on(events.end, function () {
					if (!el.reachedMin)
						--el.zoomLevel;
					$el.mbZoomify_zoom();
				});

				controls.append(zoomin).append(zoomout);

				if (el.opt.isOverlay) {
					var zoomclose = $("<div/>").addClass("zoomCloseControl").on(events.end, function () {
						$el.mbZoomify_overlay("destroy");
					});

					controls.append(zoomclose);
				}

				zoomout.addClass("disabled");

				$el.parent().append(controls);

				$("body").unselectable();
				controls.unselectable();

				function mousePos(e) {

					function relativeMousePos() {
						/*
						 * Convert the click position to the original image size
						 */
						var mousex = e.pageX - $el.offset().left;
						var mousey = e.pageY - $el.offset().top;
						var x = (mousex * el.minWidth) / $el.width();
						var y = (mousey * el.minHeight) / $el.height();
						return {x: x, y: y};
					}

					el.mousex = relativeMousePos().x;
					el.mousey = relativeMousePos().y;

					var ml = parseFloat($el.css("margin-left"));
					var mt = parseFloat($el.css("margin-top"));
					el.origin = {
						startX: e.pageX,
						startY: e.pageY,
						x     : el.mousex,
						y     : el.mousey,
						ml    : ml,
						mt    : mt
					};
				}

				$(document).on(events.end, function (e) {
					el.candrag = false;
				});

				/*.on("keydown",function(e){

				 */
				/*
				 * altKey - alt/option key
				 * ctrlKey - control key
				 * shiftKey - shift key
				 * metaKey - control key on PCs, control and/or command key on Macs
				 */
				/*

				 if (e.metaKey && e.altKey){
				 overlay.addClass("zoomOut");
				 }else if (e.metaKey){
				 overlay.addClass("zoomIn");
				 }
				 }).on("keyup",function(e){
				 if (!e.metaKey && el.zoomLevel>0){
				 overlay.removeClass("zoomIn zoomOut");
				 overlay.addClass("zoomOut");
				 }
				 }).on("keypress.mbZoomify",function(e){

				 if(!el.opt.activateKeyboard)
				 return;

				 var code = (e.keyCode ? e.keyCode : e.which);
				 switch(code){

				 case 43:
				 el.zoomLevel++;
				 $el.mbZoomify_zoom();
				 break;

				 case 45:
				 el.zoomLevel--;
				 $el.mbZoomify_zoom();
				 break;
				 }
				 });*/

				overlay.on(events.start, function (e) {

					if (hasTouch) {
						e = e.originalEvent;
						e = e.touches[0];
					}

					mousePos(e);
					el.candrag = true;
					el.canZoom = true;

					overlay.addClass("move");
					$("body").unselectable();
					overlay.unselectable();

				}).on(events.move, function (e) {

					if (!el.candrag || e.metaKey)
						return;

					overlay.addClass("grab");


					el.canZoom = false;

					var event = e;
					if (hasTouch) {
						e = e.originalEvent;
						e = e.touches[0];
					}

					event.preventDefault();
					event.stopPropagation();

					var origin = {
						x: e.pageX,
						y: e.pageY
					};

					$el.mbZoomify_drag(origin);

				}).on(events.end, function (e) {
					overlay.removeClass("move grab");
					$("body").selectable();

					if (e.metaKey && e.altKey) {
						el.zoomLevel--;
						$el.mbZoomify_zoom(true);
					} else if (e.metaKey) {
						el.zoomLevel++;
						$el.mbZoomify_zoom(true);

					} else if (el.canZoom) {
						if (el.reachedMax)
							el.zoomLevel = 0;
						else
							el.zoomLevel++;

						$el.mbZoomify_zoom(true);
					}
				});

				if (!hasTouch)
					overlay.mousewheel(function (e, delta, deltaX, deltaY) {

						if (e.metaKey && !$.browser.mozilla) {
							overlay.addClass("zoomIn");
							mousePos(e);
							if (deltaY > 0.3 && !el.zooming) {
								el.zooming = true;
								el.zoomLevel = el.opt.zoomSteps.length - 1;
								$el.mbZoomify_zoom(true);
							} else if (deltaY < -0.3 && !el.zooming) {
								overlay.addClass("zoomOut");
								el.zooming = true;
								el.zoomLevel = 0;
								$el.mbZoomify_zoom(true);
							} else if (deltaY > 0.2 && !el.zooming) {
								el.zooming = true;
								el.zoomLevel++;
								$el.mbZoomify_zoom(true);
							}
							else if (deltaY < -0.2 && !el.zooming) {
								el.zooming = true;
								overlay.addClass("zoomOut");
								el.zoomLevel--;
								$el.mbZoomify_zoom(true);
							} else if (deltaY < 0.1 && deltaY > -0.1) {
								overlay.removeClass("zoomOut");
								if (el.zooming) el.zooming = false;
							}
							e.stopPropagation();
							e.preventDefault();
						}
					});

				highRes.remove();

				if (el.opt.startLevel) {
					setTimeout(function () {
						el.zoomLevel = el.opt.startLevel;
						$el.mbZoomify_zoom();
					}, 1200);
				}

				overlay.addClass("zoomIn");


				if (typeof el.opt.onStart == "function")
					el.opt.onStart(el.origin);

			}).attr("src", $el.data("highres") ? $el.data("highres") + rnd : $el.data("highres") + rnd).appendTo("body");
		},

		zoom: function (manageOrigin) {

			var el = this.get(0);
			var $el = $(el);
			var screen = $el.parent();
			var overlay = screen.find(".zoomOverlay");
			var controls = screen.find(".zoomControls");

			overlay.removeClass("move grab");

			overlay.addClass("zoomIn");
			overlay.removeClass("zoomOut");

			if (!el.oldZoomLevel)
				el.oldZoomLevel = 0;

			if (typeof manageOrigin == "string") {
				el = $el.children("img").get(0);
				$el = $(el);

				if (!el)
					return;

				if (manageOrigin == "in")
					el.zoomLevel++;
				if (manageOrigin == "out")
					el.zoomLevel--;
				manageOrigin = false;
			}

			if (el.zoomLevel > 0) {
				/*
				 overlay.addClass("move");
				 overlay.removeClass("zoomIn");
				 */
				controls.find(".zoomOutControl").removeClass("disabled");
				controls.find(".zoomInControl").removeClass("disabled");

			} else {

				controls.find(".zoomInControl").removeClass("disabled");
				controls.find(".zoomOutControl").addClass("disabled");
			}

			if (el.zoomLevel > el.opt.zoomSteps.length - 1) {
				el.zoomLevel = el.opt.zoomSteps.length - 1;
				$(document).trigger("maxzoom", false);

				overlay.addClass("zoomOut");
				overlay.removeClass("zoomIn");
			}

			if (el.zoomLevel < 0) {
				el.zoomLevel = 0;

				overlay.addClass("zoomIn");
				overlay.removeClass("zoomOut");

				$(document).trigger("minzoom", false);
			}

			var w = $el.width();
			var h = $el.height();

			w = el.minWidth * el.opt.zoomSteps[el.zoomLevel];
			h = el.minHeight * el.opt.zoomSteps[el.zoomLevel];

			if (w > el.maxWidth || h > el.maxHeight) {
				el.reachedMax = true;

				overlay.addClass("zoomOut");
				overlay.removeClass("zoomIn");

				w = el.maxWidth;
				h = el.maxHeight;
				//el.zoomLevel = el.opt.zoomSteps.length-1;
				$(document).trigger("maxzoom", false);

				controls.find(".zoomInControl").addClass("disabled");
			} else {
				el.reachedMax = false;
			}

			if (w <= el.minWidth || h <= el.minHeight) {
				w = el.minWidth;
				h = el.minHeight;
				el.zoomLevel = 0;
				el.reachedMin = true;

				overlay.addClass("zoomIn");
				overlay.removeClass("zoomOut");

				controls.find(".zoomOutControl").addClass("disabled");

			} else {
				el.reachedMin = false;
			}

			var ml = w / 2;
			var mt = h / 2;

			if (manageOrigin && el.zoomLevel > 0) {

				var ratio = w / el.minWidth;

				var mx = el.origin.x * ratio;
				var my = el.origin.y * ratio;

				ml = ml + (mx - ml);
				mt = mt + (my - mt);


				if (ml < overlay.width() / 2) {
					ml = (w / 2) - ((w - overlay.width()) / 2);
				}
				if (ml + overlay.width() / 2 > w) {
					ml = (w / 2) + ((w - overlay.width()) / 2);
				}
				if (mt < overlay.height() / 2) {
					mt = (h / 2) - ((h - overlay.height()) / 2);
				}
				if (mt + overlay.height() / 2 > h) {
					mt = (h / 2) + ((h - overlay.height()) / 2);
				}
			}

			var callback = function () {
				if (el.oldZoomLevel < el.zoomLevel) {
					//zoomIn
					if (typeof el.opt.onZoomIn == "function")
						el.opt.onZoomIn(el.zoomLevel);
				}
				if (el.oldZoomLevel > el.zoomLevel) {
					//zoomOut
					if (typeof el.opt.onZoomOut == "function")
						el.opt.onZoomOut(el.zoomLevel);
				}
				el.oldZoomLevel = el.zoomLevel;
			};

			$el.mbZoomify_animate({width: w, height: h, marginLeft: -(ml), marginTop: -(mt)}, 800, false, callback);
//			$el.css({width: w, height: h, marginLeft: -(ml), marginTop: -(mt)}, 100, false, callback);
		},

		drag: function (origin) {
			var el = this.get(0);
			var $el = $(el);

			if (el.zoomLevel == 0)
				return;

			var diffx = origin.x - el.origin.startX;
			var diffy = origin.y - el.origin.startY;

			var w = $el.width();
			var h = $el.height();

			var ml = el.origin.ml + diffx;
			var mt = el.origin.mt + diffy;

			var screen = $el.parent();

			if (ml > -(screen.width() / 2)) {
				ml = -((w / 2) - ((w - screen.width()) / 2));
			}
			if (ml - (screen.width() / 2) < -w) {
				ml = -((w / 2) + ((w - screen.width()) / 2));
			}
			if (mt > -(screen.height() / 2)) {
				mt = -((h / 2) - ((h - screen.height()) / 2));
			}
			if (mt - screen.height() / 2 < -h) {
				mt = -((h / 2) + ((h - screen.height()) / 2));
			}

			if (typeof el.opt.onDrag == "function")
				el.opt.onDrag(el.origin);

			$el.css({marginLeft: ml, marginTop: mt});
		},

		setMaxMin: function (el) {

			var isVertical = el.maxWidth < el.maxHeight;
			var $el = $(el);

			if (!isVertical) {
				el.minWidth = $el.parents(".zoomWrapper").width();
				el.minHeight = (el.minWidth * el.maxHeight) / el.maxWidth;
			} else {
				el.minHeight = $el.parents(".zoomWrapper").height();
				el.minWidth = (el.minHeight * el.maxWidth) / el.maxHeight;
			}
		},

		destroy: function () {},

		animate: function (opt, duration, type, callback) {
			if (!opt) return;

			if (typeof duration == "function") {
				callback = duration;
			}
			if (typeof type == "function") {
				callback = type;
			}
			if (!duration)
				duration = 1000;

			if (!type)
				type = "cubic-bezier(0.65,0.03,0.36,0.72)";

			//http://cssglue.com/cubic
			//	ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)

			var el = this;

			if ($.browser.msie) {
				el.animate(opt, duration, callback);
				return;
			}

			var sfx = "";
			var transitionEnd = "TransitionEnd";
			if ($.browser.webkit || $.browser.opera) {
				sfx = "-webkit-";
				transitionEnd = "webkitTransitionEnd";
			} else if ($.browser.mozilla) {
				sfx = "-moz-";
				transitionEnd = "transitionend";
			}

			el.css(sfx + "transition-property", "all");
			el.css(sfx + "transition-duration", duration + "ms");
			el.css(sfx + "transition-timing-function", type);
			el.css(opt);

			var endTransition = function () {
				el.css(sfx + "transition", "");
				if (typeof callback == "function")
					callback();
				el.get(0).removeEventListener(transitionEnd, endTransition, true);
			};
			el.get(0).addEventListener(transitionEnd, endTransition, true);
		},

		overlay: function (opt) {
			var el = this.get(0);
			var $el = $(el);

			if (opt == "destroy") {
				$("#zoomScreenOver").fadeOut(500, function () {
					$(this).remove();
				});
				return;
			}

			var overlay = $("<div/>").attr("id", "zoomScreenOver").addClass("zoomScreenOver");
			overlay.css({position: "fixed", top: 0, left: 0, width: "100%", height: "100%"}).hide();
			var screen = $("<div/>").attr("id", "zoomScreen");
			if (hasTouch)
				screen.addClass("isTouch");
			screen.unselectable();

			$("body").append(overlay);
			overlay.append(screen);
			overlay.css({opacity: 0}).show();

			screen.css({position: "relative", margin: "auto", marginTop: ($(window).height() - screen.height()) / 2});

//			screen.css({position:"relative", top:"50%", left:"50%", marginLeft:-screen.width()/2, marginTop:-screen.height()/2});

			overlay.fadeTo(500, 1, function () {
				var options = {};
				$.extend(options, $.mbZoomify.defaults, opt, {screen: "#zoomScreen"});
				$el.mbZoomify(options);
				el.opt.isOverlay = true;

			});

			screen.on(events.end, function (e) {
				e.preventDefault();
			});

			screen.on(events.start, function (e) {
				e.preventDefault();
				$("body").unselectable();
			});

			overlay.on(events.end, function (e) {
				if ($(e.target).hasClass("zoomScreenOver"))
					$el.mbZoomify_overlay("destroy");
				$("body").selectable();
			})

		}
	};

	// require jquery.activity.js
	$.showLoader = function (fn) {
		$("#loader").remove(); // if loader still on page remove it
		var loader = $("<div/>").attr("id", "loader").css({position: "absolute", width: "100%", height: "100%", zIndex: 10000}).hide();
		$(this).append(loader);
		$('#loader').fadeIn(1000, function () {
			$('#loader').spin({color: 'rgb(255,255,255)'});
			if (typeof fn === "function")
				fn();

		});
	};

	$.hideLoader = function (fn) {
		var loader = $("#loader", $(this));
		$('#loader').fadeOut(1000, function () {

			if (typeof fn === "function")
				fn();
			$(this).remove()
		});
	};

	$.fn.unselectable = function () {
		this.each(function () {
			$(this).css({
				"-moz-user-select"   : "none",
				"-webkit-user-select": "none",
				"-ms-user-select"    : "none",
				"user-select"        : "none"
			}).attr("unselectable", "on");
		});
		return $(this);
	};

	$.fn.selectable = function () {
		this.each(function () {
			$(this).css({
				"-moz-user-select"   : "auto",
				"-webkit-user-select": "auto",
				"-ms-user-select"    : "auto",
				"user-select"        : "auto"
			}).attr("unselectable", "off");
		});
		return $(this);
	};

	/*SPINNER --------------------------------------------------------------------------*/

	var spinnerOpts = {
		lines : 14, // The number of lines to draw
		length: 7, // The length of each line
		width : 4, // The line thickness
		radius: 14, // The radius of the inner circle
		color : '#fff', // #rgb or #rrggbb
		speed : 1, // Rounds per second
		trail : 50, // Afterglow percentage
		shadow: true // Whether to render a shadow
	};

	$.fn.spin = function (opt) {
		this.each(function () {
			var $this = $(this),
					data = $this.data();

			if (data.spinner) {
				data.spinner.stop();
				delete data.spinner;
			}
			if (spinnerOpts !== false) {
				$.extend(spinnerOpts, opt);
				data.spinner = new Spinner(spinnerOpts).spin(this);
			}
		});
		return this;
	};

	//Public methods

	$.fn.mbZoomify = $.mbZoomify.init;
	$.fn.mbZoomify_run = $.mbZoomify.run;
	$.fn.mbZoomify_zoom = $.mbZoomify.zoom;
	$.fn.mbZoomify_drag = $.mbZoomify.drag;
	$.fn.mbZoomify_animate = $.mbZoomify.animate;
	$.fn.mbZoomify_overlay = $.mbZoomify.overlay;

	$.fn.showLoader = $.showLoader;
	$.fn.hideLoader = $.hideLoader;

})(jQuery);
