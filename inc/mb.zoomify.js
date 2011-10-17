/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2011. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: mbicocchi@open-lab.com
 site: http://pupunzi.com

 Licences: MIT, GPL
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 ******************************************************************************/

/*
 * Name:jquery.mb.zoomify
 * Version: 1.0
 *
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

(function($){

	$.mbZoomify ={
		name:"mb.bgndGallery",
		author:"Matteo Bicocchi",
		version:"1.0",
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
							position:"absolute"
						}).hide();
					}else{
						$elClone.css({
							width:"100%",
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
			var screen=$el.parent();
			var highRes = $el.data("highres") ? $("<img>").attr("src", $el.data("highres")) : $("<img>").attr("src", $el.attr("src"));
			var overlay= $("<div/>").addClass("zoomOverlay").css({position:"absolute", width:"100%", height:"100%", top:0,left:0});

			var outScreenImg= highRes.addClass("zoomifyOutScreen").css({
				position:"absolute",
				left:-10000,
				top:-10000
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
								}).bind("dblclick",function(e){

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

						outScreenImg.remove();

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

					}).appendTo("body");
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
				$(".zoomScreenOver").fadeOut(1000,function(){
					$(".zoomScreenOver").remove();
				});
				return;
			}

			var overlay=$("<div/>").addClass("zoomScreenOver");
			overlay.css({position:"fixed", top:0, left:0, width:"100%", height:"100%"}).hide();
			var screen=$("<div/>").addClass("zoomScreen");

			$("body").append(overlay);
			overlay.append(screen);
			screen.css({position:"relative", top:"50%", left:"50%", marginLeft:-screen.width()/2, marginTop:-screen.height()/2});

			overlay.fadeIn(function(){
				$el.mbZoomify({screen:".zoomScreen",startLevel:opt.startLevel?opt.startLevel:0});
			});

			screen.bind("click",function(e){
				e.preventDefault();
				e.cancelBubble();
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
		$('#loader').activity({color: 'rgb(255,255,255)'});
		$('#loader').fadeIn(1000, function(){

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

	function grayScaleImage(imgObj){
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		var imgW = imgObj.width;
		var imgH = imgObj.height;
		canvas.width = imgW;
		canvas.height = imgH;

		canvasContext.drawImage(imgObj, 0, 0);
		var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg;
			}
		}
		canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	}


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