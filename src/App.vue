<script setup>

import { onUnmounted } from 'vue'
import { game } from '@/game.js'
import LetterTile from '@/components/LetterTile.vue'
import Keyboard from '@/components/Keyboard.vue'


// track any keyboard presses to give option of using computer keyboard as well as virtual keyboard
window.addEventListener('keyup', game.inputLetter)

onUnmounted(() => {
  window.removeEventListener('keyup', game.inputLetter)
})


</script>


<template>

  <div class="flex w-full flex-wrap h-2/5 sm:h-1/3 px-2 sm:px-16 content-around">

  <h1 class="w-full my-7 sm:my-10 text-6xl sm:text-8xl text-center sm:text-left">Word Game</h1>

  <div v-if="game.gameState === 0" class="text-lg mb-3 w-full">
    To start the game, enter 7 different letters into the boxes below, or click the button below to generate them.
  </div>

  <div v-if="game.gameState === 1" class="text-lg mb-3 w-full">
    Now, see how many words you can make with the 7 letters - every word must contain the first, green letter.
  </div>

</div>

<div class="flex flex-wrap w-full h-3/5 sm:h-2/3 px-2 sm:px-16 content-start">

  <div class="flex width-fit mx-auto mt-10 justify-between">
    <LetterTile :first="true" :tile="0" />
    <LetterTile v-for="tile in 6" :first="false" :tile="tile" />
  </div>


  <div class="flex text-center w-full mt-8 sm:mt-16 justify-between sm:justify-start">

    <button 
    v-if="game.gameState === 0"
      class="text-lg p-3 bg-black border border-white rounded" 
      @click="game.getRandomLetters"
      >Get Random Letters
    </button>

    <div v-if="game.gameState === 1">
      <input type="text" id="user_word" class="border border-white bg-black rounded text-xl sm:text-2xl w-3/5 p-1 sm:ml-10 uppercase" v-model="game.userWord">

      <button 
        class="text-lg p-1 ml-2 sm:ml-10 bg-black border border-white rounded focus:border-2 disabled:bg-gray-500" 
        :disabled="game.userWord.length < 4"
        @click="game.submitWord"
        >ENTER</button>

      <button 
        class="text-lg p-1 ml-2 sm:ml-5 bg-black border border-white rounded focus:border-2 disabled:bg-gray-500" 
        @click="game.deleteLetter()"
        :disabled="game.userWord.length === 0"
        >DEL</button>
    </div>

  </div>


  <div v-if="game.gameState === 1" class="w-full mt-4 sm:mt-8">

    You have found {{ game.userFoundWords.length }} out of a possible {{ game.possibleWords['pangrams'].length + game.possibleWords['otherWords'].length }} words to be found, including {{ game.possibleWords['pangrams'].length }} pangram(s).

    <div class="w-full text-center">
      <div 
      class="my-4 sm:ml-24 text-lg sm:text-xl text-white w-full sm:w-fit p-1 sm:p-2 font-bold" 
      :class="{
        'bg-red-700': game.message[1] === 0,
        'bg-green-700': game.message[1] === 1,
        'invisible': game.message[0] === ''
        }" 
      >{{ game.message[0]}}</div>
    </div>
    

    <div class="my-4 text-center flex flex-wrap">
      <div v-for="userFoundWord in game.userFoundWords" class="m-2">{{ userFoundWord }}</div>
    </div>


    <button class="my-8 text-lg p-3 float-right bg-black border border-white rounded focus:border-2 disabled:bg-gray-500" @click="game.showWords">SHOW WORDS</button>

  </div>

  <div v-if="game.gameState === 2" class="mb-8 whitespace-normal w-3/4">
    <div class="text-lg">Pangram(s):</div>
    <div 
      v-for="foundWord in game.possibleWords['pangrams']" 
      class="m-1 inline-block"
      :class="{'bg-white text-black font-bold p-1': game.userFoundWords.includes(foundWord)}"
        >
      {{ foundWord }}
  </div>

  <div class="text-lg mt-5">Other Words:</div>
    <div 
      v-for="foundWord in game.possibleWords['otherWords']" 
      class="m-1 inline-block"
      :class="{'bg-white text-black font-bold p-1': game.userFoundWords.includes(foundWord)}"
        >
      {{ foundWord }}
    </div>

    <div class="w-full sm:mx-20 ">
      <button class="my-8 text-lg p-3 bg-black border border-white rounded focus:border-2 disabled:bg-gray-500" @click="game.reset">Play Again</button>
    </div>
    


  </div>

</div>


<div v-if="game.gameState === 0" class="fixed w-full bottom-5 sm:bottom-10 pointer-events-none">
  <Keyboard />
</div>


</template>

