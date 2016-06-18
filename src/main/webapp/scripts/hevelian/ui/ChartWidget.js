/**
 * ChartWidget.
 * UI compoment for rendering a chart widget.
 * 
 * @param _doc
 */
function ChartWidget() {
	var target						= null;
	var doc							= null;
	var id							= null;
	var container					= null;
	var worker						= null;
	var chart						= null;
	
	// stuff from the doc
	var _endpoint					= null;
	var _name						= null;
	var _method						= null;
	var _property					= null;
	var _indicator					= null;
	var _refresh					= 10;
	
	this.init			= _init;
	this.OnMessage		= _onMessage;
	
	function _init(_target, _doc) {
		doc 		= _doc;
		target 		= _target;

		id 			= getId() + "_chartwidget";
		
		_name 		= _doc.getElementsByTagName("name")[0].textContent;
		_endpoint 	= _doc.getElementsByTagName("endpoint")[0].textContent;
		_method 	= _doc.getElementsByTagName("method")[0].textContent;
		_property 	= _doc.getElementsByTagName("property")[0].textContent;
		_indicator 	= _doc.getElementsByTagName("indicator")[0].textContent;
		if(_doc.getAttribute("refresh")!=null) _refresh = _doc.getAttribute("refresh");
		
		// we draw the chart widget on the screen.
		_drawContainer();
		_drawChart();

		// initialise Worker object
		worker = new Worker("scripts/hevelian/workers/ChartWidgetWorker.js");
		worker.onmessage = this.OnMessage;

		var msg = new SimpleMessage();
		msg.header.type = "init";
		msg.data["endpoint"] = _endpoint;
		msg.data["method"] = _method;
		msg.data["property"] = _property;
		msg.data["refresh"] = _refresh;
		worker.postMessage(msg);		

	}
	
	function _onMessage(oEvent) {
		var _indicatorValue = 0;
		for(var i=0; i<oEvent.data.data.length; i++) {
			if(oEvent.data.data[i].name==_indicator) {
				_indicatorValue = oEvent.data.data[i].value
			}
			chart.data.labels[i] = oEvent.data.data[i].name;
			chart.data.datasets[0].data[i] = oEvent.data.data[i].value;
		}
		chart.update();
		
		document.getElementById("indicator_" + id).innerHTML = _indicatorValue + '%';
	}
	
	function _drawContainer() {
		var divMain = document.createElement("DIV");
		divMain.setAttribute("class", "panel panel-primary");
		target.appendChild(divMain);

		var divMainBody = document.createElement("DIV");
		divMain.setAttribute("class", "fixed-panel");
		divMain.appendChild(divMainBody);
		
		var divBodyText = document.createElement("DIV");
		divBodyText.setAttribute("class", "chart-text");
		divMainBody.appendChild(divBodyText);
		divBodyText.innerHTML = _name + '<br/><br/><span id="indicator_' + id +'" style="color: #d0d0d0; font-size: 32px;">100%</span>';
		
		// add canvas for the chart object
		container = document.createElement("canvas");
		container.setAttribute("class", "chart-canvas");
		divMainBody.appendChild(container);
		
	}

	/**
	 * We initialise the chart with 8 different colours and basic values. When the first update comes it
	 * will adjust the values and labels accordingly.
	 */
	function _drawChart() {
		chart = new Chart(container, {
		    type: 'doughnut',
		    data: {
		        labels: ["Active", "Inactive"],
		        datasets: [{
		            data: [100, 0],
		            backgroundColor: [
		      		    'rgba(54, 162, 235, 0.6)',
		                'rgba(255,99,132,0.6)',
		                'rgba(215,48,39, 0.6)',
		                'rgba(252,141,89, 0.6)',
		                'rgba(254,224,144, 0.6)',
		                'rgba(224,243,248, 0.6)',
		                'rgba(145,191,219, 0.6)',
		                'rgba(69,117,180, 0.6)'
		            ],
		            borderColor: [
		                'rgba(54, 162, 235, 1)',
		                'rgba(255,99,132,1)',
		                'rgba(215,48,39, 1)',
		                'rgba(252,141,89, 1)',
		                'rgba(254,224,144, 1)',
		                'rgba(224,243,248, 1)',
		                'rgba(145,191,219, 1)',
		                'rgba(69,117,180, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		    	legend: { display: false }
		    }
		});		
		
	}
}