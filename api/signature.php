<?php
 /*
$nick = $_GET["nick"];
$img = $_GET["img"];
$text = "Points: ";

$json = file_get_contents('http://herexaam.be/Ostats/api/display_highscores.php?player='.$nick);
$jsonDecoded = json_decode($json);
  //Set the Content Type
  header('Content-type: image/jpeg');
 
  // Create Image From Existing File
  $jpg_image = imagecreatefromjpeg($img);
 
  // Allocate A Color For The Text
  $white = imagecolorallocate($jpg_image, 255, 255, 255);
  //$t2 = imagecolorallocate($jpg_image, 0, 255, 0);
  //$t3 = imagecolorallocate($jpg_image, 255, 0, 0);
 
  // Set Path to Font File
  $font_path = 'LibreBarcode39Text-Regular.ttf';
 
 
  // Print Text On Image
  imagettftext($jpg_image, 22, 0, 258, 45, $white, $font_path, $text);
  //imagettftext($jpg_image, 20, 0, 258, 75, $t2, $font_path, $text2);
  //imagettftext($jpg_image, 20, 0, 258, 95, $t3, $font_path, $text3);
 
  // Send Image to Browser
  imagejpeg($jpg_image);
 
  // Clear Memory
  imagedestroy($jpg_image);
  */
  
$nick = $_GET["nick"];


$json = file_get_contents('http://herexaam.be/Ostats/api/display_highscores.php?player='.$nick);
$jsonDecoded = json_decode($json); 
// Set the content-type
header('Content-Type: image/png');

// Create the image
$im = imagecreatetruecolor(400, 50);

// Create some colors
$white = imagecolorallocate($im, 255, 255, 255);
$black = imagecolorallocate($im, 0, 0, 0);
imagefilledrectangle($im, 0, 0, 399, 29, $white);

// The text to draw
$text = 'Testing...';
// Replace path by your own font path
$font = './Merriweather-Regular.ttf';

// Add the text
imagettftext($im, 30, 0, 10, 20, $black, $font, $text);

// Using imagepng() results in clearer text compared with imagejpeg()
imagepng($im);
imagedestroy($im);

?>