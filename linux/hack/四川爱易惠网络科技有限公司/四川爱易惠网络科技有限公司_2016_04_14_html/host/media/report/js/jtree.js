
(function(win,$){
win.jtree=function(o){
	return new jtree.init(o);
};
jtree.defaults={
	id:"tree",
	type:"json",
	select:true,
	check:false,
	checkLink:false, //父节点与子节点的关联性
	target:'treeFrame',
	icon:true,
	extra:false,
	maxTextLength:20,
	url:false,
	method:'post',
	data:false,
	rightClick:false,
	leftClick:false,
	onHover: false,
	offHover:false,
	cache:false,
	themes:"default",
	onClick:function(o,t){
	},
	onLoadSuccess:function(o){
	},
	onChangeCheck:function(){
	},
	onExpand:function(){
	},
	onContract:function(){
	}
};
jtree.init=function(o){
	var options=$.extend({},jtree.defaults,o);
	this.options=options;
	this.name="jtree"+new Date().getTime();
	options.id=this.id=typeof(options.id)==="string"? $("#"+options.id)[0]:options.id;
	$(this.id).addClass("themes_"+options.themes);
	if(options.type=="html"){this.toHtml($(this.id),options.data);}
	else if(options.type=="json"){this.toJson($(this.id),options.data);};
	
};
var tree={
	toHtml:function(ul,data){
		var self=this,url=self.options.url;
		if($.trim(ul.html())==""){
			self.toAjax(ul,data);
		}else{
		self.ulEvent(self.id);
		self.to_end(self.id);
		}
	},
	toJson:function(ul,data){
		var self=this,url=self.options.url;
		ul.html("");
		if(!url) return;
		self.toAjax(ul,data);
	},
	nextPage:function(id) {
		var self = this,node=typeof(id)==="string"? jQuery("#"+id)[0]:id,ul=jQuery(node).next("ul"),data = jQuery(node).attr('id'), offset = jQuery(node).attr('offset') || 0, limit = jQuery(node).attr('limit') || 0;
		if(self.options.type=="json")self.nextPageJson(ul,{id:data, offset:offset, limit:limit});
		else if(self.options.type=="html")self.nextPageHtml(ul,{id:data, offset:offset, limit:limit});	
	},
	nextPageHtml: function(ul, data) {
		var self=this,url=self.options.url;
		self.toAjax(ul,data);
		self.ulEvent(self.id);
		self.to_end(self.id);
	},
	nextPageJson:function(ul, data) {
		var self=this,url=self.options.url;
		if(!url) return;
		self.toAjax(ul,data);
	},
	toAjax:function(ul,data){
		var self=this,url=self.options.url,type=self.options.type,data=data||{};
		var parent_node=ul.prev(),load=parent_node.find('>span.node_parent');
		//添加必要条件(查询条件)
		data = self.options.globalRequestData ? $.extend(data, self.options.globalRequestData) : data;
		var method=this.options.method;
		$.ajax({type:method,url:url,data:data,dataType:type,
			beforeSend:function(){
//				begin = new Number(new Date().getTime());
				load.addClass("node_loading");
			},
			complete:function(){
				load.removeClass("node_loading");
				self.options.onLoadSuccess.call(self,ul[0]);
			},
			success:function(con){
			if(type=="json"){self.ulJson(ul,con);}
			else if(type=="html"){ul[0].innerHTML=ul[0].innerHTML+con;}
//			else if(type=="html"){ul.html(con);}
			if(parent_node&&self.options.check&&self.options.checkLink){
				if(parent_node.children(".node_check").hasClass("node_check1")){
					ul.find(".node_check").removeClass("node_check0").addClass("node_check1");
					self.options.onChangeCheck.call(self);
				}
			}
			self.ulEvent(self.id);
			self.to_end(self.id);
//			var end = new Number(new Date().getTime());
//			alert(end - begin);
			}
		});
	},
	ulJson:function(o,con){
		var self=this;
		$.each(con,function(i,n){
			var _li=$("<li></li>").appendTo(o),
			_node=$("<div id='"+(n.id||'')+"' class='tree_node'> <span class='node_title'><a class='title' target="+self.options.target+" href='"+(n.linkTo||'javascript:void(0)')+"'>"+(n.text||'')+"</a></span></div>").appendTo(_li);
			var extra = n.extra && $(n.extra).appendTo(_node);
			
			var node_text=$(_node).find(">span.node_title > a.title").text();
			if(self.options.maxTextLength){
			for(var len=l=0,slen=node_text.length;l<slen;l++){
				if (node_text.charCodeAt(l) > 255 || node_text.charCodeAt(l)<0){
				len+=2;
				}
				else len++;
				if(len>=self.options.maxTextLength) break;
			}
			if(l!=slen){
				$(_node).find(">span.node_title > a.title").attr("title",node_text);
				$(_node).find(">span.node_title > a.title").html(node_text.substring(0,l)+"...");
			}
		}
		
			
			_node.data("node_data",n);
			if(!!n.children){
				_node.addClass('has_child');
				var ul=$("<ul style='display:none'></ul>").appendTo(_li);
				if(n.state=="open"){
					var __icon=$('<span class="node_indent node_type node_parent node_parent_open"></span>').addClass(n.icon).prependTo(_node);
					$('<span class="node_indent node_hit node_push"></span>').prependTo(_node);
					ul.show();
				}	
				else{
					var __icon=$('<span class="node_indent node_type node_parent"></span>').addClass(n.icon).prependTo(_node);
					$('<span class="node_indent node_hit node_pull"></span>').prependTo(_node);
				}
				self.ulJson(ul,n.children);
			}
			else{
				if(n.state=="closed"){
					_node.addClass('has_child');
					var __icon=$('<span class="node_indent node_type node_parent"></span>').addClass(n.icon).prependTo(_node);
					$('<span class="node_indent node_hit node_pull"></span>').prependTo(_node);
				}
				else{
					var __icon=$('<span class="node_indent node_type node_leaf"></span>').addClass(n.icon).prependTo(_node);
					$('<span class="node_indent"></span>').prependTo(_node);
				}
			}
			if(self.options.check||n.check!=undefined){
				if(n.check==1)
				$('<span class="node_indent node_check node_check1"></span>').insertBefore(__icon);
				else 
				$('<span class="node_indent node_check node_check0"></span>').insertBefore(__icon);
			}
			if(!self.options.icon) __icon.hide();
		});
	},
	ulEvent:function(ele){
		var self=this;
		
		$(".tree_node",ele).mouseenter(function() {
					$(this).addClass("node_hover");
					self.options.onHover && self.options.onHover.call(self, this)
				}).mouseleave(function() {
					$(this).removeClass("node_hover")
					self.options.offHover && self.options.offHover.call(self, this)
				});
				
		$(".node_title",ele).unbind(".tree").bind("click.tree",function(event){
			var node=$(this).parent();
			self.set_selected(node[0]);
			self.options.onClick.call(self,node[0]);
			event.stopPropagation();
		});
		$(".node_hit",ele).unbind(".tree").bind("click.tree",function(event){
			var node=$(this).parent(),ul=node.next("ul");
			if($(this).hasClass("node_push")){
				$(this).removeClass("node_push").addClass("node_pull");	
				$(this).siblings(".node_parent").removeClass("node_parent_open");
				ul.hide();
				self.options.onContract.call(self,node);
			}
			else{
				if(ul.length){
					$(this).removeClass("node_pull").addClass("node_push");	
					$(this).siblings(".node_parent").addClass("node_parent_open");
					ul.show();
				}
				else{
					var ul=$('<ul></ul>').insertAfter(node),data=(node.data("node_data") && node.data("node_data").id)||node.attr('id');
					var offset = (node.data("node_data") && node.data("node_data").offset) ||node.attr('offset') || 0, limit = (node.data("node_data") && node.data("node_data").limit) ||node.attr('limit') || 0;
					$(this).removeClass("node_pull").addClass("node_push");
					$(this).siblings(".node_parent").addClass("node_parent_open");
					if(self.options.type=="json")self.toJson(ul,{id:data, offset:offset, limit:limit});
					else if(self.options.type=="html")self.toHtml(ul,{id:data, offset:offset, limit:limit});	
				}
				self.options.onExpand.call(self,node);
			}
			event.stopPropagation();
		});
		$(".node_check",ele).unbind(".tree").bind("click.tree",function(event){
			var node=$(this).parent(),ul=node.next("ul");
			if(!$(this).hasClass("node_check1")){
				$(this).removeClass('node_check2').removeClass("node_check0").addClass("node_check1");
			} else if(!$(this).hasClass("node_check0")){
				$(this).removeClass('node_check2').removeClass("node_check1").addClass("node_check0");
			}
			if(self.options.checkLink){
				if($(this).hasClass("node_check0")){
					ul.find(".node_check").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");
				} else if($(this).hasClass("node_check1")) {
					ul.find(".node_check").removeClass("node_check0").removeClass("node_check2").addClass("node_check1");
				}
				$.each($(".node_check",ele).toArray().reverse(),function(){
					var node=$(this).parent(),ul=node.next("ul");
					if(!ul.length) return;
					var l_node_check0 = ul.find(".node_check0").length;
					var l_node_check1 = ul.find(".node_check1").length;
					var l_node_check2 = ul.find(".node_check2").length;
					if(l_node_check0 + l_node_check2 == 0){$(this).removeClass("node_check0").removeClass("node_check2").addClass("node_check1");}
					else if(l_node_check1 + l_node_check2 == 0){$(this).removeClass("node_check1").removeClass("node_check2").addClass("node_check0");}
					else {$(this).removeClass("node_check0").removeClass("node_check1").addClass("node_check2");}
					
				});
				self.options.onChangeCheck.call(self,node);
			};
			event.stopPropagation();
		});
	},
	/**
	*o所要改变的节点DOM对象
	*/
	//获取被选中的节点
	get_selected:function(){
		return 	$(this.id).find("div.tree_node.node_selected")[0]||null;
	},
	//根据传入的值进行节点的选择
	set_selected:function(o){
		if(this.options.select) {
			$(this.id).find("div.tree_node.node_selected").removeClass("node_selected");
			var o=typeof (o)=="string"? $("#"+o)[0]:o;
			$(o).addClass("node_selected");
			try{this.options.cache && $.cookie('tree_selected',$(o).attr("id"));}
			catch(e){}
		}
	},
	//显示某节点的样式
	show_nodeType:function(o){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		var type_ele=$(o).children("span.node_type");
		//type_ele.attr("class",'node_indent node_type');
		type_ele.show();
	},
	//隐藏某节点的样式
	hide_nodeType:function(o){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		var type_ele=$(o).children("span.node_type");
		//type_ele.attr("class",'node_indent node_type');
		type_ele.hide();
	},
	//修改某节点的样式
	change_nodeType:function(o,s){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		var type_ele=$(o).children("span.node_type");
		type_ele.attr("class",'node_indent node_type '+s);
		return this;
	},
	get_checked:function(){
		var arr=[];
		$(this.id).find("div.tree_node > span.node_check.node_check1").each(function(){
			arr.push($(this).parent().attr("id"));
		});
		return arr;
	},
	get_unchecked:function(){
		var arr=[];
		$(this.id).find("div.tree_node > span.node_check.node_check0").each(function(){
			arr.push($(this).parent().attr("id"));
		});
		return arr;
	},
	get_halfchecked:function(){
		var arr=[];
		$(this.id).find("div.tree_node > span.node_check.node_check2").each(function(){
			arr.push($(this).parent().attr("id"));
		});
		return arr;
	},
	//获取选中的普通节点（不是子节点也不是父节点）
	get_checked_node:function(){
		if (!this.options.check) {
			return
		}
		var arr = [];
		var self=this;
		$(this.id).find("div.tree_node > span.node_check.node_check1").each(function() {
			if(!$(this).parent()[0].nextSibling&&($($($(this).parent()).parent()).parent()[0].id==self.options.id.id)){
			arr.push($(this).parent().attr("id"))
			}
		});
		return arr
	},
	//获得选中的父节点
	get_checked_parent:function(){
		if (!this.options.check) {
			return
		}
		var arr = [];
		$(this.id).find("div.tree_node > span.node_check.node_check1").each(function() {
			if($(this).parent()[0].nextSibling){
			arr.push($(this).parent().attr("id"))
			}
		});
		return arr
	},
	//获得选中的子节点
	get_checked_children:function(){
		if (!this.options.check) {
			return
		}
		var arr = [];
		$(this.id).find("div.tree_node > span.node_check.node_check1").each(function() {
			if(!$(this).parent()[0].nextSibling){
				arr.push($(this).parent().attr("id"))
			}
		});
		return arr
	},
	//设置某个节点为勾选状态
	set_checked:function(n,b){
		//if(!this.options.check) return;
		var b = String(b)==="undefined"?true:b;
		if(typeof (n)=="string"){
			switch(n){
			case "all":
				$(this.id).find("div.tree_node > span.node_check:not(.node_check1)").removeClass('node_check0').removeClass('node_check2').addClass("node_check1");break;
			case "zero":
				$(this.id).find("div.tree_node > span.node_check:not(.node_check0)").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");break;
			default:
				/*var o=$("#"+n)[0],ul=$(o).next("ul");
				$(o).find("span.node_check:not(.node_check1)").removeClass('node_check0').removeClass('node_check2').addClass("node_check1");
				if(ul.length>0&& b){
					ul.find("span.node_check:not(.node_check1)").removeClass('node_check0').removeClass('node_check2').addClass("node_check1");
				}*/
				$("#"+n).find('span.node_check').click();
			}
		}
		else{
			var o=n,ul=$(o).next("ul");
			$(o).find("span.node_check:not(.node_check1)").removeClass('node_check0').removeClass('node_check2').addClass("node_check1");
			if(ul.length>0&& b){
				ul.find("span.node_check:not(.node_check1)").removeClass('node_check0').removeClass('node_check2').addClass("node_check1");
			}		
		}
	},
	//设置某个节点为非勾选状态
	set_unchecked:function(n,b){
		if(!this.options.check) return;
		var b = String(b)==="undefined"? true : b;
		if(typeof (n)=="string"){
			switch(n){
			case "all":
				$(this.id).find("div.tree_node > span.node_check:not(.node_check0)").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");break;
			default:
				/*var o=$("#"+n)[0],ul=$(o).next("ul");
				$(o).find("span.node_check:not(.node_check0)").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");
				if(ul.length>0&& b){
					ul.find("span.node_check:not(.node_check0)").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");
				}*/
				$("#"+n).find('span.node_check').click();
			}
		}
		else{
			var o=n,ul=$(o).next("ul");
			$(o).find("span.node_check:not(.node_check0)").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");
			if(ul.length>0&& b){
				ul.find("span.node_check:not(.node_check0)").removeClass("node_check1").removeClass("node_check2").addClass("node_check0");
			}	
		}
	},
	//刷新整个树
	reload:function(){
		if(!this.options.url){
			win.location.reload();
		};
		jtree.init.call(this,this.options);
	},
	//针对某节点进行刷新
	reload_node:function(o){
		var self=this,o=typeof (o)=="string"? $("#"+o)[0]:o,node=$(o),ul=node.next("ul"),
		data=(node.data("node_data") && node.data("node_data").id)||node.attr('id'),ico=node.find(".node_hit");
//		if(!ul.length){
//		 ul=$('<ul>nihao</ul>').insertAfter(node);
//		}
		if(self.options.type=="json")self.toJson(ul,{id:data});
		else if(self.options.type=="html")self.toHtml(ul,{id:data});	
//		!ico.hasClass("node_push") && ico.addClass("node_push");
		
	},
	//获取某节点的父节点
	get_parent:function(o){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		return $(o).parent().parent().prev("div.tree_node").attr("id")||$(o).parent().parent().prev("div.tree_node")[0]||null;
	},
	//获取谋节点的孩子节点数组,如果该节点的孩子节点还没有打开过则会出现错误
	get_children:function(o){
		var arr=[],o=typeof (o)=="string"? $("#"+o)[0]:o;;
		if($(o).next("ul").length)
		{$(o).next("ul").find(">li>div.tree_node").each(function(){
			arr.push($(this).attr("id"));
		});
		return arr;
		}
		return null;
	},
	//修改主题样式
	change_themes:function(o){
		$(this.id)[0].className=$(this.id)[0].className.replace(/\bthemes_\w+\b/g,"themes_"+o);
	},
	//获取某节点的url属性
	get_url:function(o){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		return $(o).find("a.title").attr("href");
	},
	//设置某节点的url属性
	set_url:function(o,s){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		$(o).find("a.title").attr("href",s);
	},
	//打开所有节点
	open_node:function(){
		$(this.id).find("div.tree_node .node_pull").trigger("click");
	},
	//关闭所有节点
	close_node:function(){
		$(this.id).find("div.tree_node .node_push").trigger("click");
	},
	//在整个树的范围内根据传入的字符串进行节点的查询和高亮，并返回由这些节点的id组成的数值
	search_node:function(string){
		var n_index=0,arr=[];
		$(this.id).find("div.tree_node").each(function(){
			$(this).hasClass('height_light') && $(this).removeClass('height_light');
			var s_text=$(this).children('.node_title').text();
			if(s_text.indexOf(string)!=-1){
				$(this).addClass('height_light');
				arr.push($(this).attr("id"));
				$(this).parents("ul:hidden").prev("div.tree_node").find(".node_pull").trigger("click");
				if(!n_index)n_index=$(this)[0];
			}
		});
		if(n_index) n_index.scrollIntoView(true);
		if(arr.length)return arr;
	},
	//添加某个节点
	add_node:function(parent_node,o){
		var parent_node=typeof (parent_node)=="string"? $("#"+parent_node)[0]:parent_node,
		node=$(parent_node);
		if(!node.length) return;
		var self=this,arr=[],ul=node.next();
		if(typeof (o)=="string"){
			ul.append(o);
		}else{
		if(!$.isArray(o))arr.push(o);
		else{arr=o;};
		self.ulJson(ul,arr);}
		return this;
	},
	//删除某个节点
	delete_node:function(o){
		var o=typeof (o)=="string"? $("#"+o)[0]:o;
		var li=$(o).parent(),ul=$(o).next();
		//if(li.hasClass('fist_li')) li.next() && li.next().addClass("fist_li");
		//if(li.hasClass('last_li')) li.prev() && li.prev().addClass("last_li");
		li.remove();
		ul.remove();
		return this;
	},
	//改变节点的文本内容
	change_nodeText:function(o,string){
		var o=typeof (o)=="string"? $("#"+o)[0]:o,self=this;
		if(!$(o).length) return;
		if(self.options.maxTextLength){
			for(var len=l=0,slen=string.length;l<slen;l++){
				if (string.charCodeAt(l) > 255 || string.charCodeAt(l)<0){
				len+=2;
				}
				else len++;
				if(len>=self.options.maxTextLength) break;
			}
			if(l!=slen){
				$(o).find(">span.node_title > a.title").attr("title",string);
				$(o).find(">span.node_title > a.title").html(string.substring(0,l)+"...");
				return this;
			}
		}
		$(o).find(">span.node_title > a.title").text(string);
		return this;
	},
	//在iframe_id所给的iframe中显示某个节点指向的url页面
	go_iframe:function(o,iframe_id){
		this.set_selected(o);
	    var url = this.get_url(o);
	    if(!iframe_id)
		$("#treeFrame").attr("src", url);
		else $("#"+iframe_id).attr("src", url);
		return this;
	},
	//作为整个树进行初始化完成后的最后一个方法，用来添加扩展功能
	to_end:function(o){
		
	},
	
	//筛选树对应的select
	change_state:function(o){
	var t=this.get_checked();
	var s=o||'all';
	var treeId=this.options.id.id;
	if(s=="all"){
		jQuery('li').each(function(){
			//	this.children[0].hidden=false;
				this.children[0].parentElement.style.display='block'; //for ie
				});
		}
	if(s=="selected"){
		jQuery("#"+treeId).find("div.tree_node > span.node_check:not(.node_check1)").each(function() {
			
				//jQuery(this).parent()[0].hidden=true;
				var p=jQuery(this).parent()[0];
				jQuery(this).parent()[0].parentElement.style.display='none';
			});
			jQuery("#"+treeId).find("div.tree_node > span.node_check.node_check1").each(function() {
				
				//jQuery(this).parent()[0].hidden=false;
				jQuery(this).parent()[0].parentElement.style.display='block';
				var p;
				 p=tree.get_parent(jQuery(this).parent().attr("id"));
				while(p>0){
					//jQuery("#"+p)[0].hidden=false;
					jQuery("#"+p)[0].parentElement.style.display='block';
					p=tree.get_parent(p);
				}
			});
			
	}
	if(s=="not_selected"){
		jQuery("#"+treeId).find("div.tree_node > span.node_check.node_check1").each(function() {
				//arr.push(jQuery(this).parent().attr("id"));
				//jQuery(this).parent()[0].hidden=true;
				jQuery(this).parent()[0].parentElement.style.display='none';
			});
			jQuery("#"+treeId).find("div.tree_node > span.node_check:not(.node_check1)").each(function() {
				//arr.push(jQuery(this).parent().attr("id"));
				//jQuery(this).parent()[0].hidden=false;
				jQuery(this).parent()[0].parentElement.style.display='block';
			});
	}
}
};
jtree.init.prototype=tree;
})(window,jQuery);
