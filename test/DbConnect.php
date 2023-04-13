<?php 

class DbConnect {
    
    private $server = 'sql205.epizy.com';
    private $dbname = 'epiz_34001535_reactcrd';
    private $user = 'epiz_34001535';
    private $pass = 'Qp4tdcJGqPJm';


    public function connect() {
        try {
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }

}



?>