/**
 * TenantWorkerObject
 * provides API function wrapper for all calls the the Tenant services
 */

function TenantWorkerObject() {
	var _endpoint 	= "../../../api/tenant.svc/";
	var _ajax		= new AJAX();
	var _lastResult	= null;
	
	this.GetAllTenants		= _getAllTenants;
	
	function _getAllTenants() {
		var _json = _ajax.GetNowAsText("GET", _endpoint + "all", null);
		
		if(_json!=_lastResult) {
			_lastResult = _json;
			return _json;
		}
		return null;
	}
}