<?php
// web/index.php

require_once __DIR__.'/silex/vendor/autoload.php';

$app = new Silex\Application();

// definitions

$app['debug'] = true;

// routes

$app->get ('/blog', function () {
    $query = "SELECT * FROM Beer ORDER BY Name desc";
    $sql = getConnection();
    $beer_list = $sql->query($query);
    $beer_array = $beer_list->fetchAll(PDO::FETCH_OBJ);
    $sql = null;
    return json_encode($beer_array);
}); 

// Authorization

function getConnection() {
    $dbhost = "localhost";
    $dbuser = "wyattpj";
    $dbpass = "900458270";
    $dbname = "3440-Tarrasque";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}

$app->run();
?>
