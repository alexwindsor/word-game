Simple Word Game


To start the game, either enter seven unique letters of your choice, or click on 'Get Random Letters' for these to be generated for you. 

See how many words you can make using the seven letters. You can use the same letter twice, but every word must include the first green letter. Words have to consist of four letters or more. See if you can find a word that uses all seven letters - that is called a 'pangram'.

If you click on 'Get Random Letters', there is guaranteed to be at least one pangram.

This is built using Vue3 and PHP. There is text file containing all English words that are 4 letters or longer. When words are submitted, this list is consulted by calling a php script from fetch() in the javascript, so as not to make the client have to do the work of sifting through the long list of words.

To get this working, you have to download this onto a server with node.js installed as well as PHP. Download the files to a directory and type 'npm run dev' on the command line.

To deploy the project, type 'npm run build' in the project's root folder. This generates the files in the /dist folder, which you can copy to anywhere that will run the .php files. 

Then copy the /src/php folder into /dist/. In the index.html file, you need to change the links to the .js, .css and .ico to start with a dot, eg :

"/assets/index-5d0f8cfe.js" needs to be "./assets/index-5d0f8cfe.js"

In the .js file in the assets folder, change all the links to the .php scripts to the full url path to those .php files, eg. http://localhost/wordgame/php/findWords.php for example.

For now, you can play this game at http://alexphpdev.ddns.net/wordgame1/

Please send any feedback and ideas to alexwindsormusic@gmail.com.

