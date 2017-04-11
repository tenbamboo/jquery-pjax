'use strict';
/**
 * @todo 主页
 * @namespace Index
 * @author haze.liu
 * @since 2016年12月5日 15:30:22
 */
var Index = {
	init:function(){
		Index.initTool();
		Index.initDOM();
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化DOM
	 * @memberof Index
	 * 
	 */
	initDOM : function() {
		
	},
	/**
	 * @public
	 * @function
	 * @todo 初始化工具
	 * @memberof Index
	 * 
	 */
	initTool : function() {
		
		
		
		
		
		//初始化单页框架
		$.pjax({
			defaultLoad: Index.getParam('paHref') || 'test1',
			loadStart:function(url){
			},
			loadDone:function(url){
				document.title=$('body title').html();
			},
			loadError:function(){
				 alert('加载错误了')
			}
		});
		//初始化用户选择器
//		$.cainUserPicker();
	},
	  /**
  	 * @public
  	 * @function
  	 * @todo 获取Url中的值，如果没有再从localstorage,sessionstorage依次获取值
  	 * @memberof Cain
  	 * @param {String} name key的名字
  	 */  
	  getParam:function (name) {
	    return Index.getUrlParam(name) || localStorage.getItem(name) || sessionStorage.getItem(name);
	  },
	  /**
		 * @public
		 * @function
		 * @todo 获取Url中的值
		 * @memberof Cain
		 * @param {String} name key的名字
		 */  
	getUrlParam:function (name) {
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null) {
	    return decodeURI(r[2]);
	  }
	  return null;
	},
};

$(document).ready(function(){
	Index.init();
});
