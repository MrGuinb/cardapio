<?php
header('Content-Type: application/json');
echo json_encode([
    "segunda-feira" => ["08:00 - 12:00", "14:00 - 18:00"],
    "terça-feira" => ["08:00 - 12:00", "14:00 - 18:00"],
    "quarta-feira" => ["08:00 - 12:00", "14:00 - 18:00"],
    "quinta-feira" => ["08:00 - 12:00", "14:00 - 18:00"],
    "sexta-feira" => ["08:00 - 12:00", "14:00 - 18:00"],
    "sábado" => ["09:00 - 13:00"],
    "domingo" => []
]);

