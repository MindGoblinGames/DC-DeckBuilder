<?php
    // ini_set('display_errors', 'on'); 
    // error_reporting(E_ALL);

    //not sure why this is required.. $_POST empty??
    $json = file_get_contents('php://input');
    $values = json_decode($json, true);

    if ($values["action"] == "register")  {
        $mysqli = new mysqli("localhost", getenv('DB_USER'), getenv('DB_PASS'), "deckbuilder");

        if($mysqli->connect_error) {
            echo "Couldn't connect to database.";
        }
        else {
            $user = $mysqli->real_escape_string($values["user"]);
            $email = $mysqli->real_escape_string($values["email"]);
            $pass = $mysqli->real_escape_string($values["pass"]);
            $conf = $mysqli->real_escape_string($values["conf"]);

            if ($pass == $conf) {
                $salt = str_pad((string) rand(1, 1000), 4, '0', STR_PAD_LEFT);
                $hash = hash("sha512", $pass . $salt) . $salt;
                
                try {
                    $mysqli->query("INSERT INTO users (username, email, password) VALUES ('$user', '$email', '$hash')");
                }
                catch (mysqli_sql_exception $e) {
                    if ($e->getCode() == 1062)
                        echo "An account with this username or email already exists.";
                    else {
                        echo "Something went wrong.";
                        $mysqli->query("INSERT INTO error_logs (user, message) VALUES ('$user', 'MySQL query error in register.php: $e')");
                    }
                
                    $mysqli->close();
                    exit;
                }
                
                echo "Account Created!"; 
            }
            else
                echo "Passwords do not match.";
        }
        $mysqli->close();
    }
    else
      echo "Forbidden.";
    exit;
?>