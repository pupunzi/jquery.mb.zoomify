/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mb.zoomify.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
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
 *  last modified: 16/01/13 23.26
 *  *****************************************************************************
 */

/*******************************************************************************
 * inclusion jquery.mousewheel.js
 *
 *! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 */
(function(f){function c(a){var b=a||window.event,d=[].slice.call(arguments,1),e=0,c=0,g=0,a=f.event.fix(b);a.type="mousewheel";a.wheelDelta&&(e=a.wheelDelta/120);a.detail&&(e=-a.detail/3);g=e;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,c=-1*e);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(c=-1*b.wheelDeltaX/120);d.unshift(a,e,c,g);return f.event.handle.apply(this,d)}var d=["DOMMouseScroll","mousewheel"];f.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a= d.length;a;)this.addEventListener(d[--a],c,false);else this.onmousewheel=c},teardown:function(){if(this.removeEventListener)for(var a=d.length;a;)this.removeEventListener(d[--a],c,false);else this.onmousewheel=null}};f.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
/******************************************************************************
 * end inclusion
 */


/*******************************************************************************
 * inclusion spin.js
 *
 * NETEYE spin Plugin
 *
 * Copyright (c) 2010 NETEYE GmbH
 * Licensed under the MIT license
 *
 * Author: Felix Gnass [fgnass at neteye dot de]
 * Version: 1.1.0
 */
(function(y,s,k){function l(d,a){var b=s.createElement(d||"div"),c;for(c in a)b[c]=a[c];return b}function i(d,a,b){b&&!b.parentNode&&i(d,b);d.insertBefore(a,b||null);return d}function z(d,a,b,c){var e=["opacity",a,~~(100*d),b,c].join("-"),b=0.01+100*(b/c),c=Math.max(1-(1-d)/a*(100-b),d),f=o.substring(0,o.indexOf("Animation")).toLowerCase();t[e]||(u.insertRule("@"+(f&&"-"+f+"-"||"")+"keyframes "+e+"{0%{opacity:"+c+"}"+b+"%{opacity:"+d+"}"+(b+0.01)+"%{opacity:1}"+(b+a)%100+"%{opacity:"+d+"}100%{opacity:"+ c+"}}",0),t[e]=1);return e}function q(d,a){var b=d.style,c,e;if(b[a]!==k)return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(e=0;e<v.length;e++)if(c=v[e]+a,b[c]!==k)return c}function j(d,a){for(var b in a)d.style[q(d,b)||b]=a[b];return d}function A(d){for(var a=1;a<arguments.length;a++){var b=arguments[a],c;for(c in b)d[c]===k&&(d[c]=b[c])}return d}function w(d){for(var a={x:d.offsetLeft,y:d.offsetTop};d=d.offsetParent;)a.x+=d.offsetLeft,a.y+=d.offsetTop;return a}var v=["webkit","Moz","ms","O"],t= {},o,u=function(){var d=l("style");i(s.getElementsByTagName("head")[0],d);return d.sheet||d.styleSheet}(),r=function a(b){if(!this.spin)return new a(b);this.opts=A(b||{},a.defaults,B)},B=r.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:0.25,fps:20},p=r.prototype={spin:function(a){this.stop();var b=this,c=b.el=j(l(),{position:"relative"}),e,f;a&&(f=w(i(a,c,a.firstChild)),e=w(c),j(c,{left:(a.offsetWidth>>1)-e.x+f.x+"px",top:(a.offsetHeight>>1)-e.y+f.y+"px"}));c.setAttribute("aria-role", "progressbar");b.lines(c,b.opts);if(!o){var g=b.opts,m=0,x=g.fps,n=x/g.speed,h=(1-g.opacity)/(n*g.trail/100),k=n/g.lines;(function C(){m++;for(var a=g.lines;a;a--){var e=Math.max(1-(m+a*k)%n*h,g.opacity);b.opacity(c,g.lines-a,e,g)}b.timeout=b.el&&setTimeout(C,~~(1E3/x))})()}return b},stop:function(){var a=this.el;if(a)clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=k;return this}};p.lines=function(a,b){function c(a,c){return j(l(),{position:"absolute",width:b.length+b.width+ "px",height:b.width+"px",background:a,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*e)+"deg) translate("+b.radius+"px,0)",borderRadius:(b.width>>1)+"px"})}for(var e=0,f;e<b.lines;e++)f=j(l(),{position:"absolute",top:1+~(b.width/2)+"px",transform:"translate3d(0,0,0)",opacity:b.opacity,animation:o&&z(b.opacity,b.trail,e,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&i(f,j(c("#000","0 0 4px #000"),{top:"2px"})),i(a,i(f,c(b.color,"0 0 1px rgba(0,0,0,.1)")));return a};p.opacity= function(a,b,c){if(b<a.childNodes.length)a.childNodes[b].style.opacity=c};(function(){var a=j(l("group"),{behavior:"url(#default#VML)"});if(!q(a,"transform")&&a.adj){for(a=4;a--;)u.addRule(["group","roundrect","fill","stroke"][a],"behavior:url(#default#VML)");p.lines=function(b,a){function e(){return j(l("group",{coordsize:m+" "+m,coordorigin:-g+" "+-g}),{width:m,height:m})}function f(b,f,h){i(k,i(j(e(),{rotation:360/a.lines*b+"deg",left:~~f}),i(j(l("roundrect",{arcsize:1}),{width:g,height:a.width, left:a.radius,top:-a.width>>1,filter:h}),l("fill",{color:a.color,opacity:a.opacity}),l("stroke",{opacity:0}))))}var g=a.length+a.width,m=2*g,k=e(),n=~(a.length+a.radius+a.width)+"px",h;if(a.shadow)for(h=1;h<=a.lines;h++)f(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(h=1;h<=a.lines;h++)f(h);return i(j(b,{margin:n+" 0 0 "+n,zoom:1}),k)};p.opacity=function(a,c,e,f){var d;var b;a=a.firstChild;f=f.shadow&&f.lines||0;if(a&&c+f<a.childNodes.length&&(d=(b= (a=a.childNodes[c+f])&&a.firstChild,a=b)&&a.firstChild,a=d))a.opacity=e}}else o=q(a,"animation")})();y.Spinner=r})(window,document);

/******************************************************************************
 * end inclusion
 */

/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);


(function($){

	$.mbZoomify ={
		name:"mb.mbZoomify",
		author:"Matteo Bicocchi",
		version:"1.5",
		defaults:{
			zoomSteps:[1, 2, 3, 100],
			screen:"self",
			startLevel:0,
			activateKeyboard:true,
			onStart:function(){},
			onZoomIn:function(){},
			onZoomOut:function(){},
			onDrag:function(){}
		},
		init:function(options){
			var opt = {};
			$.extend(opt, $.mbZoomify.defaults,options);

			return this.each(function(){

				var el=this;
				var $el=$(el);
				el.opt = opt;

				if (!$el.is("img"))
					return;

				var isVertical=$el.width()<$el.height();

				if(el.opt.screen=="self"){

					var zoomWrapper=$("<div/>").addClass("zoomWrapper").css({
						width:$el.outerWidth(),
						height:$el.outerHeight(),
						overflow:"hidden",
						position:$el.css("position")=="static"?"relative":$el.css("position"),
						display:$el.css("display")=="inline"?"inline-block":"block"
					});

					$el.wrap(zoomWrapper);

					$el.css({
						border:"none",
						position:"absolute",
						width:$el.width(),
						height:$el.height(),
						left:"50%",
						top:"50%",
						marginLeft:-($el.width()/2),
						marginTop:-($el.height()/2)
					});

					$el.removeAttr("onclick");
					$el.parent().showLoader(function(){
						$el.mbZoomify_run()
					});
				}else{
					var screen = $(el.opt.screen).addClass("zoomWrapper");
					var $elClone=$("<img>").attr("src",$el.attr("src")).data("highres",$el.data("highres"));
					$elClone.get(0).opt=opt;
					screen.css({
						overflow:"hidden",
						position:screen.css("position")=="static"?"relative":screen.css("position")
					}).empty().append($elClone);
					if(isVertical){
						$elClone.css({
							height:"100%",
							width:"auto",
							position:"absolute"
						}).hide();
					}else{
						$elClone.css({
							width:"100%",
							height:"auto",
							position:"absolute"
						}).hide();
					}
					$elClone.css({
						width:$elClone.width(),
						height:$elClone.height(),
						left:"50%",
						top:"50%",
						marginLeft:-($elClone.width()/2),
						marginTop:-($elClone.height()/2)
					});

					screen.showLoader(function(){
						$elClone.fadeIn(1000,function(){
							$elClone.mbZoomify_run();
						});
					});
				}
			})
		},
		run:function(){
			var el=this.get(0);
			var $el=$(el);
			var rnd = $.browser.msie ? "?_=" + new Date().getTime() : "";

			var oCss=$.browser.msie && $.browser.version<9
					? {position:"absolute", width:"100%", height:"100%", top:0,left:0, opacity:0, background:"#fff"}
					: {position:"absolute", width:"100%", height:"100%", top:0,left:0};

			var overlay= $("<div/>").addClass("zoomOverlay").css(oCss);

			var highRes =$("<img>");
			highRes.addClass("zoomifyOutScreen").css({
				position:"absolute",
				left:-5000,
				top:-5000
			}).load(function(){

						el.minWidth=$el.width();
						el.minHeight=$el.height();
						el.maxWidth=$(this).width();
						el.maxHeight=$(this).height();
						el.zoomLevel=0;

						$el.trigger("originalReady",false);
						$el.attr("src", highRes.attr("src"));
						$el.parent().hideLoader();
						$el.parent().append(overlay);

						var controls = $("<div/>").addClass("zoomControls");
						var zoomin = $("<div/>").addClass("zoomInControl").bind("click",function(){
							el.zoomLevel++;
							$el.mbZoomify_zoom();
						});
						var zoomout = $("<div/>").addClass("zoomOutControl").bind("click",function(){
							el.zoomLevel--;
							$el.mbZoomify_zoom();
						});
						controls.append(zoomin).append(zoomout);
						zoomout.addClass("disabled");

						$el.parent().append(controls);

						$("body").unselectable();

						function mousePos(e){
							function relativeMousePos(){
								/*
								 * Convert the click position to the original image size
								 */
								var mousex=e.pageX - $el.offset().left;
								var mousey=e.pageY - $el.offset().top;
								var x = (mousex * el.minWidth)/$el.width();
								var y = (mousey * el.minHeight)/$el.height();
								return {x:x, y:y};
							}
							el.mousex = relativeMousePos().x;
							el.mousey = relativeMousePos().y;

							var ml= parseFloat($el.css("margin-left"));
							var mt= parseFloat($el.css("margin-top"));
							el.origin={startX:e.pageX,startY:e.pageY, x:el.mousex, y:el.mousey, ml:ml, mt:mt};
						}

						$(document).bind("mouseup",function(e){
							el.candrag=false;
						}).bind("keydown",function(e){

									/*
									 * altKey - alt/option key
									 * ctrlKey - control key
									 * shiftKey - shift key
									 * metaKey - control key on PCs, control and/or command key on Macs
									 */

									if (e.metaKey && e.altKey){
										overlay.addClass("zoomOut");
									}else if (e.metaKey){
										overlay.addClass("zoomIn");
									}
								}).bind("keyup",function(e){
									if (!e.metaKey && el.zoomLevel>0)
										overlay.removeClass("zoomIn zoomOut");
								}).bind("keypress.mbZoomify",function(e){

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
								});
						overlay.bind("mousedown",function(e){
							mousePos(e);
							el.candrag=true;
						}).bind("mousemove",function(e){

									if(!el.candrag || e.metaKey)
										return;

									var origin={
										x:e.pageX,
										y:e.pageY
									};
									$el.mbZoomify_drag(origin);

								}).bind("click",function(e){
									if (e.metaKey && e.altKey){
										el.zoomLevel--;
										$el.mbZoomify_zoom(true);
									}else if (e.metaKey){
										el.zoomLevel++;
										$el.mbZoomify_zoom(true);
									}else if(el.zoomLevel==0){
										el.zoomLevel++;
										$el.mbZoomify_zoom(true);
									}
								}).bind("dblclick",function(){

									if(el.zoomLevel==el.opt.zoomSteps.length-1){
										el.zoomLevel=0;
									}else{
										el.zoomLevel=el.opt.zoomSteps.length-1;
									}
									$el.mbZoomify_zoom(true);
								}).mousewheel(function(e, delta, deltaX, deltaY) {

									if(e.metaKey && !$.browser.mozilla){
										overlay.addClass("zoomIn");
										mousePos(e);
										if (deltaY >0.3 && !el.zooming){
											el.zooming=true;
											el.zoomLevel=el.opt.zoomSteps.length-1;
											$el.mbZoomify_zoom(true);
										}else if (deltaY < -0.3 && !el.zooming){
											overlay.addClass("zoomOut");
											el.zooming=true;
											el.zoomLevel=0;
											$el.mbZoomify_zoom(true);
										}else if (deltaY > 0.2 && !el.zooming){
											el.zooming=true;
											el.zoomLevel++;
											$el.mbZoomify_zoom(true);
										}
										else if (deltaY < -0.2 && !el.zooming){
											el.zooming=true;
											overlay.addClass("zoomOut");
											el.zoomLevel--;
											$el.mbZoomify_zoom(true);
										}else if(deltaY < 0.1 && deltaY > -0.1){
											overlay.removeClass("zoomOut");
											if (el.zooming) el.zooming=false;
										}
										e.stopPropagation();
										e.preventDefault();
									}
								});

						highRes.remove();

						if (el.opt.startLevel){
							setTimeout(function(){
								el.zoomLevel=el.opt.startLevel;
								$el.mbZoomify_zoom();
							},1200);
						}else{
							overlay.addClass("zoomIn");
						}

						if(typeof el.opt.onStart == "function")
							el.opt.onStart(el.origin);

					}).attr("src",$el.data("highres") ? $el.data("highres")+rnd : $el.data("highres")+rnd).appendTo("body");
		},

		zoom:function(manageOrigin){
			var el=this.get(0);
			var $el=$(el);
			var screen = $el.parent();
			var overlay=screen.find(".zoomOverlay");
			var controls= screen.find(".zoomControls");

			if(!el.oldZoomLevel)
				el.oldZoomLevel=0;

			if(typeof manageOrigin == "string"){
				el=$el.children("img").get(0);
				$el=$(el);

				if(!el)
					return;

				if(manageOrigin=="in")
					el.zoomLevel++;
				if(manageOrigin=="out")
					el.zoomLevel--;
				manageOrigin=false;
			}

			if(el.zoomLevel>0){
				overlay.addClass("move");
				overlay.removeClass("zoomIn");
				controls.find(".zoomOutControl").removeClass("disabled");
				controls.find(".zoomInControl").removeClass("disabled");
			}else{
				overlay.removeClass("move");
				overlay.removeClass("zoomOut");
				overlay.addClass("zoomIn");
				controls.find(".zoomInControl").removeClass("disabled");
				controls.find(".zoomOutControl").addClass("disabled");
			}

			if (el.zoomLevel>el.opt.zoomSteps.length-1){
				el.zoomLevel=el.opt.zoomSteps.length-1;
				$(document).trigger("maxzoom",false);
			}

			if (el.zoomLevel<0){
				el.zoomLevel=0;
				$(document).trigger("minzoom",false);
			}

			var w=$el.width();
			var h=$el.height();
			w=el.minWidth*el.opt.zoomSteps[el.zoomLevel];
			h=el.minHeight*el.opt.zoomSteps[el.zoomLevel];

			if(w > el.maxWidth || h > el.maxHeight){
				w=el.maxWidth;
				h=el.maxHeight;
				el.zoomLevel=el.opt.zoomSteps.length-1;
				controls.find(".zoomInControl").addClass("disabled");
			}

			if(w<= el.minWidth || h<= el.minHeight){
				w=el.minWidth;
				h=el.minHeight;
				el.zoomLevel=0;
				controls.find(".zoomOutControl").addClass("disabled");
			}

			var ml=w/2;
			var mt=h/2;

			if(manageOrigin && el.zoomLevel > 0){

				var ratio= w/el.minWidth ;

				var mx= el.origin.x * ratio;
				var my= el.origin.y * ratio;

				ml= ml + (mx-ml);
				mt= mt + (my-mt);


				if(ml < overlay.width()/2){
					ml= (w/2)-((w-overlay.width())/2);
				}
				if(ml+overlay.width()/2 > w){
					ml= (w/2)+((w-overlay.width())/2);
				}
				if(mt < overlay.height()/2){
					mt= (h/2)-((h-overlay.height())/2);
				}
				if(mt+overlay.height()/2 > h){
					mt= (h/2)+((h-overlay.height())/2);
				}
			}

			var callback=function(){
				if(el.oldZoomLevel<el.zoomLevel){
					//zoomIn
					if(typeof el.opt.onZoomIn=="function")
						el.opt.onZoomIn(el.zoomLevel);
				}
				if(el.oldZoomLevel>el.zoomLevel){
					//zoomOut
					if(typeof el.opt.onZoomOut=="function")
						el.opt.onZoomOut(el.zoomLevel);
				}
				el.oldZoomLevel = el.zoomLevel;
			};

			$el.mbZoomify_animate({width:w, height:h, marginLeft:-(ml), marginTop:-(mt)},false,800,callback);
		},

		drag:function(origin){
			var el=this.get(0);
			var $el=$(el);

			if(el.zoomLevel==0)
				return;

			var diffx= origin.x - el.origin.startX;
			var diffy= origin.y - el.origin.startY;

			var w=$el.width();
			var h=$el.height();

			var ml= el.origin.ml + diffx;
			var mt= el.origin.mt + diffy;

			var screen = $el.parent();

			if(ml > -(screen.width()/2)){
				ml= -((w/2)-((w-screen.width())/2));
			}
			if(ml-(screen.width()/2) < -w){
				ml= -((w/2)+((w-screen.width())/2));
			}
			if(mt > -(screen.height()/2)){
				mt= -((h/2)-((h-screen.height())/2));
			}
			if(mt-screen.height()/2 < -h){
				mt= -((h/2)+((h-screen.height())/2));
			}

			if (typeof el.opt.onDrag == "function")
				el.opt.onDrag(el.origin);

//			$el.mbZoomify_animate({marginLeft:ml, marginTop:mt},"linear",100);
			$el.css({marginLeft:ml, marginTop:mt});
		},
		destroy:function(){},

		animate:function(opt,duration, type, callback){
			if(!opt) return;

			if(typeof duration=="function"){
				callback=duration;
			}
			if(typeof type=="function"){
				callback=type;
			}
			if(!duration)
				duration=1000;

			if(!type)
				type="cubic-bezier(0.65,0.03,0.36,0.72)";

			//http://cssglue.com/cubic
			//	ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)

			var el=this;

			if($.browser.msie){
				el.animate(opt,duration,callback);
				return;
			}

			var sfx="";
			var transitionEnd = "TransitionEnd";
			if ($.browser.webkit) {
				sfx="-webkit-";
				transitionEnd = "webkitTransitionEnd";
			} else if ($.browser.mozilla) {
				sfx="-moz-";
				transitionEnd = "transitionend";
			} else if ($.browser.opera) {
				sfx="-o-";
				transitionEnd = "oTransitionEnd";
			}

			el.css(sfx+"transition-property","all");
			el.css(sfx+"transition-duration",duration+"ms");
			el.css(sfx+"transition-timing-function",type);
			el.css(opt);

			var endTransition = function(){
				el.css(sfx+"transition","");
				if(typeof callback=="function")
					callback();
				el.get(0).removeEventListener(transitionEnd,endTransition,true);
			};
			el.get(0).addEventListener(transitionEnd, endTransition, true);


		},
		overlay:function(opt){
			var el=this.get(0);
			var $el=$(el);

			if (opt=="destroy"){
				$("#zoomScreenOver").fadeOut(1000,function(){
					$(this).remove();
				});
				return;
			}

			var overlay=$("<div/>").attr("id","zoomScreenOver").addClass("zoomScreenOver");
			overlay.css({position:"fixed", top:0, left:0, width:"100%", height:"100%"}).hide();
			var screen=$("<div/>").attr("id","zoomScreen");
			screen.unselectable();

			$("body").append(overlay);
			overlay.append(screen);
			overlay.css({opacity:0}).show();
			screen.css({position:"relative", margin:"auto", marginTop:($(document).height()-screen.height())/2});

//			screen.css({position:"relative", top:"50%", left:"50%", marginLeft:-screen.width()/2, marginTop:-screen.height()/2});

			overlay.fadeTo(1000,1,function(){
				var options={};
				$.extend(options,$.mbZoomify.defaults, opt, {screen:"#zoomScreen"});
				$el.mbZoomify(options);
			});

			screen.bind("click",function(e){
				e.preventDefault();
			});
			overlay.bind("click",function(e){

				if ($(e.target).hasClass("zoomScreenOver"))
					$el.mbZoomify_overlay("destroy");
			})


		}
	};

	// require jquery.activity.js
	$.showLoader=function(fn){
		$("#loader").remove(); // if loader still on page remove it
		var loader=$("<div/>").attr("id","loader").css({position:"absolute",width:"100%", height:"100%", zIndex:10000}).hide();
		$(this).append(loader);
		$('#loader').fadeIn(1000, function(){
			$('#loader').spin({color: 'rgb(255,255,255)'});
			if(typeof fn ==="function")
				fn();

		});
	};

	$.hideLoader=function(fn){
		var loader=$("#loader", $(this));
		$('#loader').fadeOut(1000,function(){

			if(typeof fn ==="function")
				fn();
			$(this).remove()
		});
	};

	$.fn.unselectable=function(){
		this.each(function(){
			$(this).css({
				"-moz-user-select": "none",
				"-khtml-user-select": "none",
				"user-select": "none"
			}).attr("unselectable","on");
		});
		return $(this);
	};


/*SPINNER --------------------------------------------------------------------------*/

	var spinnerOpts = {
		lines: 14, // The number of lines to draw
		length: 7, // The length of each line
		width: 4, // The line thickness
		radius: 14, // The radius of the inner circle
		color: '#fff', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 50, // Afterglow percentage
		shadow: true // Whether to render a shadow
	};

	$.fn.spin = function(opt) {
		this.each(function() {
			var $this = $(this),
					data = $this.data();

			if (data.spinner) {
				data.spinner.stop();
				delete data.spinner;
			}
			if (spinnerOpts !== false) {
				$.extend(spinnerOpts,opt);
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

	$.fn.showLoader=$.showLoader;
	$.fn.hideLoader=$.hideLoader;


})(jQuery);
