/**
 * TenantWorker
 * Thread for fetching the data displayed in the tenant controller.
 */
scriptLocation = FixLocation();

importScripts(scriptLocation + "ajax.js");
importScripts(scriptLocation + "objects/TenantWorkerObject.js");
importScripts(scriptLocation + "messages/default.js");

onmessage = TenantWorker;
tenant = new TenantWorkerObject();

var _enabled	= false;
var _timeout 	= null;
var _interval	= 10000;


function TenantWorker(oEvent) {
	var _data = oEvent.data.data;
	
	switch(oEvent.data.header.type) {
	
	case 'all':
		var _allTenants = tenant.GetAllTenants();
		if(_allTenants!=null) {
			var msg = new SimpleMessage();
			msg.header.type = "all";
			msg.data[0] = _allTenants;
			postMessage(msg);
		}
		break;
	
	case 'addTenant':
		tenant.AddTenant(_data);
		break;
		
	case 'init':
		_enabled = true;
		
		var _data = oEvent.data.data;
		_timeout = setTimeout(TenantTimer, _interval);

		// on init we get all tenants and send a msg back
		var _allTenants = tenant.GetAllTenants();
		if(_allTenants!=null) {
			var msg = new SimpleMessage();
			msg.header.type = "all";
			msg.data[0] = _allTenants;
			postMessage(msg);
		}
		break;

	case 'start':
		if(_enabled==true) break;
		_enabled = true;
		_timeout = setTimeout(TenantTimer, _interval);
		break;

	case 'pause':
	case 'stop':
		if(_timeout!=null) clearTimeout(_timeout);
		_enabled = false;
		_timeout = null;
		break;

	case 'refresh':
		TenantTimer();
		break;
		
	case 'reset':
		// unsupported but required event messages, do nothing but dont error
		break;
	default:
		console.log("TenantWorker: unknown event type");
	}	
}

function TenantTimer() {
	var _allTenants = tenant.GetAllTenants();
	if(_allTenants!=null) {
		var msg = new SimpleMessage();
		msg.header.type = "all";
		msg.data[0] = _allTenants;
		postMessage(msg);
	}

	_timeout = setTimeout(TenantTimer, _interval);

}

function FixLocation() {
	var locationParts = location.href.split("\/");
	return locationParts[0] + "//" + locationParts[2] + "/" + locationParts[3] + "/scripts/hevelian/";
}

