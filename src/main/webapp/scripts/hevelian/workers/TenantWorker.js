/**
 * TenantWorker
 * Thread for fetching the data displayed in the tenant controller.
 */
scriptLocation = FixLocation();

importScripts(scriptLocation + "ajax.js");
importScripts(scriptLocation + "objects/SessionWorkerObject.js");
importScripts(scriptLocation + "messages/default.js");

function FixLocation() {
	var locationParts = location.href.split("\/");
	return locationParts[0] + "//" + locationParts[2] + "/" + locationParts[3] + "/scripts/hevelian/";
}

