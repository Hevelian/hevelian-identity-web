/**
 * TenantWorkerObject
 * provides API function wrapper for all calls the the Tenant services
 */

function TenantWorkerObject() {
	var _endpoint 	= "../../../api/tenant.svc/";
	var _ajax		= new AJAX();
	var _lastResult	= null;
	
	this.GetAllTenants		= _getAllTenants;
	this.AddTenant			= _addTenant;
	
	function _getAllTenants() {
		var _json = _ajax.GetNowAsText("GET", _endpoint + "all", null);
		
		if(_json!=_lastResult) {
			_lastResult = _json;
			return _json;
		}
		return null;
	}
	
	function _addTenant(_data) {
		var _postdata = "frm_domain=" + encodeURIComponent(_data["name"]) + "&frm_username=" 
			+ encodeURIComponent(_data["username"]) + "&frm_password=" 
			+ encodeURIComponent(_data["password"]);
		
		var _result = _ajax.GetNowAsText("POST", _endpoint + "tenant", _postdata);
		console.log("WORKER: ADD TENANT: " + _result);
	}
}