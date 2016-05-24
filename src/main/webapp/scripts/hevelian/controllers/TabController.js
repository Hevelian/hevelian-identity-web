/**
 * (C) Brookes Management B.V. 2015
 * The TabController manages the main tabs at the top of the screen and all its events.
 * 
 * @returns
 */
function TabController() {
	var target						= null;
	var doc							= null;
	var id							= null;
	
	this.init						= _init;
	this.EventClick					= _handlerClick;
	this.EventMouseOver				= _handlerMouseOver;
	this.EventMouseOut				= _handlerMouseOut;
	
	var currentTab					= 0;
	var controllers					= [];
	
	/**
	 * This draws the initial tabbar and its associated tabs on the screen and enables
	 * and mouse event handlers.
	 * @param _target
	 * @param _doc
	 */
	function _init(_target, _doc) {
		target 	= _target;
		doc 	= _doc;
		
		id = getId() + "_tab";
		
		target.setAttribute("class", "tab_header");
		
		var curTab = 0;
		for(var i=0; i<doc.childNodes.length; i++) {
			if(doc.childNodes[i].nodeType!=1) continue;
			if(doc.childNodes[i].nodeName!="tab") continue;
			
			/* for each tab, create a tab button */
			var tab = document.createElement("DIV");
			if(curTab==0) {
				tab.setAttribute("class", "div_tab div_tab_current");
			} else {
				tab.setAttribute("class", "div_tab");
			}
			
			tab.setAttribute("id", id + "_" + curTab);
			tab.innerHTML 			= doc.childNodes[i].firstChild.nodeValue;
			tab.onclick 			= this.EventClick;
			tab.onmouseover			= this.EventMouseOver;
			tab.onmouseout			= this.EventMouseOut;
			target.appendChild(tab);
			
			// create the containers
			var container = document.createElement("DIV");
			container.setAttribute("id", id + "_container_" + curTab);
			container.setAttribute("class", "tab_content");
			if(curTab!=0) {
				container.style.display = 'none';
			}
			target.appendChild(container);
			
			/* initialise the controller for the child node */
			var controllerName = doc.childNodes[i].getAttribute("controller");
			var controller = new (GetController(controllerName))();
			controller.init(container, doc.childNodes[i]);
			
			controllers[controllers.length] = controller;
			curTab++;
		}
		var tabLogout = document.createElement("DIV");
		tabLogout.setAttribute("class", "tab_logout");
		target.appendChild(tabLogout);
		tabLogout.innerHTML = "logout";
		tabLogout.onclick = function() {document.location.href = "index.html";}
		
		var thinBlueLine = document.createElement("DIV");
		thinBlueLine.setAttribute("class", "thinBlueLine");
		target.appendChild(thinBlueLine);
		
		controllers[0].focus();
	}
	
	/**
	 * Event handler for OnClick event
	 * @param e
	 */
	function _handlerClick(e) {
		document.getElementById(e.target.id).setAttribute("class", "div_tab div_tab_current");
		document.getElementById(id + "_" + currentTab).setAttribute("class", "div_tab");
		document.getElementById(id + "_container_" + currentTab).style.display = 'none';
		
		var idParts = e.target.id.split("_");
		currentTab = idParts[idParts.length-1];
		document.getElementById(id + "_container_" + currentTab).style.display = 'block';
	}
	
	/**
	 * Event handler for OnMouseOver event
	 * @param e
	 */
	function _handlerMouseOver(e) {
		var idParts = e.target.id.split("_");
		if(idParts[idParts.length-1]==currentTab) return;
		document.getElementById(e.target.id).setAttribute("class", "div_tab div_tab_current");
	}
	
	/**
	 * Event handler for OnMouseOut event
	 * @param e
	 */
	function _handlerMouseOut(e) {
		var idParts = e.target.id.split("_");
		if(idParts[idParts.length-1]==currentTab) return;
		document.getElementById(e.target.id).setAttribute("class", "div_tab");
	}
}