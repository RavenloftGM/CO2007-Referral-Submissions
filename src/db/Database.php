<?php
// filename: Database.php
declare(strict_types=1);

include_once("env.php");

/**
 * Class to instantiate a connection to the database.
 */
class Database {
    /**
     * Instance of a PDO connection for accessing the database.
     */
    private PDO $pdo;

    /**
     * Constructor for Database class.
     * 
     * Initialises the PDO connection, throwing a runtime error if the connection fails.
     */
    public function __construct() {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        try {
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS);
            // Set error mode to exception for better debugging
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo TESTING ? "Connection successful!</br>" : "";
        } catch (PDOException $e) {
            throw new RuntimeException($e->getMessage());
        }
    }
    
    /**
     * Public method to access the private `PDO` connection from outside of the class.
     * @return PDO PDO instance being returned
     */
    public function getConnection() : PDO {
        return $this->pdo;
    }
}

?>