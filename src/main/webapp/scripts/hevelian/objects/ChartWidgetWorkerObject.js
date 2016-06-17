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
	
	/**
	 * Initialise WorkerObject
	 */
	function _init(_endpoint, _method, _property, _refresh) {
		endpoint 	= _endpoint;
		method 		= _method;
		property 	= _property;
		
		if(_refresh!=null) refresh = _refresh;
	}
}