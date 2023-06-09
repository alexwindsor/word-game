<?php
header("Access-Control-Allow-Origin: *");


// find out how many pangrammable words are in the list
$wordCount = exec('wc -l pangrammables.txt');
$wordCount = intval($wordCount);

// pick one at random
$random_line = rand(0, $wordCount);

//open the text file with all the letters
$file = new SplFileObject('pangrammables.txt');
$file->seek($random_line);

//turn it into an array of letters
$random_letters = $file->current();
$random_letters = strtoupper(trim($random_letters));
$random_letters = str_split($random_letters);
shuffle($random_letters);

echo json_encode($random_letters);