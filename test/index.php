<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');


include 'CRD.php';

$method = $_SERVER['REQUEST_METHOD'];
$user = new User();

switch($method) {
case "GET":
    $users = $user->getAllUsers();
    echo json_encode($users);
    break;
case "POST":
    $userObj = json_decode(file_get_contents('php://input'));
    $response = $user->createUser($userObj);
    echo json_encode($response);
    break;
case "DELETE":
    $userObj = json_decode(file_get_contents('php://input'));
    $response = $user->deleteSelectedRecords($userObj);
    echo json_encode($response);
    break;
}

