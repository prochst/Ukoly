<!-- 
    Řádek s ovladacími funkcemi aplikace
    Obsahuje:
        tlačítko pro přidání nového úkolu
        přepínač zobrazení jen důležitých úkolů (default false)
        přepínač zobrazení splněných úkolů (default false)
-->
<template>
    <div class="pridat" @click="pridejUkol">
        <i class="ri-play-list-add-line ri-lg text-white"></i><span class="bt-popis">Přidat úkol</span>
    </div>
    <div>
        <input ref="jenDulezite" class="switch" type="checkbox" @click="jenDulezite" /><span class="bt-popis">Jen
            důležité</span>
    </div>
    <div>
        <input ref="iSplnene" class="switch" type="checkbox" @click="iSplnene" /><span class="bt-popis">Zobrazit
            splněné</span>
    </div>
</template>

<script lang="ts">
import * as api from '@/common/ApiModel';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'OvladaniAp',
    emits: ["pridej-ukol", "jen-dulezite", "i-splnene"],
    methods: {
        pridejUkol() {
            let ukol: api.Ukol = { id: 0, popis: "", splneny: false, dulezity: false };
            this.$emit('pridej-ukol', ukol);
        },
        jenDulezite() {
            this.$emit('jen-dulezite', (this.$refs.jenDulezite as HTMLInputElement).checked);
        },
        iSplnene() {
            this.$emit('i-splnene', (this.$refs.iSplnene as HTMLInputElement).checked);
        },
    },
});
</script>

<style>
.pridat {
    cursor: pointer;
}

input.switch {
    cursor: pointer;
    appearance: none;
    height: 1em;
    width: 2em;
    border-radius: 2em;
    box-shadow: inset -1em 0px 0px 0px var(--font-color);
    background-color: var(--bg-edit);
    outline: none;
    -webkit-transition: 0.2s;
    transition: 0.2s;
}

input.switch:checked {
    box-shadow: inset 1em 0px 0px 0px var(--icon-color);
}

.bt-popis {
    padding-left: 0.6rem;
}
</style>
