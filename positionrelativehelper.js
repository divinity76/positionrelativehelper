window.position_relative_helper={
current_target_:null,
current_target_unique_selector:"",
current_target_span:null,
current_target_left_input_box:null,
current_target_left_plus_button:null,
current_target_left_plus_button_interval_id:null,
current_target_left_plus_button_down:function(ev){
self.current_target_.style.left=Number(self.zparseint(self.current_target_.style.left)+1)+"px";
},
current_target_left_plus_button_up:function(ev){
clearInterval(self.current_target_left_plus_button_interval_id);
},
current_target_left_minus_button:null,
current_target_left_minus_button_interval_id:null,
current_target_left_minus_button_down:function(ev){
self.current_target_.style.left=Number(self.zparseint(self.current_target_.style.left)-1)+"px";
},
current_target_left_minus_button_up:function(ev){
clearInterval(self.current_target_left_minus_button_interval_id);
},
current_target_top_input_box:null,
current_target_top_plus_button:null,
current_target_top_plus_button_interval_id:null,
current_target_top_plus_button_down:function(ev){
self.current_target_.style.top=Number(self.zparseint(self.current_target_.style.top)+1)+"px";
},
current_target_top_plus_button_up:function(ev){
clearInterval(self.current_target_top_plus_button_interval_id);
},
current_target_top_minus_button:null,
current_target_top_minus_button_interval_id:null,
current_target_top_minus_button_down:function(ev){
self.current_target_.style.top=Number(self.zparseint(self.current_target_.style.top)-1)+"px";
},
current_target_top_minus_button_up:function(ev){
clearInterval(self.current_target_top_minus_button_interval_id);
},

log:function ( /*...*/ ) {
	if(1)
        console.log.apply(console, arguments);
    },
    zparseint:function (value) {
        var ret = /^([-+]?(?:0|[1-9][0-9]*))(?:px)?;?$/.exec(value);
        if (ret)
            return Number(ret[1]);
        return 0; //not NaN;
    },
	self:null,
	my_old_x:null,
	my_old_y:null,
	mouse_move_function:function(ev){
		if(self.my_old_x===null){
		self.my_old_x=self.zparseint(ev.screenX);
		self.my_old_y=self.zparseint(ev.screenY);
		}
		if(!self.current_target_)return 1;
		if(!self.current_target_.style)return 2;
		self.current_target_.style.position="relative";
		var new_top=self.zparseint(self.current_target_.style.top);
		new_top+=(self.zparseint(ev.screenY)-self.my_old_y);
		var new_left=self.zparseint(self.current_target_.style.left);
		new_left+=(self.zparseint(ev.screenX)-self.my_old_x);
		self.current_target_.style.top=new_top+"px";
		self.current_target_.style.left=new_left+"px";
		self.my_old_x=self.zparseint(ev.screenX);
		self.my_old_y=self.zparseint(ev.screenY);
		return 0;
	},
	
	is_listening_to_mouse_move:false,
	new_target_key_code:17,//17 should be control button...
	new_target_key_clicked:function(ev){
	//..we don't really know if it was our key yet, so gotta confirm
	if(ev.keyCode!=self.new_target_key_code)
	{return;}
	ev.stopPropagation();//<<probably a good idea..
	if(self.is_listening_to_mouse_move===false){
	self.is_listening_to_mouse_move=true;
    self.current_target_ = ev.target;
	self.current_target_unique_selector=self.getUniqueSelector(self.current_target_);	
    document.body.addEventListener("mousemove",self.mouse_move_function);
	return;
	}else if(self.is_listening_to_mouse_move===true){
	self.is_listening_to_mouse_move=false;
    document.body.removeEventListener("mousemove",self.mouse_move_function);
	return;
	};
	throw new Error("unreachable code reached! fix your code, baka");
	},
	
	mouse_down_function:function (ev) {
	if(self.panel.contains(ev.target))
	{
	return;
	}
	ev.stopPropagation();
        self.current_target_ = ev.target;
		self.current_target_unique_selector=self.getUniqueSelector(self.current_target_);
		setTimeout(self.update_panel,1);
        document.body.addEventListener("mousemove",self.mouse_move_function);
        //document.body.addEventListener("drag",self.mouse_move_function);
    },
    mouse_up_function:function (ev) {
        document.body.removeEventListener("mousemove", self.mouse_move_function);
        //document.body.removeEventListener("drag", self.mouse_move_function);
		self.my_old_x=self.my_old_y=null;
    },
	getUniqueSelector:function(el){
	if(!el || !el.parentNode){
	return "null";
	}
  var names = [];
  while (el.parentNode){
    if (el.id){
      names.unshift('#'+el.id);
      break;
    }else{
      if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
      else{
        for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
        names.unshift(el.tagName+":nth-child("+c+")");
      }
      el=el.parentNode;
    }
  }
  return names.join(" > ");
},
	panel:null,
	enabled:false,
	on_off_button:null,
	disable_event:function(ev){
	ev.stopPropagation();
	return;
	},
	on_off_button_pressed:function(ev){
	if(self.enabled===false){
	self.enabled=true;
	self.on_off_button.style.color="green";
	self.on_off_button.textContent="enabled";
	//CXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJtb3VzZWRvd24iLHNlbGYubW91c2VfZG93bl9mdW5jdGlvbik7DQoJd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIm1vdXNldXAiLHNlbGYubW91c2VfdXBfZnVuY3Rpb24pOw0KCXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJtb3VzZXVwIixzZWxmLmRpc2FibGVfZXZlbnQpOw0KCXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJtb3VzZWNsaWNrIixzZWxmLm1vdXNlX3VwX2Z1bmN0aW9uKTsNCgl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigibW91c2VjbGljayIsc2VsZi5kaXNhYmxlX2V2ZW50KTsNCgl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigiZHJhZ2VuZCIsc2VsZi5tb3VzZV91cF9mdW5jdGlvbik7DQo=	
	//window.addEventListener("dragstart",self.mouse_down_function);
	window.addEventListener("mousedown",self.mouse_down_function);
	window.addEventListener("dragend",self.mouse_up_function);
	window.addEventListener("mouseup",self.mouse_up_function);
	return;
	} else if(self.enabled===true){
	self.enabled=false;
	self.mouse_up_function();
	self.on_off_button.style.color="red";
	self.on_off_button.textContent="disabled";
	//window.removeEventListener("dragstart",self.mouse_down_function);
	window.removeEventListener("mousedown",self.mouse_down_function);
	window.removeEventListener("dragend",self.mouse_up_function);
	window.removeEventListener("mouseup",self.mouse_up_function);
//CXdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCJtb3VzZWRvd24iLHNlbGYubW91c2VfZG93bl9mdW5jdGlvbik7DQoJd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1vdXNldXAiLHNlbGYubW91c2VfdXBfZnVuY3Rpb24pOw0KCXdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCJtb3VzZXVwIixzZWxmLmRpc2FibGVfZXZlbnQpOw0KCXdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCJtb3VzZWNsaWNrIixzZWxmLm1vdXNlX3VwX2Z1bmN0aW9uKTsNCgl3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigibW91c2VjbGljayIsc2VsZi5kaXNhYmxlX2V2ZW50KTsNCgl3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigiZHJhZ2VuZCIsc2VsZi5tb3VzZV91cF9mdW5jdGlvbik7IA0K	
return;
	}
	throw new Error("unreachable code reached! fix your stupid code baka");
	},
	update_panel:function(){
	self.log("update_panel called!");
	self.current_target_span.textContent=self.getUniqueSelector(self.current_target_);
	if(self.current_target_){
	var style=window.getComputedStyle(self.current_target_);
	self.current_target_left_input_box.value=self.zparseint(style.left);
	self.current_target_top_input_box.value=self.zparseint(style.top);
	}
	
	},
	init:function(){
	self=window.position_relative_helper;
	//<mainPanel>
	self.panel=document.createElement("div");
	self.panel.style.top="0";
	self.panel.style.position="fixed";
	self.panel.style.left="50%";
	self.panel.style.backgroundColor="DarkBlue";
	self.panel.style.color="white";
	//</mainPanel>
	//<on_off_button>
	self.panel.appendChild(document.createElement("button"));
	self.panel.lastChild.name="on_off_button";
	self.panel.lastChild.style.color="red";
	self.panel.lastChild.textContent="disabled";
	self.on_off_button=self.panel.lastChild;
	self.on_off_button.addEventListener("mouseenter",self.on_off_button_pressed);
	//</on_off_button>
	self.panel.appendChild(document.createElement("br"));
	//<current_target_>
	self.panel.appendChild(document.createElement("span"));
	self.panel.lastChild.textContent="current target: ";
	self.panel.lastChild.appendChild(document.createElement("br"));
	self.panel.lastChild.appendChild(document.createElement("span"));
	self.current_target_span=self.panel.lastChild.lastChild;
	self.panel.appendChild(document.createElement("br"));
	//<current_target_left_input_box>
	self.panel.appendChild(document.createElement("span"));
	self.panel.lastChild.textContent="left:";
	self.panel.appendChild(document.createElement("input"));
	self.panel.lastChild.type="text";
	self.panel.lastChild.value="0px";
	self.panel.lastChild.style.color="black";
	self.current_target_left_input_box=self.panel.lastChild;
	//</current_target_left_input_box>
	var foo="mousedown";
	var buttons_down_interval=100;
	//<current_target_left_minus_button>
	self.panel.appendChild(document.createElement("button"));
	self.panel.lastChild.textContent="◄";
	self.current_target_left_minus_button=self.panel.lastChild;
	self.current_target_left_minus_button.addEventListener("mousedown",function(){self.current_target_left_minus_button_interval_id=setInterval(self.current_target_left_minus_button_down,buttons_down_interval);self.current_target_left_minus_button_down();});
	self.current_target_left_minus_button.addEventListener("mouseup",self.current_target_left_minus_button_up);
	self.current_target_left_minus_button.addEventListener("mouseleave",self.current_target_left_minus_button_up);
	//</current_target_left_minus_button>
	//<current_target_left_plus_button>
	self.panel.appendChild(document.createElement("button"));
	self.panel.lastChild.textContent="►";
	self.current_target_left_plus_button=self.panel.lastChild;
	self.current_target_left_plus_button.addEventListener("mousedown",function(){self.current_target_left_plus_button_interval_id=setInterval(self.current_target_left_plus_button_down,buttons_down_interval);self.current_target_left_plus_button_down();});
	self.current_target_left_plus_button.addEventListener("mouseup",self.current_target_left_plus_button_up);
	self.current_target_left_plus_button.addEventListener("mouseleave",self.current_target_left_plus_button_up);
	//</current_target_left_plus_button>
	self.panel.appendChild(document.createElement("br"));
	//<current_target_top_input_box>
	self.panel.appendChild(document.createElement("span"));
	self.panel.lastChild.textContent="top:";
	self.panel.appendChild(document.createElement("input"));
	self.panel.lastChild.type="text";
	self.panel.lastChild.value="0px";
	self.panel.lastChild.style.color="black";
	self.current_target_top_input_box=self.panel.lastChild;
	//</current_target_top_input_box>
	//<current_target_top_plus_button>
	self.panel.appendChild(document.createElement("button"));
	self.panel.lastChild.textContent="▼";
	self.current_target_top_plus_button=self.panel.lastChild;
	self.current_target_top_plus_button.addEventListener("mousedown",function(){self.current_target_top_plus_button_interval_id=setInterval(self.current_target_top_plus_button_down,buttons_down_interval);self.current_target_top_plus_button_down();});
	self.current_target_top_plus_button.addEventListener("mouseup",self.current_target_top_plus_button_up);
	self.current_target_top_plus_button.addEventListener("mouseleave",self.current_target_top_plus_button_up);
	//</current_target_top_plus_button>
	//<current_target_top_minus_button>
	self.panel.appendChild(document.createElement("button"));
	self.panel.lastChild.textContent="▲";
	self.current_target_top_minus_button=self.panel.lastChild;
	self.current_target_top_minus_button.addEventListener("mousedown",function(){self.current_target_top_minus_button_interval_id=setInterval(self.current_target_top_minus_button_down,buttons_down_interval);self.current_target_top_minus_button_down();});
	self.current_target_top_minus_button.addEventListener("mouseup",self.current_target_top_minus_button_up);
	self.current_target_top_minus_button.addEventListener("mouseleave",self.current_target_top_minus_button_up);
	//</current_target_top_minus_button>
	self.panel.appendChild(document.createElement("br"));
	setInterval(self.update_panel,300);
	//</current_target_>
	document.body.appendChild(self.panel);
	return self;},
};
window.position_relative_helper.init();
