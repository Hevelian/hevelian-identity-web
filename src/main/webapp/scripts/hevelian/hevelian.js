/**
 * Hevelian global objects.
 */

// session & authentication
var Hevelian = {};
Hevelian.auth = {};
Hevelian.auth.Authenticator = Authenticator;
Hevelian.auth.Session = new SessionController();

//connection stuff
Hevelian.con = {};
Hevelian.con.AJAX = AJAX;

console.log("Hevelian Initialised.");