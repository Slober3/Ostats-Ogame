	var items = [];
    var economy = [];
	var military = [];
	var research = [];
$('#text').hide();
$('#main').hide();

$('#Total').hide();
$('#Eco').hide();
$('#Mil').hide();
$('#Re').hide();

var VerhaalPos = [
  ["Wauw wat een productieve dag is het voor jou!", "Je doet het goed Verder doen!", "Zo zo flink gestegen!", "Zie die puntjes maar rollen!"],
  ["Wat een vooruitgang we want more, more, much more!!!!.","Jackpot!! Je ontvangt iets heel speciaal."],
];

var VerhaalNeg = [
  ["Auw dit kan beter!","Niet stoppen nu alles komt wel goed!","Nop dit ziet er niet goed uit!","Dit gaat zo niet lukken..."],
  ["Ga naar de gevangenis betaal 150 euro... Ga niet langs start *Monopoly.","Je bent Gedaald. AUWTCH!!!"]
];

var quote = ["Stay positive and happy. Work hard and don't give up hope. Be open to criticism and keep learning. Surround yourself with happy, warm and genuine people.","I believe if you keep your faith, you keep your trust, you keep the right attitude, if you're grateful, you'll see God open up new doors.","Find a place inside where there's joy, and the joy will burn out the pain.","You cannot have a positive life and a negative mind.","Virtually nothing is impossible in this world if you just put your mind to it and maintain a positive attitude."];

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
		
		getRandomText(items);
		google.charts.load('current', {packages: ['corechart', 'line']});
		google.charts.setOnLoadCallback(drawCurveTypes);
    });

}
   function getRandomText(items) {
   
     var flickerAPIFail = "https://api.giphy.com/v1/gifs/random?api_key=a42e6d5c803c4e0e9111bfa3fdca4ea9&tag=fail&rating=G";
	 var flickerAPIWin = "https://api.giphy.com/v1/gifs/random?api_key=a42e6d5c803c4e0e9111bfa3fdca4ea9&tag=win&rating=G";
	  
   
   $('#text').hide();
   $('#text').empty();
       var randomFirst = Math.floor((Math.random() * 4));
	   var randomSecond = Math.floor((Math.random() * 2));
       var randomQuote = Math.floor((Math.random() * 5));
	 if ((items[0][1]-items[items.length-1][1]) < 0) {
		$( ".text" ).append( "<p>"+VerhaalPos[0][randomFirst]+"</p>" );
		$( ".text" ).append( "<p>"+VerhaalPos[1][randomSecond]+"</p>" );
		$( ".text" ).append( "<p>"+quote[randomQuote]+"</p>" )
				$( ".text" ).append( "<p>Je bent "+(items[items.length-1][1]-items[0][1])+" puntjes gestegen</p>" )
				$( ".text" ).append( "<p></p>" )
				
				$.getJSON( flickerAPIWin, {
    format: "json"
  })
    .done(function( data ) {
        $( "<img class='displayed' style='display:block;  margin:auto;'>" ).attr( "src", data.data.image_url ).appendTo( "#text" );
    });
	
					$( ".text" ).append( "<p></p>" )

				
		} else {
		$( ".text" ).append( "<p>"+VerhaalNeg[0][randomFirst]+"</p>" );
		$( ".text" ).append( "<p>"+VerhaalNeg[1][randomSecond]+"</p>" );
		$( ".text" ).append( "<p>"+quote[randomQuote]+"</p>" )
				$( ".text" ).append( "<p>Je bent "+(items[0][1]-items[items.length-1][1])+" puntjes gedaald. Volgende keer beter!</p>" )
				$( ".text" ).append( "<p></p>" )
				
				
				  $.getJSON( flickerAPIFail, {
    format: "json"
  })
    .done(function( data ) {
        $( "<img class='displayed' style='display:block;  margin:auto;'>" ).attr( "src", data.data.image_url ).appendTo( "#text" );
    });
	
					$( ".text" ).append( "<p></p>" )

	
		}  
$('#text').show();

   }
   
function drawCurveTypes() {
$('#Total').hide();
$('#Eco').hide();
$('#Mil').hide();
$('#Re').hide();
$('#main').hide();

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
      researchd.addColumn('number', 'Research');
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
        },
		width: '100%'
      };
$('#main').show();

$('#Total').show();
$('#Eco').show();
$('#Mil').show();
$('#Re').show();

      var chart = new google.visualization.LineChart(document.getElementById('Total'));
      chart.draw(data, options);
	  
	  var charte = new google.visualization.LineChart(document.getElementById('Eco'));
      charte.draw(economyd, options);
	  
	  var chartr = new google.visualization.LineChart(document.getElementById('Re'));
      chartr.draw(researchd, options);
	  
	  var chartm = new google.visualization.LineChart(document.getElementById('Mil'));
      chartm.draw(militaryd, options);
	  

	  chart=null;
	  charte=null;
	  chartm=null;
	  chartr=null;
	  	items = [];
    economy = [];
	military = [];
	research = [];

    }
	
