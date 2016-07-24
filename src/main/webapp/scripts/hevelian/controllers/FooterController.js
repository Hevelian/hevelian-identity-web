/**
 * Creates a footer area which can be used for viewing messages etc.
 * The messages are queued up and the message area is updated every few seconds with the next message
 */

function FooterController() {
	var target 			= null;
	var container 		= null;
	var _timeout 		= null;

	var _queue			= new Array();
	var _me				= this;
	var _interval		= 3000;
	
	this.init			= _init;
	this.AddMessage		= _addMessage;
	this.DoTimeout		= _doTimeout;
	
	function _init(_target) {
		target = _target;
		var div = document.createElement("footer");
		div.setAttribute("class", "navbar navbar-default navbar-fixed-bottom");
		_target.appendChild(div);
		
		container = document.createElement("div");
		container.setAttribute("class", "hevelian-navbar-bottom");
		div.appendChild(container);
		
		_timeout = setTimeout(_me.DoTimeout, _interval);
		
		Hevelian.controller.active.FooterController = _me;
	}
	
	function _addMessage(_message, _type, _datetime) {
		_queue.push(new FooterMessage(_message, _type, _datetime));
	}
	
	function _doTimeout() {
		if(_queue.length==0) {
			container.innerHTML = "idle.";
		} else {
			var _message = _queue.shift();
			container.innerHTML = _message.datetime + " " + _message.type + " " + _message.message;
		}
		
		// reset timeout
		_timeout = setTimeout(_me.DoTimeout, _interval);
	}
}

function FooterMessage(_message, _type, _datetime) {
	this.message = _message;
	this.type = _type;
	this.datetime = _datetime;
	
	if(this.datetime==null) {
		this.datetime = new Date();
	}
	
	if(this.type==null) {
		this.type = "INFO";
	}
}