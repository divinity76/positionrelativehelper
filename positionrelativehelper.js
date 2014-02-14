(function () {
    var target = null;
    var log = function ( /*...*/ ) {
	if(0)
	{return;}
        console.log.apply(console, arguments);
    };
    var zparseint = function (value) {
        var ret = /^([-+]?(?:0|[1-9][0-9]*))(?:px)?;?$/.exec(value);
        if (ret)
            return Number(ret[1]);
        return 0; //NaN;
    };
    var myoldx=null;
	var myoldy=null;
	var mousemovefunction = function(ev){
		if(myoldx===null){
		myoldx=zparseint(ev.screenX);
		myoldy=zparseint(ev.screenY);
		}
		if(!target)return 1;
		if(!target.style)return 2;
		target.style.position="relative";
		var newtop=zparseint(target.style.top);
		newtop+=(zparseint(ev.screenY)-myoldy);
		var newleft=zparseint(target.style.left);
		newleft+=(zparseint(ev.screenX)-myoldx);
		target.style.top=newtop+"px";
		target.style.left=newleft+"px";
		myoldx=zparseint(ev.screenX);
		myoldy=zparseint(ev.screenY);
		return 0;
	};
	/*CXZhciBvbGRtb3VzZW1vdmVmdW5jdGlvbj1mdW5jdGlvbiAoZXYpIHsNCiAgICAgICAgLy8uLi4uZmluYWxseSBoZXJlIDovIGdlZXphcw0KICAgICAgICBsb2coImZpbmFsbHkgaGVyZSEiKTsNCiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybiAxOw0KICAgICAgICBpZiAoIXRhcmdldC5zdHlsZSkgcmV0dXJuIDI7DQogICAgICAgIGxvZygibW9kaWZ5aW5nIHRhcmdldCEiKTsNCiAgICAgICAgbG9nKCJ0YXJnZXQub3V0ZXJIVE1MOiIsIHRhcmdldC5vdXRlckhUTUwpOw0KICAgICAgICB0YXJnZXQuc3R5bGUucG9zaXRpb24gPSAicmVsYXRpdmUiOw0KICAgICAgICB2YXIgdGFyZ2V0eCA9IHpwYXJzZWludChldi5jbGllbnRYKTsgDQoJCS8vdmFyIHRhcmdldHggPSB6cGFyc2VpbnQoZXYuc2NyZWVuWCk7DQogICAgICAgIHZhciB0YXJnZXR5ID0genBhcnNlaW50KGV2LmNsaWVudFkpOw0KCQkvL3ZhciB0YXJnZXR5ID0genBhcnNlaW50KGV2LnNjcmVlblkpOw0KICAgICAgICB2YXIgb2xkbGVmdCA9IHpwYXJzZWludCh0YXJnZXQuc3R5bGUubGVmdCk7DQogICAgICAgIHZhciBvbGR0b3AgPSB6cGFyc2VpbnQodGFyZ2V0LnN0eWxlLnRvcCk7DQogICAgICAgIC8vdGFyZ2V0LnN0eWxlLmxlZnQgPSAob2xkbGVmdCArIHRhcmdldHgpICsgInB4IjsNCiAgICAgICAgLy90YXJnZXQuc3R5bGUudG9wID0gKG9sZHRvcCArIHRhcmdldHkpICsgInB4IjsNCiAgICAgICAgdGFyZ2V0LnN0eWxlLmxlZnQgPSAodGFyZ2V0eCkgKyAicHgiOw0KICAgICAgICB0YXJnZXQuc3R5bGUudG9wID0gKHRhcmdldHkpICsgInB4IjsNCiAgICAgICAgLy92YXIgZm9vPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7DQogICAgICAgIC8vdmFyIGN1cnJlbnR4PWZvby4NCiAgICAgICAgcmV0dXJuIDA7DQogICAgfTs=*/

    var mousedownfunction = function (ev) {
        target = ev.target;
        document.body.addEventListener("mousemove", mousemovefunction);
    };
    var mouseupfunction = function (ev) {
        log("cleaning up!");
        document.body.removeEventListener("mousemove", mousemovefunction);
    };
    document.body.addEventListener("mousedown", mousedownfunction);
    document.body.addEventListener("mouseup", mouseupfunction);
})();
