<?php

include 'DbConnect.php';


class User {
    private $conn;

    public function __construct() {
        $objDb = new DbConnect;
        $this->conn = $objDb->connect();
    }

    public function getAllUsers() {
        $sql = "SELECT * FROM users";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createUser($user) {
        $sql = "INSERT INTO users(sku, name, price, type, height, width, length, size, weight) VALUES(:sku, :name, :price, :type, :height, :width, :length, :size, :weight)";
        $stmt= $this->conn->prepare($sql);

        $stmt->bindParam(':sku', $user->sku);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':price', $user->price);
        $stmt->bindParam(':type', $user->type);
        $stmt->bindParam(':height', $user->height);
        $stmt->bindParam(':width', $user->width);
        $stmt->bindParam(':length', $user->length);
        $stmt->bindParam(':size', $user->size);
        $stmt->bindParam(':weight', $user->weight);

        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        
        return $response;
    }
    public function deleteSelectedRecords($ids) {
      $data = json_decode(file_get_contents('php://input'), true);
        $ids = implode(',', $data['ids']);
        $sql = "DELETE FROM users WHERE id IN ($ids)";
        $stmt = $this->conn->prepare($sql);
        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Records deleted successfully.'];
        }else {
            $response = ['status' => 0, 'message' => 'Failed to delete records.'];
        }
        echo json_encode($response);
    }
}