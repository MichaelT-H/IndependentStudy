<?php
include('C:\wamp64\settings.php');
// connect to my sql

$db_name="tera";	// Database name
$tbl_name="LoginTable"; // Table name

// Connect to server and select databse.
try {
//   echo $settings['username'], '<br>';
//   echo $settings['port'], '<br>';

   $pdo = new PDO(
      sprintf(
          'mysql:host=%s;dbname=%s;port=%s;charset=%s',
          $settings['host'],
          $db_name,
          $settings['port'],
          $settings['charset']
         ),
          $settings['username'],
          $settings['password']
   );

   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
 catch(PDOException $e) {
   echo $e->getMessage();
   die();
}

// rRtrieve all variables from form. The @ suppresses error messages.
$email = @$_POST["email"];
$server = @$_POST["server"];


if(@$_POST["pass1"] != "" and @$_POST["pass2"] == @$_POST["pass1"]){
	$password = @$_POST["pass1"];

}else{
	echo "Passwords Do Not Match please try again"."<br>";

}

// insert information to database
$sql="insert into $tbl_name (Login_Email, Password) values(:email,:password)";
$query = $pdo->prepare($sql);
$query->execute(array(
      ':email'     => $email,
	  ':password'   => $password
));

$sql="insert into Account (Email_Address, Creation_Date, Emp, Server_Name) values(:email, CURDATE(),:emp,:server)";
$query = $pdo->prepare($sql);
$query->execute(array(
      ':email'     => $email,
	  ':emp'     => 0,
	  ':server'     => $server,
));

?>


<!DOCTYPE html>
<html>

<head>
	<title>Add processed</title>
</head>
<body>
<div>
  <h3>The account is added to the database. </h3>
</div>
</body>
</html>
