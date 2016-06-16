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
	
	this.init			= _init;
	this.OnMessage		= _onMessage;
	
	function _init(_target, _doc) {
		doc 		= _doc;
		target 		= _target;

		id 			= getId() + "_chartwidget";
		
		var divMain = document.createElement("DIV");
		divMain.setAttribute("class", "panel panel-primary");
		target.appendChild(divMain);

		var divMainBody = document.createElement("DIV");
		divMain.setAttribute("class", "fixed-panel");
		divMain.appendChild(divMainBody);
		
		var divBodyText = document.createElement("DIV");
		divBodyText.setAttribute("class", "chart-text");
		divMainBody.appendChild(divBodyText);
		divBodyText.innerHTML = 'Active Tenants<br/><br/><span id="indicator_' + id +'" style="color: #d0d0d0; font-size: 32px;">90%</span>';
		
		// add canvas for the chart object
		container = document.createElement("canvas");
		container.setAttribute("class", "chart-canvas");
		divMainBody.appendChild(container);
		
		worker = new Worker("scripts/hevelian/workers/ChartWidgetWorker.js");
		worker.onmessage = this.OnMessage;

		var msg = new SimpleMessage();
		msg.header.type = "init";
		worker.postMessage(msg);		

		_drawChart();
	}
	
	function _onMessage(oEvent) {
		console.log("ChartWidget got message");
		console.log("ChartWidget Event: active: " + oEvent.data.data["active"]);
		console.log("ChartWidget Event: inactive: " + oEvent.data.data["inactive"]);
		
		chart.data.datasets[0].data[0] = oEvent.data.data["active"];
		chart.data.datasets[0].data[1] = oEvent.data.data["inactive"];
		chart.update();
		
		document.getElementById("indicator_" + id).innerHTML = oEvent.data.data["active"] + '%';
	}
	
	function _drawChart() {
		
		// FAKE DATA 
		chart = new Chart(container, {
		    type: 'doughnut',
		    data: {
		        labels: ["Active", "Inactive"],
		        datasets: [{
		            label: '# of Votes',
		            data: [90, 10],
		            backgroundColor: [
		                'rgba(54, 162, 235, 0.6)',
		                'rgba(255, 99, 132, 0.6)'
		            ],
		            borderColor: [
		                'rgba(54, 162, 235, 1)',
		                'rgba(255,99,132,1)'
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