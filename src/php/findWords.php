<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$letters_array = json_decode(strtolower(file_get_contents('php://input')), true);
$letters = implode($letters_array);

// check that we have an array of 7 unique letters
if (!preg_match('/^(?:([a-z])(?!.*\1)){7}$/', $letters)) die(json_encode(['message' => 'Please provide 7 unique letters in the querystring. Run the file again with, eg. abcdefg']));

$foundwords = [];
$pangrams = [];

// loop through all the words in the wordlist
$wordlist = fopen('words.txt', 'r');
while (($line = fgets($wordlist)) !== false) {

    // remove the line feed at the end
    $line = trim($line);

    // skip the word if it is shorter than 4 letters or if it doesn't contain the required letter
    if (strlen($line) < 4 || str_contains($line, $letters_array[0]) === false) continue;

    // make the dictionary word into an array of letters
    $word_array = str_split($line);

    $flag = true; // this goes to false as soon as a letter is found that isn't in the received array

    // loop through the letters in the dictionary word to check that they are all in the received array
    foreach ($word_array as $letter) {
        if (str_contains($letters, $letter) === false) {
            $flag = false;
            break;
        }
    }


    // if all the letters in the dictionary word are in the array then we check if it is a pangram
    if ($flag) {
        $pangram_flag = true;
        foreach ($letters_array as $letter) {
            // if we find a letter that is not in the dictionary word then we add the word to the array of found words
            if (str_contains($line, $letter) === false) {
                $foundwords[] = $line;
                $pangram_flag = false;
                break;
            }
        }
        if ($pangram_flag) $pangrams[] = $line;

    }

}

fclose($wordlist);

$result = ['pangrams' => $pangrams, 'otherWords' => $foundwords];



echo json_encode($result);
