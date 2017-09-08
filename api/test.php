<?php
include 'SimpleDOM.php';
	
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

    echo "BEGIN ".$treesr[$i]->attributes()->$id.$treesm[$i]->attributes()->$id.$treese[$i]->attributes()->$id.$treese[$i]->attributes()->$id." DONE <br />";
}
echo "<br /><br /><br /><br /><br /><br /><br />";
print_r ($treesm[0]->attributes()->$id);


?>