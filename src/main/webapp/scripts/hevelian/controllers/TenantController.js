/**
 * (C) Brookes Management B.V. 2016
 */
function TenantController() {
	var target						= null;
	var doc							= null;
	var id							= null;
	var container					= null;
	var widgetRow					= null;
	var widgets						= [];
	var worker						= null;
	var grid						= null;
	var _me							= this;
	
	var dataRowTable				= null;
	var dataHeaderCountColumn		= null;
	
	this.init						= _init;
	this.focus						= _focus;
	this.OnMessage					= _onMessage;
	this.ClickAddTenantButton		= _handlerClickAddTenantButton;
	this.NewTenant					= _newTenant;
	
	
	function _init(_target, _doc) {
		target 		= _target;
		doc 		= _doc;

		var date 	= new Date();
		id 			= getId() + "_tenant";
		
		// initialise Worker object
		worker = new Worker("scripts/hevelian/workers/TenantWorker.js");
		worker.onmessage = this.OnMessage;

		var msg = new SimpleMessage();
		msg.header.type = "init";
		worker.postMessage(msg);
		
		Hevelian.controller.active.TenantController = _me;
		
	}
	
	function _focus() {
		if(container==null) {
			_createContainer();
		} else {
			// refresh the data and un-pause the worker
		}
	}
	
	function _onMessage(oEvent) {
		console.log("TenantController: got message: " + oEvent);
		Hevelian.controller.active.FooterController.AddMessage("Tenant Controller Received Event Message");
		
		if(oEvent.data.header.type=='all') {
			dataRowTable.innerHTML = "";
			var panel = document.createElement("DIV");
			panel.setAttribute("class", "panel panel-default");
			dataRowTable.appendChild(panel);
			
			var panelHeader = document.createElement("DIV");
			panelHeader.setAttribute("class", "panel-heading");
			panel.appendChild(panelHeader);

			var tenants = JSON.parse(oEvent.data.data[0]);
			
			if(grid==null) {
				grid = new TenantGrid(tenants, panel, dataHeaderCountColumn, doc.getElementsByTagName("grid")[0]);
				grid.init();
			} else {
				grid.Refresh(tenants);
			}
			
			var str = '<table class="table table-striped table-hover table-bordered table-condensed">';
				str += '<thead><tr><th>Name</th><th>admin user</th><th>active</th></tr></thead>';
				str += '<tbody>';

				dataHeaderCountColumn.innerHTML = "showing " +tenants.length+ " of " + tenants.length;
				for(var i=0; i<tenants.length; i++) {
					console.log("TenantController: got tenant: " + tenants[i].domain);
					str += '<tr><td>'+tenants[i].domain+'</td><td>'+tenants[i].adminName+'</td><td>'+tenants[i].active+'</td></tr>';
				}
				str += '</tbody>';
			str += '</table>';
			
			panelHeader.innerHTML = "Tenants";
			panel.innerHTML += str;
			
		}
	}
	
	function _handlerClickAddTenantButton(e) {

		if(document.getElementById('modalPanel')==null) {
			var divModal = document.createElement("DIV");
			divModal.setAttribute("id", "modalPanel");
			divModal.setAttribute("class", "modal fade");
			divModal.setAttribute("role", "dialog");
			document.getElementById("main").appendChild(divModal);
		}

		$('#modalPanel').load("panels/edit_tenant.html", function() {
			$(this).modal('show');
		});
		
	}

	function _newTenant(_name, _username, _password) {
		var msg = new SimpleMessage();
		msg.header.type = "addTenant";
		msg.data["name"] = _name;
		msg.data["username"] = _username;
		msg.data["password"] = _password;
		worker.postMessage(msg);

	}
	
	function _createContainer() {
		
		container = document.createElement("DIV");
		container.setAttribute("class", "container hevelian-container");
		target.appendChild(container);
		
		widgetRow = document.createElement("DIV");
		widgetRow.setAttribute("class", "row");
		container.appendChild(widgetRow);
		
		var widgetNodes = doc.getElementsByTagName("widgets")[0];
		for(var i=0; i<widgetNodes.childNodes.length; i++) {
			var node = widgetNodes.childNodes[i];
			if(node.nodeName!="widget") continue;
			
			// we have a widget node
			var chartWidget = new ChartWidget();
			chartWidget.init(widgetRow, node);
			widgets[widgets.length] = chartWidget;
			
		}
		
		var dataHeaderRow = document.createElement("DIV");
		dataHeaderRow.setAttribute("class", "row row-padding");
		container.appendChild(dataHeaderRow);
			
		var dataHeaderNewButtonColumn = document.createElement("DIV");
		dataHeaderNewButtonColumn.setAttribute("class", "col-md-2 row-padding");
		dataHeaderRow.appendChild(dataHeaderNewButtonColumn);
		
		dataHeaderCountColumn = document.createElement("DIV");
		dataHeaderCountColumn.setAttribute("class", "col-md-6");
		dataHeaderRow.appendChild(dataHeaderCountColumn);

		var dataHeaderEmptyColumn = document.createElement("DIV");
		dataHeaderEmptyColumn.setAttribute("class", "col-md-4");
		dataHeaderRow.appendChild(dataHeaderEmptyColumn);

		// DEBUG - FAKE DATA
		dataHeaderNewButtonColumn.innerHTML = '<p><a class="btn btn-default btn-sm" id="buttonNewTenant" role="button">New Tenant</a></p>';
		dataHeaderCountColumn.innerHTML = 'Showing 5 of 5 tenants';
		dataHeaderCountColumn.style.paddingTop = "14px";
		dataHeaderCountColumn.style.textAlign = "right";
		dataHeaderEmptyColumn.innerHTML = '<a class="btn btn-default btn-sm" href="#" role="button">Delete</a>&nbsp;<a class="btn btn-default btn-sm" href="#" role="button">Edit</a>';
		dataHeaderEmptyColumn.style.textAlign = "right";
		dataHeaderEmptyColumn.style.paddingRight = "0px";
		
		var dataRow = document.createElement("DIV");
		dataRow.setAttribute("class", "row row-padding");
		container.appendChild(dataRow);
			
		dataRowTable = document.createElement("DIV");
		dataRowTable.setAttribute("class", "col-md-8 row-padding");
		dataRow.appendChild(dataRowTable);
		
		var dataRowPanel = document.createElement("DIV");
		dataRowPanel.setAttribute("class", "col-md-4 col-inspector");
		dataRow.appendChild(dataRowPanel);
		
		document.getElementById("buttonNewTenant").onclick = _me.ClickAddTenantButton;
		
		_createDataTable(dataRowTable);
		_createInspectorPanel(dataRowPanel);
	}
	
	// FAKED DATA
	function _createInspectorPanel(_panelTarget) {
		var panel = document.createElement("DIV");
		panel.setAttribute("class", "panel panel-default");
		_panelTarget.appendChild(panel);
		
		var panelHeader = document.createElement("DIV");
		panelHeader.setAttribute("class", "panel-heading");
		panel.appendChild(panelHeader);
		
		var panelBody = document.createElement("DIV");
		panelBody.setAttribute("class", "panel-body");
		panel.appendChild(panelBody);
		
		panelHeader.innerHTML = 'Tenant Inspector';
		panelBody.innerHTML = '<img src="images/logo_login_info.png" style="width: 100px"/><br/><br/><b>anotherTenant</b><br/>Admin User: yuriy';
	}
	
	// FAKED DATA
	function _createDataTable(_dataTarget) {
		
		// TEST - send message to get all tenants
		var _msg = new SimpleMessage();
		_msg.header.type = 'all';
		worker.postMessage(_msg);
		
		/*
		var panel = document.createElement("DIV");
		panel.setAttribute("class", "panel panel-default");
		_dataTarget.appendChild(panel);
		
		var panelHeader = document.createElement("DIV");
		panelHeader.setAttribute("class", "panel-heading");
		panel.appendChild(panelHeader);

		var str = '<table class="table table-striped table-hover table-bordered table-condensed">';
			str += '<thead><tr><th>Name</th><th>admin user</th><th>active</th></tr></thead>';
			str += '<tbody><tr><td>myFirstDomain</td><td>bob</td><td>true</td></tr>';
			str += '<tr class="info"><td>anotherTenant</td><td>yuriy</td><td>true</td></tr>';
			str += '<tr><td>someDomain</td><td>colin</td><td>true</td></tr>';
			str += '<tr><td>a_domain</td><td>billie_bob_thornton</td><td>true</td></tr>';
			str += '<tr><td>domain_001</td><td>admin</td><td>false</td></tr></tbody>';
		str += '</table>';
		
		panelHeader.innerHTML = "Tenants";
		panel.innerHTML += str;
		*/
	}
}