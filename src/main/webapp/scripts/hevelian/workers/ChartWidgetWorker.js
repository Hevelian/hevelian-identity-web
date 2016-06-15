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

function ChartWidgetWorker(oEvent) {
	console.log("ChartWidgetWorker: Location: " + scriptLocation);
	
	switch(oEvent.data.header.type) {
	case 'init':
	case 'start':
	case 'stop':
	case 'reset':
	case 'refresh':
	case 'pause':
		break;
	default:
		postMessage("ChartWidgetWorker: unknown event type");
	}
}

function FixLocation() {
	var locationParts = location.href.split("\/");
	return locationParts[0] + "//" + locationParts[2] + "/" + locationParts[3] + "/scripts/hevelian/";
}