<?php
require __DIR__ . '/vendor/autoload.php';

// Create Router instance
$router = new \Bramus\Router\Router();

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();
$appEnv = $_ENV['APP_ENV'];


function json_response($data=null, $httpStatus=200)
{
    header("Content-Type: application/json");
    http_response_code($httpStatus);
    echo $data;
    exit();
}

// Define routes


$router->get('/payment-plugin', function() {
    include('src/payment-plugin.php');
});

// Add base route (startpage)
$router->get('/', function() use($appEnv) {
    include('src/checkout.php');
});

$router->set404(function() {
    header('HTTP/1.1 404 Not Found');
    include('error.php');
    // ... do something special here
});
// ...

$router->get('/referrer', function() {
    //define which page you want to display while user hit main page.
    include('testReferral.php');
});

// Run it!
$router->run();