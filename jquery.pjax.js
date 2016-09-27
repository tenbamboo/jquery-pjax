/**
 * @todo pjax  ajax返回上一步
 * @namespace pjax
 * @author haze.liu
 * @since 2015年8月20日 下午2:34:22
 */
(function($) {
	/**
	 * 方法说明<BR>
	 * load :加载指定页面 当第二个参数为true是代码不可以回退  $.pjax('load','demo1',{},true)  
	 * 		 $.pjax('load','demo1',{});
	 * back :返回上一个页面 $.pjax('back')
	 */

	/**
	 * dom说明<BR>
	 * 1.带pa-href 属性的映射为单页跳转
	 * <a pa-href="demo2"  class="btn btn-primary">点我跳demo2</a>
	 * 2.带pa-noback ，不可以返回到上一页的，如果没有则反之
	 * <a pa-href="demo1" pa-noBack class="btn btn-primary">点我跳demo1(可以返回)</a>
	 */
	/**
	 * 参数说明<BR>
	 * mainContainer : 主容器(默认为mainContainer)
	 * suffix :后缀名(默认为html)
	 * defaultLoad:默认加载(默认为index)
	 * 
	 */



	var defaults = {
		mainContainer:"mainContainer",
		suffix:"html",
		defaultLoad:"index",
	};
	var methods = null;
	var _methods = null;


	methods = {
		init : function(options) {
			defaults = $.extend(defaults, options);
			_methods._initEvent();
		},
		load :function(url,param,isNotBack){
			_methods._load(url,param,!isNotBack);
		},
		back :function(){
			_methods._back();
		}

	};
	_methods ={
		_initEvent:function(){
			$('body').delegate('*[pa-href]', 'click', function(event) {
				var $this=$(this)
				var href = $this.attr("pa-href");
				if($this.attr("pa-noBack")!=undefined && $this.attr("pa-noBack") ==''){
					_methods._load(href);
				}else{
					_methods._load(href,{},true);
					
				}
				
			});
			if (history.pushState) {
				_methods._changeHistory(true);
				window.addEventListener("popstate", function(e){
					_methods._changeHistory(false);
				});
			}
		},
		_changeHistory:function(refresh){
			var href=_methods._getParam('paHref');
			if(href){
				_methods._load(href,{},refresh);
			}else{
				_methods._load(defaults.defaultLoad);
			}
		},
		_getParam:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		},
		_load:function(url,param,isBack){
			
			var main=$("#"+defaults.mainContainer);
			window.scrollTo(0,0);
			//动画离开
			main.fadeOut(200, function(){
				main.load(url+"."+defaults.suffix,{},function(html){
					//动画进入
					main.fadeIn(200);
					//处理title
					var matches = html.match(/<title>(.*?)<\/title>/);
					if (matches) {
						title = matches[1];
						document.title = title;
					}
				})
			});
			
			
			var href=location.href.split("?")[0];
			
			if(isBack){
				href+="?paHref=" + url;
				if(param && !$.isEmptyObject(param)){
					href+="&"+$.param(param);
				}else{
					var p=window.location.search;
					if(p.indexOf('&')!= -1){
						href+=p.substring(p.indexOf('&'))
					}
					
				}
				history.pushState({isBack:isBack}, document.title,  href);
			}
			
			
			
			
		},
		_back:function(){
			history.back();
		}
			
	}
	$.pjax = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.pjax');
			return this;
		}
		return method.apply(this, arguments);
	};
	// $.pjax.defaults = {};
})(jQuery);