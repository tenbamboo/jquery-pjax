'use strict';
/**
 * @todo 主页
 * @namespace Test3
 * @author haze.liu
 * @since 2016年12月5日 15:30:22
 */
var Test3 = {
	init:function(){
		Test3.initTool();
		Test3.initDOM();
		Test3.initEvent();
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化DOM
	 * @memberof Test3
	 * 
	 */
	initDOM : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化工具
	 * @memberof Test3
	 * 
	 */
	initTool : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化事件
	 * @memberof Test3
	 * 
	 */
	initEvent : function() {
		$("#back").click(function(){
			$.pjax('back');
		});
		$("#reload").click(function(){
			$.pjax('reload');
		});
		
	},
};
