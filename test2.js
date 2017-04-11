'use strict';
/**
 * @todo 主页
 * @namespace Test2
 * @author haze.liu
 * @since 2016年12月5日 15:30:22
 */
var Test2 = {
	init:function(){
		Test2.initTool();
		Test2.initDOM();
		Test2.initEvent();
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化DOM
	 * @memberof Test2
	 * 
	 */
	initDOM : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化工具
	 * @memberof Test2
	 * 
	 */
	initTool : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化事件
	 * @memberof Test2
	 * 
	 */
	initEvent : function() {
		$("#back").click(function(){
			$.pjax('back');
		});
		$("#test3NoBack").click(function(){
			$.pjax('load','test3',{},true);
		});
		$("#test3").click(function(){
			$.pjax('load','test3');
		});
		
	},
};
