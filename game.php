<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "family_feud";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . mysqli_connect_error()]));
}

function validate_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'start_game':
            $player_name = validate_input($_POST['player_name']);
            $_SESSION['player_name'] = $player_name;
            $_SESSION['score'] = 0;
            echo json_encode(['success' => true]);
            break;

        case 'update_score':
            $score = intval($_POST['score']);
            $_SESSION['score'] = $score;
            echo json_encode(['success' => true]);
            break;

        case 'end_game':
            $player_name = $_SESSION['player_name'] ?? '';
            $score = $_SESSION['score'] ?? 0;
            
            if (empty($player_name)) {
                echo json_encode(['success' => false, 'message' => "Player name is missing"]);
                break;
            }
            
            $sql = "INSERT INTO scores (player_name, score, game_date) VALUES (?, ?, NOW())";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $player_name, $score);
            
            if ($stmt->execute()) {
                $leaderboard = get_leaderboard();
                echo json_encode(['success' => true, 'leaderboard' => $leaderboard]);
            } else {
                echo json_encode(['success' => false, 'message' => "Error: " . $stmt->error]);
            }
            
            session_destroy();
            break;

        default:
            echo json_encode(['success' => false, 'message' => "Invalid action"]);
    }
}

function get_leaderboard() {
    global $conn;
    $sql = "SELECT player_name, score FROM scores ORDER BY score DESC LIMIT 10";
    $result = $conn->query($sql);
    
    $leaderboard = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $leaderboard[] = $row;
        }
    }
    
    return $leaderboard;
}

$conn->close();
?>
