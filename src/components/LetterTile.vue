<script setup>

import { game } from '@/game.js'

defineProps({
    first: Boolean,
    tile: Number
})


</script>


<template>

    <div 
        :class="{
            'bg-green-500': first,
            'bg-black': ! first,
            'border-2': tile === game.selectedTile,
            'border': tile !== game.selectedTile
        }"
        class="text-center text-2xl sm:text-7xl select-none border-white rounded-lg m-1 sm:m-2 p-2 w-10 sm:w-20"
        @click="game.selectTile(tile)"
    >
        {{ game.letters[tile] === '' ? '&nbsp;' : game.letters[tile] }}
    </div>


</template>

