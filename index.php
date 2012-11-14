<?php
// web/index.php

require_once __DIR__.'/silex/vendor/autoload.php';

$app = new Silex\Application();

// definitions

$app['debug'] = true;

// routes

$app->get ('/blog', function () {
    return "Hello World";
}); 



$app->run();
?>
