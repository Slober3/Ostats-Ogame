	var items = [];
    var economy = [];
	var military = [];
	var research = [];
	
	$("#ipInput").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#serachip").click();
    }
});

   function getIP() {
$.getJSON("http://herexaam.be/Ostats/api/display_highscores.php?player="+$("#ipInput").val(), function(data) {
		var intv=0; 		
		
        $.each(data, function(key, val) {
            items.push([intv,parseInt(val.total)]);
            economy.push([intv,parseInt(val.economy)]);
            military.push([intv,parseInt(val.military)]);
            research.push([intv,parseInt(val.research)]);

			intv++;
        });
		
		google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);
    });

}

function drawCurveTypes() {
$('#Total').empty();
$('#Eco').empty();
$('#Mil').empty();
$('#Re').empty();

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Total');
      data.addRows(items);
	  
	  var economyd = new google.visualization.DataTable();
      economyd.addColumn('number', 'X');
      economyd.addColumn('number', 'Economy');
      economyd.addRows(economy);
	  
	  var militaryd = new google.visualization.DataTable();
      militaryd.addColumn('number', 'X');
      militaryd.addColumn('number', 'Military');
      militaryd.addRows(military);
	  
	  var researchd = new google.visualization.DataTable();
      researchd.addColumn('number', 'X');
      researchd.addColumn('number', 'researchd');
      researchd.addRows(research);
	 
		items = [];
    economy = [];
	military = [];
	research = [];
	
      var options = {
        hAxis: {
          title: $("#ipInput").val()
        },
        vAxis: {
          title: 'Aantal punten'
        },
        series: {
          1: {curveType: 'function'}
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('Total'));
      chart.draw(data, options);
	  
	  var charte = new google.visualization.LineChart(document.getElementById('Eco'));
      charte.draw(economyd, options);
	  
	  var chartm = new google.visualization.LineChart(document.getElementById('Mil'));
      chartm.draw(militaryd, options);
	  
	  var chartr = new google.visualization.LineChart(document.getElementById('Re'));
      chartr.draw(researchd, options);
	  
	  chart=null;
	  charte=null;
	  chartm=null;
	  chartr=null;
	  	items = [];
    economy = [];
	military = [];
	research = [];

	  
    }
	
