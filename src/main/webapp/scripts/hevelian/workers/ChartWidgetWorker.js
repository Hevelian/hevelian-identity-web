/**
 * ChartWidget Worker Thread
 * This keeps the current widgets up-to-date by periodically checking the src for
 * changes in the data values.
 */

scriptLocation = FixLocation();

importScripts(scriptLocation + "ajax.js");
importScripts(scriptLocation + "objects/ChartWidgetWorkerObject.js");
importScripts(scriptLocation + "messages/default.js");

onmessage = ChartWidgetWorker;
chart = new ChartWidgetWorkerObject();

var _enabled	= false;
var _timeout 	= null;
var _interval	= 10000;

/**
 * ChartWidgetWorker
 * Main event handler for messages coming from the UI layer
 * 
 * @param oEvent
 */
function ChartWidgetWorker(oEvent) {

	switch(oEvent.data.header.type) {
	case 'init':
		console.log("chart widget initialised");
		_enabled = true;
		var _data = oEvent.data.data;
		chart.init(_data["endpoint"], _data["method"], _data["property"], _data["refresh"]);
		_interval = _data["refresh"] * 1000; // convert to milliseconds
		_timeout = setTimeout(ChartTimer, _interval);
		break;

	case 'start':
		if(_enabled==true) break;
		_enabled = true;
		_timeout = setTimeout(ChartTimer, _interval);
		break;

	case 'stop':
		if(_timeout!=null) clearTimeout(_timeout);
		_enabled = false;
		_timeout = null;
		break;

	case 'reset':
	case 'refresh':
	case 'pause':
		// unsupported but required event messages, do nothing but dont error
		break;
	default:
		console.log("ChartWidgetWorker: unknown event type");
	}
}

/**
 * When the timer kicks in, we run this - currently RANDOM DEBUG results are returned
 */
function ChartTimer() {
	var _active = Math.floor((Math.random() * 100));
	var _inactive = 100 - _active;
	
	var msg = new SimpleMessage();
	msg.header.type = "update";
	msg.data["active"] = _active;
	msg.data["inactive"] = _inactive;
	postMessage(msg);
	
	_timeout = setTimeout(ChartTimer, _interval);
}

/**
 * Helper function to create absolute url's to the imported JS files.
 * @returns {String}
 */
function FixLocation() {
	var locationParts = location.href.split("\/");
	return locationParts[0] + "//" + locationParts[2] + "/" + locationParts[3] + "/scripts/hevelian/";
}