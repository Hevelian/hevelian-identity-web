/**
 * Chart Widget Worker Object.
 * This manages the business logic for a single instance of a Chart Widget Worker.
 * 
 */

function ChartWidgetWorkerObject() {
	var endpoint = null;
	var method = null;
	var property = null;
	
	this.init = _init;
	
	function _init(_endpoint, _method, _property) {
		endpoint = _endpoint;
		method = _method;
		property = _property;
	}
}