<?php
/**
 * Unified Sanitization and Validation
 * Resolves undefined clean() function and ensures all fields are processed.
 */

// Define the missing clean function globally for this script
function clean($value) {
    return htmlspecialchars(trim($value ?? ''));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Sanitize all inputs to prevent XSS
    $physician = clean($_POST['ref_physician'] ?? '');
    $clinic    = clean($_POST['ref_clinic'] ?? '');
    $phone     = clean($_POST['ref_phone'] ?? '');
    $email     = clean($_POST['ref_email'] ?? '');
    $fax       = clean($_POST['ref_fax'] ?? '');
    $patient   = clean($_POST['patient_name'] ?? '');
    $dob       = clean($_POST['patient_dob'] ?? '');
    $urgency   = clean($_POST['urgency'] ?? '');
    $reason    = clean($_POST['reason'] ?? '');

    // 2. Basic Server-Side Validation (Mirroring JS requirements)
    $errors = [];

    if (strlen($physician) < 3) {
        $errors[] = "Physician name is too short.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if (strtotime($dob) > time()) {
        $errors[] = "Date of birth cannot be in the future.";
    }

    // 3. Output Response
    echo "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><link rel='stylesheet' href='style.css'><title>Submission Result</title></head><body>";
    echo "<div class='container'>";

    if (!empty($errors)) {
        echo "<h2 style='color: #d93025;'>Submission Errors</h2><ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul><a href='referralForm.php'>Go Back</a>";
    } else {
        echo "<h2>Submission Received ✓</h2>";
        echo "<p>The referral for <strong>$patient</strong> has been successfully processed.</p>";
        echo "<p><strong>Urgency:</strong> $urgency</p>";
        echo "<a href='referralForm.php'><button>Return to Form</button></a>";
    }

    echo "</div></body></html>";
} else {
    // Direct access protection
    header("Location: referralForm.php");
    exit;
}
?>
