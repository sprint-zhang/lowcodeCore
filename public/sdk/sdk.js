(function(win) {
	function convert(g) {
		var h = "";
		h += "cptid=" + g.cptid + "&";
		if (g.type) {
		   h += "type=" + g.type + "&";
		}
		if (g.category) {
		   h += "category=" + g.category + "&";
		}
		var e = g.controls;
		for (var f in e) {
			h += f + "=" + encodeURI(e[f]) + "&"
		}
		return h.slice(0, h.length - 1)
	}
	win.components = {};
	function Component(baseUrl){
		this.id="no_"+new Date().getTime()+""+Math.floor(Math.random()*10000);
		this.isDispose=false;
		this.baseUrl = baseUrl;
		components[this.id] = this;
		
	}
	//获取屏幕可视区域的宽高
	function client(){
		if(window.innerHeight !== undefined){
			return {
				"width": window.innerWidth,
				"height": window.innerHeight
			}
		}else if(document.compatMode === "CSS1Compat"){
			return {
				"width": document.documentElement.clientWidth,
				"height": document.documentElement.clientHeight
			}
		}else{
			return {
				"width": document.body.clientWidth,
				"height": document.body.clientHeight
			}
		}
	}
	//type：组件名称（必须大写开头）
	//category;组件类别，biz 业务组件，func 功能组件,默认为biz
	Component.prototype.create = function (inBizOpts) {
		inBizOpts.cptid = this.id;
		var iframe;
		if(this.isDispose){
			iframe=document.getElementById(this.id);
		}else{
			iframe = document.createElement("iframe");
		}
		iframe.setAttribute("id",this.id);
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("allowtransparency","yes");
		iframe.src = this.baseUrl + "/component?tid=" + Date.now() + "&" + convert(inBizOpts) + "&isOpen=1";
		iframe.style.border = "none";
		iframe.style.width = "100vw";
		iframe.style.height = "99vh";
		var setCenter=function(){
			var wh = client();
			iframe.style.position="absolute";
			if(inBizOpts.iframeStyle.width){
				iframe.style.left = ((wh.width-inBizOpts.iframeStyle.width)/2)+"px";
			}
			if(inBizOpts.iframeStyle.height){
				iframe.style.top = ((wh.height-inBizOpts.iframeStyle.height)/2)+"px";
			}
		}
		if (inBizOpts && inBizOpts.iframeStyle) {
			iframe.style.border = inBizOpts.iframeStyle.border || "none";
			iframe.style.width = inBizOpts.iframeStyle.width+"px" || "100vw";
			iframe.style.height = inBizOpts.iframeStyle.height+"px" || "99vh"
			if(inBizOpts.iframeStyle.position=="absolute" || inBizOpts.iframeStyle.position=="relative"){
				iframe.style.position=inBizOpts.iframeStyle.position;
				iframe.style.left=inBizOpts.iframeStyle.left+"px"||"0";
				iframe.style.top=inBizOpts.iframeStyle.top+"px"||"0";
			}else if(inBizOpts.iframeStyle.position=="center"){
                setCenter();
			}
		}
		if(this.isDispose){
			iframe.style.display="block";
			this.isDispose=false;
		}
		document.querySelector(inBizOpts.container || "body").appendChild(iframe);
	}
	Component.prototype.close=function(){
		var iframe =  document.getElementById(this.id);
		if(iframe){
		   iframe.remove();
		}
	}
	Component.prototype.dispose=function(){
		this.isDispose=true;
		 var iframe =  document.getElementById(this.id);
		 if(iframe){
		    iframe.style.display="none";
		 }
	}
	Component.prototype.addEventListener = function (callback) {
		if (callback) {
			this._callback = callback;
		}
	}
	win.addEventListener('message',function(event){
		var component = win.components[event.data.id];
		if (component) {
			if (component._callback) {
				component._callback(event.data);
			}
		}
	 }, false);
	win.Component=Component;
})(window);
