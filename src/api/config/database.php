<?php
// used to get mysql database connection
class DatabaseService{

    private $host = "localhost";
    private $dbName = "school_reg";
    private $user = "root";
    private $pwd = "";
    private $connection;

    public function getConnection(){
        $this->connection = null;
        try{
          $dsn = 'mysql:host='.$this->host.';dbname='.$this->dbName;
          $pdo = new PDO($dsn, $this->user,$this->pwd);
          $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
          $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
          $this->connection = $pdo;
  
        }catch(PDOException $exception){
            echo "Connection failed: " . $exception->getMessage();
        }
        return $this->connection;
    }
}
?>