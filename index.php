<?php
// web/index.php

// Required for Silex
require_once __DIR__.'/silex/vendor/autoload.php';

// Create silex instance
$app = new Silex\Application();

// definitions

$app['debug'] = true;

// routes

//  /blog route. Returns blogs by date from 3440-Tarrasque
$app->get ('/blog', function () {
    $query = "SELECT * FROM Blog_Entries ORDER BY Date desc";
    $sql = getConnection();
    $beer_list = $sql->query($query);
    $beer_array = $beer_list->fetchAll(PDO::FETCH_OBJ);
    $sql = null;
    return json_encode($beer_array);
}); 

//  /beer route. Returns beers by name
$app->get ('/beer/{season}/{order}', function ($season, $order) {
    // I apologize for doing this procedurally. I am a bad person because of
    // this. I saw doing an ORM as more of a hassle than anything.
    $query = "SELECT * FROM Beer ";
    $where_clause = "WHERE Season = '".$season."' AND ";
    $order_clause = "ORDER BY Name ".$order;
    $sql = getConnection();
    $beer_list = $sql->query($query.$where_clause.$order_clause);
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
