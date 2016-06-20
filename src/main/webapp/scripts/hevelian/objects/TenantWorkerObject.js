/**
 * TenantWorkerObject
 * provides API function wrapper for all calls the the Tenant services
 */

function TenantWorkerObject() {
	var _endpoint 	= "../../../api/tenant.svc/";
	var _ajax		= new AJAX();
	
	this.GetAllTenants		= _getAllTenants;
	
	function _getAllTenants() {
		var _json = _ajax.GetNowAsText("GET", _endpoint + "all", null);
		return _json;
	}
}