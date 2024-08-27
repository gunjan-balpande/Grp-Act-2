<?php
// Database credentials
$servername = "database-1.czu0qcc0qpx2.us-east-1.rds.amazonaws.com";
$username = "admin";
$password = "varshitha";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
//db conn
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $conn->real_escape_string($_POST['username']);
    $pass = $conn->real_escape_string($_POST['password']);

    // Hash the password
    $hashed_pass = hash('sha256', $pass);

    // Prepare and execute the SQL query
    $sql = "SELECT * FROM users WHERE username='$user' AND password='$hashed_pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Login successful!";
        // Redirect or display a success message
    } else {
        echo "Invalid username or password.";
    }
}

// Close connection
$conn->close();
?>
