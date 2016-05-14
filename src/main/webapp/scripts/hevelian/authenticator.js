/**
 * (C) Brookes Management B.V. 2015
 * 
 * The authenticator handles all authentication and authorisation services with the back-end.
 * The services are wrapped in simple functions.
 */
function Authenticator() {
	
	var URL_LOGIN					= "io/authentication.svc/login?"
	var fLoggedIn					= false;
	
	this.Login						= _login;
	this.IsLoggedIn					= _isLoggedIn;
	
	function _login(username, password) {
		var ajax = new Hevelian.con.AJAX();
		var doc = ajax.GetNowAsXML("GET", URL_LOGIN + "username=" + username + "&password=" + password, "");
		var Message = "";
		
		var StatusCode = doc.getElementsByTagName("Status")[0].getElementsByTagName("Code")[0].firstChild.nodeValue;
		if(StatusCode=="FAIL") {
			var Message = doc.getElementsByTagName("Status")[0].getElementsByTagName("Message")[0].firstChild.nodeValue;
		} else {
			fLoggedIn = true;
		}
		
		var msgObj = document.getElementById("frmMessage");
		if(msgObj!=null && Message!='undefined') {
			msgObj.innerHTML = Message;
		}
	}
	
	function _isLoggedIn() {
		return fLoggedIn;
	}
}