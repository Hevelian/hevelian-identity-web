
/**
 * (C) Brookes Management B.V. 2015
 * This is an example/sample/test controller, used as a placeholder in some layouts until
 * they are fully inplemented.
 */
function HelloController() {
	var target						= null;
	var doc							= null;
	var id							= null;

	this.init						= _init;
	this.focus						= _focus;
	
	
	function _init(_target, _doc) {
		target 		= _target;
		doc 		= _doc;

		var date 	= new Date();
		id 			= getId() + "_hello";
		
		_target.innerHTML = "Hello World from " + id;
	}
	
	function _focus() {
		target.innerHTML = "Hello World from " + id;
	}
}