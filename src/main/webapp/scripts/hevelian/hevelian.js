/**
 * Hevelian global objects.
 */

// session & authentication
var Hevelian = {};
Hevelian.auth = {};
Hevelian.auth.Authenticator = Authenticator;
Hevelian.auth.Session = new SessionController();

Hevelian.controller = {};
Hevelian.controller.MainController 		= MainController;
Hevelian.controller.TabController 		= TabController;
Hevelian.controller.TenantController 	= TenantController;

Hevelian.controller.HelloController 	= HelloController;		// debug/test controller

Hevelian.controller.active = {};

//connection stuff
Hevelian.con = {};
Hevelian.con.AJAX = AJAX;

Hevelian.objects = [];

console.log("Hevelian Initialised.");