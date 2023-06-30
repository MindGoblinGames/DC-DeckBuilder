<?php
    // ini_set('display_errors', 'on'); 
    // error_reporting(E_ALL);

    //not sure why this is required.. $_POST empty??
    $json = file_get_contents('php://input');
    $values = json_decode($json, true);

    if ($values["action"] == "check") {
        if (session_start() && !empty($_SESSION["loggedin"]))
            echo 1;
        else
            echo 0;
        exit;
    }

    elseif ($values["action"] == "login")  {
        @$mysqli = new mysqli("localhost", getenv('DB_USER'), getenv('DB_PASS'), "deckbuilder"); /* @ prevents error from sending, custom error handle below */

        if($mysqli->connect_error) {
            echo "Couldn't connect to database.";
        }
        else {
            $user = $mysqli->real_escape_string($values["user"]);
            $pass = $mysqli->real_escape_string($values["pass"]);
            
            $result = $mysqli->query("SELECT id, email, password FROM users WHERE username = '$user'");
            
            if ($result) {
                $match = $result->num_rows;
                $fetch = $result->fetch_assoc();

                $result->close();

                if ($match == 1)
                    {
                        $id = $fetch["id"];
                        $email = $fetch["email"];
                        $dbPass = $fetch["password"];
                        $salt = substr($dbPass, -4);
                        $hash = substr($dbPass, 0, -4);
                        if(hash("sha512", $pass . $salt) != $hash){
                            echo "Invalid Credentials.";
                            $mysqli->close();
                            exit;
                        }

                        if (!session_start()) {
                            echo "Couldn't verify session.";
                            $mysqli->close();
                            exit;
                        }
                        $_SESSION["loggedin"] = $user;

                        echo "Login Successful!";
                    }
                else
                    echo "Invalid Credentials.";
            }
            else {
                echo "Something went wrong.";
                $mysqli->query("INSERT INTO error_logs (user, message) VALUES ('$user', 'MySQL query error in login.php')");
            }
        }
        $mysqli->close();
    }
    else
        echo "Forbidden.";
    exit;
?>