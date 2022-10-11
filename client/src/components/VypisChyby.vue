<!-- 
    Zobrazení odchycených chyb aplikace 
-->
<template>

    <p class="nazev">{{chybaNazev}}</p>
    <p class="popis">{{chybaPopis}}</p>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AplikaceUkoly',
    props: {
        chybaNazev: {
            type: String,
            required: true,
        },
        chybaPopis: {
            type: String,
            required: false,
        },
    },
});
</script>
<style>

</style>
