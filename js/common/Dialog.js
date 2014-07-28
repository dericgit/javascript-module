/**
 * @fileoverview Dialog
 * @author Random | http://weibo.com/random
 * @date 2013-05-18
 */
 
define(function(require, exports, module){
	var $ = require("jquery");
	var shadow = require("common/BackgroundShadow");
	var EVENT_HIDE = "hide";
	
	var Dialog = function(tpl, opts) {
		var me;
		var entity;
		var titleNode;
		var state = "hide";
		
		opts = opts || {
			fixed : true
		};

		/**
		 * 初始化事件
		 */
		function initEvent() {
			entity.on("click", '[data-action="close"]', hide);		
		}
		
		function createEntity(){
			entity=$(tpl);
			entity.css("z-index", 2000);
			
			if(opts.fixed){
				entity.css("position", "fixed");
			}else{
				entity.css("position", "absolute");
			}
			
			$(document.body).append(entity);
		}
		
		function setMiddle(){
			var	h=entity.height();
			var	w=entity.width();
			var win=$(window);
			var	winH=win.height();
			var	winW=win.width();
			var	aH=winH - h;
			var	goldenSection=(Math.sqrt(5)-1)/2;
			var	totalSection=1;
			var	goldenSectionY=aH * goldenSection / (goldenSection + totalSection);
			var	middleX=winW / 2 - w / 2;

			entity[0].style.left = Math.max(middleX, 0) + "px";
			entity[0].style.top = Math.max(goldenSectionY, 15) + "px";
			
			if(!opts.fixed){
				entity.css("left", parseInt(entity.css("left"),10) + $(document.body).scrollLeft());
				entity.css("top", parseInt(entity.css("top"),10) + $(document.body).scrollTop());
			}
		}
		
		function hide(){
			if(me.getState() !== "hide"){
				shadow.hide();
				entity.hide();
				state = "hide";
			}
		}

		function init() {
			createEntity();
			initEvent();
			shadow.hide();
			entity[0].style.display="none";
		}

		init();
		
		me={
			
			show : function(){
				if(me.getState() !== "show"){
					setMiddle();
					shadow.show();
					entity.fadeIn(100);
					state = "show";
				}
			},
			
			hide : hide,
			
			getEntity : function(){
				return entity;
			},
			
			getState : function(){
				return state;
			},
			

			/**
			 * 销毁
			 */
			destroy : function() {
				entity.off("click", '[data-action="close"]', hide);
				entity[0].parentNode && entity[0].parentNode.removeChild(entity[0]);
			}
		};
		
		return me;
		
	};
	
	module.exports = Dialog;
}); 