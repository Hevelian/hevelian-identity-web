/**
 * SessionWorkerObject
 * Performs all the session actions on behalf of the SessionWorker.
 */

function SessionWorkerObject() {
	
	this.login = _login;
	
	function _login(_username, _password, _tenantId) {
		postMessage("SessionWorker: login attempt received with username " + _username + " for tenant " + _tenantId);
	}
}