/**
 * SessionWorkerObject
 * Performs all the session actions on behalf of the SessionWorker.
 */

function SessionWorkerObject() {
	
	this.login = _login;
	
	function _login(_username, _password, _tenantId) {
		console.log("SessionWorker: login attempt received with username " + _username + " for tenant " + _tenantId);

		var msg = new SimpleMessage();
		msg.header.type = "login";
		msg.data["status"] = "true";
		msg.data["message"] = "login as " + _username + "@" + _tenantId + " succeeded";
		msg.data["tenantId"] = _tenantId;
		msg.data["username"] = _username;
		postMessage(msg);		

	}
}