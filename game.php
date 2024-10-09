<?php
$serverName = "localhost";
$userName = "root";
$password = "";
$dataBase = "familyFeud";
$connection = new mysqli($serverName, $userName, $password, $dataBase);
if(!$connection){
   die("Connection failed: " . $connection->connect_error);
}
else{
   echo("connection Workingg");
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";

$result = mysqli_query($connection, $sql) or die("Bad Create $sql");

   
$conn->close();