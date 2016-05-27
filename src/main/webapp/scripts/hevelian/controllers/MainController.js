/**
 * (C) Brookes Management B.V. 2015
 * 
 * There should only ever be one instance of a MainController. It handles the
 * initial page layout and initialises the other controllers as required.
 */
function MainController() {
	
	this.init						= _init;
	
	/**
	 * Target is the DOM object to write the page contents to. Doc contains the layout template and linked controllers.
	 * @param target
	 * @param doc
	 */
	function _init(target, doc) {
		var NodeUI = doc.getElementsByTagName("ui")[0];
		
		for(var i=0; i<NodeUI.childNodes.length; i++) {
			if(NodeUI.childNodes[i].nodeType!=1) continue;
			
			/* create a container for the child node */
			var container = document.createElement("DIV");
			container.setAttribute("id", "mainDiv");
			target.appendChild(container);
			
			/* initialise the controller for the child node */
			var controllerName = NodeUI.childNodes[i].getAttribute("controller");
			var controller = new (GetController(controllerName))();
			controller.init(container, NodeUI.childNodes[i]);
		}

	}
}