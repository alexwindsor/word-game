import {reactive} from "vue";

export let game = reactive({

    // currently selected letter tile
    selectedTile: 0,
    letters: ['', '', '', '', '', '', ''],


    // 0 = game hasn't started
    // 1 = game in progress
    // 2 = game finished
    gameState: 0,

    userWord: '',
    possibleWords: [],
    userFoundWords: [],
    message: [],



    inputLetter(letter) {

        // this method is designed to work for both physical and virtual keyboard (latter for mobile)
        // so we get a value for letter that works with both
        if (typeof letter === 'object') {
            // check if backspace key was pressed
            if (letter.keyCode === 8) letter = 'DEL'
            else if (letter.keyCode === 13 && game.userWord.length > 3) {
                game.submitWord()
                document.getElementById('user_word').focus()
                return
            } 
            else letter = letter.key
        }

        game.message = [];

        // only enter letters into the tiles if the game hasn't started
        if (game.gameState !== 0) return false

        // if delete key is pushed 
        if (letter === 'DEL') {
            // clear the tile
            game.letters[game.selectedTile] = ''
            // go back a square if we are not already on the first
            if (game.selectedTile > 0) game.selectedTile--
        }
        // check that the key pressed is a single letter, and also is not already in the letters array
        else if (letter.match(/[A-Za-z]/i) && letter.length === 1 && ! game.letters.includes(letter.toUpperCase())) {
            letter = letter.toUpperCase()
            game.letters[game.selectedTile] = letter

            // move focus onto next letter if we are not at the last letter
            if (game.selectedTile < 6) game.selectedTile++

            if (! game.letters.includes('')) game.findWords()
        }
    },

    deleteLetter() {
        if (game.userWord.length > 0) game.userWord = game.userWord.substring(0, game.userWord.length - 1)
    },


    selectTile(tile) {
        
        game.selectedTile = tile
        game.message = [];

        if (game.gameState === 1) {
            game.userWord = game.userWord + game.letters[game.selectedTile]
        }
    },




    async getRandomLetters() {

        // populate the letters array from a list of pangrammable words
        await fetch('http://localhost/*** path to your project ***/src/php/getRandomLetters.php', {method: 'GET'})
            .then(response => response.json())
            .then((randomLetters) => {
                game.letters = randomLetters;
            })


        game.findWords()

    },

    async findWords() {

        
        const response = await fetch('http://localhost/*** path to your project ***/src/php/findWords.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(game.letters)
          });
    
        game.possibleWords = await response.json()

        // game.possibleWords['pangrams'] = ['aaaa']
        // game.possibleWords['otherWords'] = ['abbb', 'accc']

        game.gameState = 1

    },

    submitWord() {

        let userWord = game.userWord.toLowerCase()

        // check first that the main letter was included
        if (! userWord.includes(game.letters[0].toLowerCase())) game.message = ['Words must include the letter ' + game.letters[0], 0];
        // check to see if the word has already been submitted
        else if (this.userFoundWords.includes(userWord)) game.message = ['You\'ve already found that word...', 0]
        // check to see if the word is in the list of foundWords
        else if (! game.possibleWords['pangrams'].includes(userWord) && ! game.possibleWords['otherWords'].includes(userWord)) game.message = ['Word not found', 0]
        // success
        else {
            game.userFoundWords.push(userWord)
            if (game.possibleWords['otherWords'].includes(userWord)) game.message = ['Great !', 1]
            else if (game.possibleWords['pangrams'].includes(userWord)) game.message = ['You found a pangram !!', 1]
        }

        game.userWord = '';

        if (game.userFoundWords.length === game.possibleWords['pangrams'].length + game.possibleWords['otherWords'].length) {
            alert('Congratulations, you found all the words !!!')
            game.gameState = 2;
        }
    },

    showWords() {
        game.gameState = 2;
    },

    reset() {

        game.selectedTile = 0
        game.letters = ['', '', '', '', '', '', '']
        game.gameState = 0
        game.userWord = ''
        game.possibleWords = []
        game.userFoundWords = []
        game.message = []

    }




})




