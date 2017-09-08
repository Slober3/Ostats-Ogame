<?php
include '../includes/config.php';
include 'SimpleDOM.php';


/*
DO NOT EDIT ANYTHING BEYOND THIS POINT UNLESS YOU KNOW WHAT YOU'RE DOING!!!
*/

//Clear Player DB
try {
    $dbh = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$clear = "TRUNCATE players";
	$dbh->exec($clear);
    echo "Cleared... <br />";
	}
catch(PDOException $e)
    {
    echo "<br>" . $e->getMessage();
    }	
	
//Get new players
$url = "https://s124-nl.ogame.gameforge.com/api/players.xml";
$xml = simplexml_load_file($url);
$max = sizeof($xml);

$id="id";
$name="name";

for($i = 0; $i < $max;$i++)
{

try{

	$stmt = $dbh->prepare("INSERT INTO players (player_id, player_name) VALUES (:player_id, :player_name)");
	$stmt->bindParam(':player_id', $xml->player[$i]->attributes()->$id);
	$stmt->bindParam(':player_name', $xml->player[$i]->attributes()->$name);

    // use exec() because no results are returned
    $stmt->execute();

    echo "New record created successfully";
    }
catch(PDOException $e)
    {
    echo $stmt . "<br>" . $e->getMessage();
    }



}

	
//Get Highscores
$url_total = "https://s124-nl.ogame.gameforge.com/api/highscore.xml?category=1&type=0";
$xml_total = simplexml_load_file($url_total);

$url_eco = "https://s124-nl.ogame.gameforge.com/api/highscore.xml?category=1&type=1";
$xml_eco = simplexml_load_file($url_eco);

$url_re = "https://s124-nl.ogame.gameforge.com/api/highscore.xml?category=1&type=2";
$xml_re = simplexml_load_file($url_re);

$url_mil = "https://s124-nl.ogame.gameforge.com/api/highscore.xml?category=1&type=3";
$xml_mil = simplexml_load_file($url_mil);



$max = sizeof($xml_total);

$id="id";
$score="score";
$treesm = $xml_mil->xpath('/highscore/player');
$treest = $xml_total->xpath('/highscore/player');
$treese = $xml_eco->xpath('/highscore/player');
$treesr = $xml_re->xpath('/highscore/player');

function sort_player($t1, $t2) {
    return strcmp($t1['id'], $t2['id']);
}

usort($treesm, 'sort_player');
usort($treese, 'sort_player');
usort($treest, 'sort_player');
usort($treesr, 'sort_player');

for($i = 0; $i < $max;$i++)
{

try{

	$stmt = $dbh->prepare("INSERT INTO highscores (player_id, total,economy,research,military) VALUES (:player_id, :total, :economy, :research, :military)");
	$stmt->bindParam(':player_id', $treest[$i]->attributes()->$id);
	$stmt->bindParam(':total', $treest[$i]->attributes()->$score);
	$stmt->bindParam(':economy', $treese[$i]->attributes()->$score);
	$stmt->bindParam(':research', $treesr[$i]->attributes()->$score);
	$stmt->bindParam(':military', $treesm[$i]->attributes()->$score);

    // use exec() because no results are returned
    $stmt->execute();

    echo "New record created successfully";
    }
catch(PDOException $e)
    {
    echo $stmt . "<br>" . $e->getMessage();
    }



}

$dbh = null;

?>