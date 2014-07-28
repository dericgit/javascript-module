/**
 * @fileoverview index
 * @author Random | http://weibo.com/random
 * @date 2014-07-20
 */

define("page/index", function(require, exports, module) {
	"use strict";
	var picView = require("general/picView");
	var $ = require("jquery");
	
	$('[data-node="img"]').on("click", function(){
		picView($(this).attr("src"));
	});
	
});

require(["page/index"]);
