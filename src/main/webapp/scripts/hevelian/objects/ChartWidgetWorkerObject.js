/**
 * Chart Widget Worker Object.
 * This manages the business logic for a single instance of a Chart Widget Worker.
 * 
 */

function ChartWidgetWorkerObject() {
	var endpoint 	= null;
	var method 		= null;
	var property 	= null;
	var refresh		= 10;
	
	this.init = _init;
	this.refresh = _refresh;
	
	/**
	 * Initialise WorkerObject
	 */
	function _init(_endpoint, _method, _property, _refresh) {
		endpoint 	= _endpoint;
		method 		= _method;
		property 	= _property;
		
		if(_refresh!=null) refresh = _refresh;
	}
	
	function _refresh() {
		// DEBUG
		// we should fetch the values from the endpoint - this generates random values at the moment
		var _active = Math.floor((Math.random() * 100));
		var _inactive = 100 - _active;
		
		var msg = new SimpleMessage();
		msg.header.type = "update";
		msg.data[0] = {name: "active", value: _active }
		msg.data[1] = {name: "inactive", value: _inactive }
		
		return msg;
	}
}