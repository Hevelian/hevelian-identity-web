/**
 * SessionWorker
 * Manages the session expiry in a separate thread bound to the page.
 * The session mus be authenticated, and manages the login/logout events too.
 * @param oEvent
 */

scriptLocation = FixLocation();

importScripts(scriptLocation + "ajax.js");
importScripts(scriptLocation + "objects/SessionWorkerObject.js");
importScripts(scriptLocation + "messages/default.js");

onmessage = SessionWorker;
session = new SessionWorkerObject();

function SessionWorker(oEvent) {
	console.log("SessionWorker: Location: " + scriptLocation);
	
	switch(oEvent.data.header.type) {
	case 'login':
		session.login(oEvent.data.data["username"], oEvent.data.data["password"], oEvent.data.data["tenantId"]);
		break;
	default:
		postMessage("SessionWorker: unknown event type");
	}
}

function FixLocation() {
	var locationParts = location.href.split("\/");
	return locationParts[0] + "//" + locationParts[2] + "/" + locationParts[3] + "/scripts/hevelian/";
}