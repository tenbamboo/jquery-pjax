'use strict';
/**
 * @todo 主页
 * @namespace Test1
 * @author haze.liu
 * @since 2016年12月5日 15:30:22
 */
var Test1 = {
	init:function(){
		Test1.initTool();
		Test1.initDOM();
		Test1.initEvent();
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化DOM
	 * @memberof Test1
	 * 
	 */
	initDOM : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化工具
	 * @memberof Test1
	 * 
	 */
	initTool : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化事件
	 * @memberof Test1
	 * 
	 */
	initEvent : function() {
		$("#back").click(function(){
			$.pjax('back');
		});
		$("#test2").click(function(){
			$.pjax('load','test2');
		});
		$("#test2ForParam").click(function(){
			$.pjax('load','test2',{
				userId:1,
				userName:'小王',
			});
		});
		
	},
};
