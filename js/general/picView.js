/**
 * @fileoverview picView
 * @author Random | http://weibo.com/random
 * @date 2014-07-19
 */

define(function(require, exports, module) {
	"use strict";
	var $ = require("jquery");
	var Dialog = require("common/Dialog");
	var template = require("utils/template");
	
	var TPL = '<div><div data-node="content"><div style="background-color:#fff;width:100px;height:100px;padding:30px;"><strong>loading...</strong></div></div></div>';
	var TPL_IMG = '<div data-node="picCnt" style="padding:5px;background-color:#fff;"></div>';
	
	var dlg = Dialog(TPL, {
		fixed : false
	});
	
	function showPic(imgObj){
		var entity = dlg.getEntity();
		var picCnt;
		
		$('[data-node="content"]', entity).html(TPL_IMG);
		picCnt = $('[data-node="picCnt"]', entity);
		$('img', picCnt).remove();
		picCnt.append(imgObj);
		dlg.show();
	}
	
	function initEvent(){
		$(document.body).on("click", function(){
			dlg.hide();
		});
	}
	
	function init(){
		initEvent();
	}
	
	init();
	
	
	module.exports = function(src){
		var img = new Image();
		
		img.src = src;
		img.onload = function(){
			showPic(img);
			img.onload = null;
		};
	};
});