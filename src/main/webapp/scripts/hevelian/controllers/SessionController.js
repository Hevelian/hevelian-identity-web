/**
 * SessionController.
 * Manages messaging to/from the SessionWorker.
 * 
 */

function SessionController() {
	
	this.attemptLogin = _attemptLogin;
	this.callback = _callback;
	
	// initialise Web Worker
	var worker = new Worker("scripts/hevelian/workers/SessionWorker.js");
	worker.onmessage = this.callback;
	
	function _attemptLogin(_username, _password, _tenantId) {
		console.log("AttemptLogin: " + _username);
		
		var msg = new SimpleMessage();
		msg.header.type = "login";
		msg.data["username"] = _username;
		msg.data["password"] = _password;
		msg.data["tenantId"] = _tenantId;
		worker.postMessage(msg);
	}
	
	function _callback(oEvent) {
		console.log("Session: Got Event Message: " + oEvent.data);
	}
}