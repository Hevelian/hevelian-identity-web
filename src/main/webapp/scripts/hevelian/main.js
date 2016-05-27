/**
 * (C) Brookes Management B.V. 2016
 * 
 * Functions for login and main screen.
 */

function InitialiseMainController() {
	var URL_TEMPLATE_MAIN = "api/ui.svc/template?name=index";
	
	var ajax = new Hevelian.con.AJAX();
	var doc = ajax.GetNowAsXML("GET", URL_TEMPLATE_MAIN, "");
	
	var mc = new Hevelian.controller.MainController();
	mc.init(document.getElementById("main"), doc);
}

function GetController(name) {
	for(var prop in Hevelian.controller) {
		if(prop==name) return eval(prop);
	}
	return null;
}

function getId() {
	Hevelian.objects[Hevelian.objects.length] = [];
	return Hevelian.objects.length;
}