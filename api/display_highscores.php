<?php
include '../includes/config.php';

// connect to the database

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// What command was used?
/*
SELECT highscores.id, players.player_name, highscores.total, highscores.economy, highscores.research, highscores.military FROM highscores INNER JOIN players ON highscores.player_id=players.player_id;
*/
	filter_var($specification, FILTER_VALIDATE_IP) ? : $specification = '127.0.0.1';
	$stmt = $conn->prepare("SELECT highscores.id, players.player_name, highscores.total, highscores.economy, highscores.research, highscores.military FROM highscores INNER JOIN players ON highscores.player_id=players.player_id WHERE  players.player_name=:player");
	$stmt->bindParam(':player', $_GET["player"], PDO::PARAM_STR);

// Excecute SQL statement

$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Convert to json and print

$json = json_encode($results);
print htmlspecialchars($json, ENT_NOQUOTES);

// Close connection
$conn = null;
?>