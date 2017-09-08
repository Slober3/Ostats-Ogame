<?php
$url = "https://s124-nl.ogame.gameforge.com/api/players.xml";
$xml = simplexml_load_file($url);

$id="id";

$max = sizeof($xml);
for($i = 0; $i < $max;$i++)
{

  foreach($xml->player[$i]->attributes() as $a => $b) {
    //echo $a,'="',$b,"\"\n";
}
echo $xml->player[$i]->attributes()->$id;
}


//print_r($xml);

?>
