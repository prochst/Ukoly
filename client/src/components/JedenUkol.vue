<!-- 
    Výpis konkrétního úkolu
    Obsahuje:
        editaci hodnot
        smazání úkolu
-->
<template>

    <div class="obsah">
        <div class="popis">
            <div class="splneno" @click="zmenSplneno"><i v-if="ukolData.splneny" class="ri-checkbox-line"></i><i v-else
                    class="ri-checkbox-blank-line"></i></div>

            <input v-model="ukol.popis" :class="{jeSplneno: ukolData.splneny}" type="text" placeholder="nový úkol"
                @change="ulozUkol" />
        </div>
        <div class="datum" v-if="ukolData.datum">[{{new Date(ukolData.datum).toLocaleDateString()}}]</div>
    </div>
    <div class="vlastnosti">
        <span class="dulezite-icon" @click="zmenDulezitost"><i v-if="ukolData.dulezity" class="ri-star-fill"></i><i
                v-else class="ri-star-line"></i></span>
        <span class="poznamka-icon" @click="zobrazPoznamku"><i
                v-if="ukolData.poznamka != null && ukolData.poznamka != ''" class="ri-sticky-note-fill"></i><i v-else
                class="ri-sticky-note-line"></i></span>
        <input type="date" ref="idatum" class="datum-input" v-model="ukol.datum" @change="ulozUkol" /><span
            class="datum-icon" @click="vyberDatum"><i v-if="ukolData.datum" class="ri-calendar-fill"></i><i v-else
                class="ri-calendar-todo-line"></i></span>
        <span class="smazat-icon" @click="smazUkol(ukolData.id)"><i class="ri-delete-bin-6-line"></i></span>
    </div>
    <div class="poznamka" ref="poznamka">
        <textarea ref="taPoznamka" v-model="ukol.poznamka" @change="ulozUkol()" :class="{jeSplneno: ukolData.splneny}"
            placeholder="Zapsat poznámku"></textarea>
    </div>

</template>

<script lang="ts">
import { Ukol } from '@/common/ApiModel';
import { type PropType } from 'vue'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'JedenUkol',
    props: {
        ukolData: {
            type: Object as PropType<Ukol>,
            required: true,
        },
    },
    emits: ["smaz-ukol", "uprav-ukol"],
    data() {
        return {
            ukol: this.ukolData,
        };
    },
    methods: {
        ulozUkol() {
            this.$emit('uprav-ukol', this.ukol);
        },
        zmenDulezitost() {
            this.ukol.dulezity = !this.ukol.dulezity;
            this.ulozUkol();
        },
        zmenSplneno() {
            this.ukol.splneny = !this.ukol.splneny;
            this.ulozUkol();
        },
        smazUkol(id?: number) {
            this.$emit('smaz-ukol', id);
        },
        vyberDatum() {
            const dateInput = this.$refs.idatum as HTMLInputElement;
            if (this.ukol.datum)
                dateInput.value = (this.ukol.datum as string).substring(0, 10);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dateInput.showPicker();
        },
        zobrazPoznamku() {
            const poznamka = this.$refs.poznamka as HTMLDivElement;
            if (poznamka.style.display == '')
                poznamka.style.display = 'block';
            else
                poznamka.style.display = '';
        },
    },
});
</script>

<style>
.obsah {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.splneno {
    padding-top: 0.4rem;
    margin-right: 1rem;
}

.popis {
    width: 100%;
    display: flex;
    align-items: center;
}

.jeSplneno {
    text-decoration: line-through;
    pointer-events: none;
}

.datum {
    width: 145px;
    text-align: left;
    font-size: small;
}

.vlastnosti {
    padding-top: 0.4rem;
    text-align: left;
}

.dulezite-icon i {
    color: var(--icon-dulezite) !important;
}

.poznamka-icon {
    margin-left: 0.5rem;
}

.datum-icon {
    margin-left: 0.5rem;
}

.datum-input {
    width: 0;
    padding: 0;
    visibility: hidden;
}

.smazat-icon {
    margin-left: 0.5rem;
}

.smazat-icon i {
    color: var(--icon-delete) !important;
}

.poznamka {
    width: 100%;
    display: none;
}

.poznamka textarea {
    font-size: calc(var(--font-size) * 0.8);
    height: 60px;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
}

.poznamka textarea::-webkit-scrollbar {
    width: 6px;
    border-radius: 0.5rem;

}

.poznamka textarea::-webkit-scrollbar-track {
    background: var(--font-color);
}

.poznamka textarea::-webkit-scrollbar-thumb {
    background: var(--font-edit);
}

.poznamka textarea::-webkit-scrollbar-thumb:hover {
    background: var(--bg-color);
}

.poznamka::-webkit-resizer {
    background: var(--bg-color);
}

@media screen and (min-width: 780px) {
    .obsah {
        width: auto;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .datum {
        padding-top: 0.4rem;
        width: 145px;
        text-align: right;
        font-size: smaller;
        margin-left: 1rem;
    }

    .vlastnosti {
        width: 120px;
        text-align: right;
        padding-top: 0.4rem;
    }

    .poznamka {
        padding-left: 38px;
    }

    .poznamka textarea {
        height: 80px;
    }
}

@media screen and (min-width: 1200px) {
    .vlastnosti {
        width: 140px;
    }

    .poznamka {
        padding-left: 42px;
    }
}
</style>
