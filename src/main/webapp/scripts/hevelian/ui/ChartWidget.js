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
	
	this.init			= _init;
	
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
		divBodyText.innerHTML = 'Active Tenants<br/><br/><span style="color: #d0d0d0; font-size: 32px;">90%</span>';
		
		// add canvas for the chart object
		container = document.createElement("canvas");
		container.setAttribute("class", "chart-canvas");
		divMainBody.appendChild(container);
		
		
		_drawChart();
	}
	
	function _drawChart() {
		
		// FAKE DATA 
		var myChart = new Chart(container, {
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