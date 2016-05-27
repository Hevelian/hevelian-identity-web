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
		
		document.getElementById("frmMessage").innerHTML = "logging in...";
		var msg = new SimpleMessage();
		msg.header.type = "login";
		msg.data["username"] = _username;
		msg.data["password"] = _password;
		msg.data["tenantId"] = _tenantId;
		worker.postMessage(msg);		
	}
	
	function _callback(oEvent) {
		
		switch(oEvent.data.header.type) {
			case "login":
				if(oEvent.data.data["status"]!="true") {
					document.getElementById("frmMessage").innerHTML = oEvent.data.data["message"];
					break;
				}
				document.location.href = "main.html?tenantId=" +  oEvent.data.data["tenantId"] + "&username=" + oEvent.data.data["username"];
				break;
			default:
				console.log("SessionController: Unknown Event Message: " + oEvent.data);
		}
	}
}