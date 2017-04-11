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
	 * reload:重新加载本页面
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
	 * loadDone:加载页面完成触发事件
	 * loadStart:加载开始触发事件
	 * loadError:加载错误事件
	 * 
	 */



	 var defaults = {
		mainContainer:"mainContainer",
		suffix:"html",
		defaultLoad:"index",
		loadDone:function(){},
		loadStart:function(){},
		loadError:function(){}
	};
	var methods = null;
	var _methods = null;


	methods = {
		init : function(options) {
			defaults = $.extend(defaults, options);
			_methods._initEvent();
//			_methods._load(defaults.defaultLoad);
		},
		reload:function(url,param,isNotBack){
		
			var u= url || _methods.thisUrl;
			var p= param || _methods.thisParam;
			
			var isAddParam='';
			if(location.href.indexOf('&') != -1){
				var temp=location.href;
				isAddParam=temp.substring(temp.indexOf('&'),temp.length);
			}
			_methods.thisUrl='';
			_methods._load(u,p,!isNotBack,isAddParam);
		},
		load :function(url,param,isNotBack){
			param=param||{};
			_methods._load(url,param,!isNotBack);
		},
		back :function(){
			_methods._back();
		}

	};
	_methods ={
		thisUrl:'',
		thisParam:{},
		firstLoad:true,
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
				_methods._changeHistory(false);
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
		_load:function(url,param,isBack,isAddUrlParam){
			console.log('load:'+url);
			if(this.thisUrl == url){
				console.error('load:'+url +' more times');
				return;
			}
			this.thisUrl=url;
			//加载开始方法
			if(defaults.loadStart){
				defaults.loadStart();
			}
			var main=$("#"+defaults.mainContainer);
			//动画离开
			main.fadeOut(200, function(){
				//ajax 方式，可以控制error
				$.ajax({
					url:url+"."+defaults.suffix,
					type:'get',
					dataType:'html',
					success:function(html){
						main.html(html);
						window.scrollTo(0,0);
						//动画进入
						main.fadeIn(200);
						//处理title
						var matches = html.match(/<title>(.*?)<\/title>/);
						if (matches) {
							title = matches[1];
							document.title = title;
						}
						//加载完成方法
						if(defaults.loadDone){
							defaults.loadDone(url);
						}
						//写入History 中
						var href=location.href.split("?")[0];
						href+="?paHref=" + url;
						if(param && !$.isEmptyObject(param)){
							_methods.thisParam=param;
							href+="&"+$.param(param);
						}
//						else if(location.href.indexOf('&') != -1){
//							var temp=location.href;
//							href+=temp.substring(temp.indexOf('&'),temp.length);
//						}
						if(isBack){
							history.pushState({isBack:isBack}, document.title,  href);
						}else if(_methods.firstLoad){
							href=location.href;
							history.replaceState({isBack:isBack}, document.title,  href);
							this.firstLoad=false;
						}else{
							history.replaceState({isBack:isBack}, document.title,  href);
						}
					},
					error:function(){
						main.fadeIn(200);
						if(defaults.loadError){
							defaults.loadError();
						}
					}
				});
			});
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