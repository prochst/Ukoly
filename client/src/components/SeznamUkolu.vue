<!-- 
    Hlavní konponenta aplikce
    Obsahuje:
        komponentu pro vrchí řádek s ovládacími prvky
        komponenty pro jednotlivé úkoly
        komponentu pro zobrazní chyb
 -->
<template>
    <div class="ovladani">
        <OvladaniAp @pridej-ukol="pridejUkol" @i-splnene="iSplnene" @jen-dulezite="jenDulezite" />
    </div>
    <div class="seznam-ukolu">
        <div class="ukol" v-for="item in zobrazeneUkoly" :key="item.id">
            <JedenUkol :ukol-data=item @smaz-ukol="smazUkol" @uprav-ukol="upravUkol" />
        </div>
    </div>
    <div class="chyby" ref="chyby">
        <VypisChyby :chyba-nazev=chybaNazev :chyba-popis=chybaPopis />
    </div>
</template>

<script lang="ts">
import * as api from '@/common/ApiModel';
import { defineComponent } from 'vue';
import OvladaniAp from './OvladaniAp.vue';
import JedenUkol from './JedenUkol.vue';
import VypisChyby from './VypisChyby.vue';

export default defineComponent({
    name: "SeznamUkolu",
    components: {
        OvladaniAp,
        JedenUkol,
        VypisChyby,
    },
    data() {
        return {
            ukoly: [] as api.Ukol[],
            zobrazeneUkoly: [] as api.Ukol[],
            isplnene: false,
            jendulezite: false,
            chybaNazev: "Název chyby",
            chybaPopis: "Popis chyby",
        };
    },
    mounted() {
        api.VsechnyUkoly()
            .then((result) => {
                //console.log('mounted()');
                //console.log(result.data.ukoly);
                this.ukoly = result.data.ukoly;
                this.zobrazeneUkoly = this.ukoly.filter(u => u.splneny === false);
                this.zobrazeneUkoly.sort((a, b) => (b.id - a.id));
            })
            .catch((error) => {
                console.error(error);
                //this.error = error;
            });
    },
    methods: {
        nactiUkoly() {
            api.VsechnyUkoly()
                .then((result) => {
                    //console.log(result.data.ukoly);
                    this.ukoly = result.data.ukoly;
                })
                .catch((error) => {
                    console.error('nactiUkol error: ' + error);
                    this.zobrazChybu('Úkoly se nepodařilo načíst', error as string);
                });
        },
        async nactiukol(id: number) {
            api.NactiUkol(id)
                .then((result) => {
                    //console.log(result);
                    Object.assign(this.ukoly[this.ukoly.findIndex(u => u.id === id)], result.data.ukol);
                })
                .catch((error) => {
                    console.error('nactiUkol error:' + error);
                    this.zobrazChybu('Úkol id:' + id + ' se nepodařilo načíst', error as string);
                });
        },
        pridejUkol(ukol: api.Ukol) {
            api.PridejUkol(ukol)
                .then((result) => {
                    //console.log(result);
                    this.ukoly.push(result.data.pridejUkol);
                    this.filtrujUkoly();
                })
                .catch((error) => {
                    console.error('pridejUkol error: ' + error);
                    this.zobrazChybu('Úkol se nepodařilo přidat', error as string);
                });
        },
        upravUkol(ukol: api.Ukol) {
            api.UpravUkol(ukol)
                .then((result) => {
                    //console.log('upravUkol result: ');
                    //console.log(result);
                    Object.assign(this.ukoly[this.ukoly.findIndex(u => u.id === ukol.id)], result.data.upravUkol);
                    this.filtrujUkoly();

                })
                .catch((error) => {
                    console.error('upravUkol error: ' + error);
                    this.nactiukol(ukol.id)
                    this.zobrazChybu('Úkol se nepodařilo uložit', error as string);
                });
        },
        smazUkol(id: number) {
            const ukol = this.ukoly.find(u => u.id === id);
            if (ukol) {
                api.SmazUkol(id)
                    .then((result) => {
                        //console.log(result.data.odeberUkol);
                        this.ukoly = this.ukoly.filter(u => u.id !== result.data.odeberUkol.id);
                        this.filtrujUkoly();
                    })
                    .catch((error) => {
                        console.error('smazUkol error: ' + error);
                        this.zobrazChybu('Úkol id:' + id + ' se nepodařilo smazat', error as string);
                    });
            }
        },
        iSplnene(isplnene: boolean) {
            this.isplnene = isplnene;
            this.filtrujUkoly();
        },

        jenDulezite(jendulezite: boolean) {
            this.jendulezite = jendulezite;
            this.filtrujUkoly();
        },
        filtrujUkoly() {
            if (this.isplnene && !this.jendulezite)
                this.zobrazeneUkoly = this.ukoly;
            else if (this.isplnene && this.jendulezite)
                this.zobrazeneUkoly = this.ukoly.filter(u => u.dulezity === this.jendulezite);
            else if (!this.isplnene && !this.jendulezite)
                this.zobrazeneUkoly = this.ukoly.filter(u => u.splneny === this.isplnene);
            else
                this.zobrazeneUkoly = this.ukoly.filter(u => u.splneny === this.isplnene && u.dulezity === this.jendulezite);

            this.zobrazeneUkoly.sort((a, b) => (b.id - a.id));
        },
        zobrazChybu(nazev: string, popis: string) {
            this.chybaNazev = nazev;
            this.chybaPopis = popis;
            const chyba = this.$refs.chyby as HTMLDivElement;
            chyba.classList.remove('zobrazit');
            void chyba.offsetWidth;
            chyba.classList.add('zobrazit');
        },
    },
});
</script>

<style>
.ovladani {
    position: fixed;
    height: 60px;
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 0 0.7rem;
}

.ovladani div {
    padding-right: 2rem;
    display: flex;
    align-items: center;
}

.seznam-ukolu {
    margin-top: 125px;
    margin-bottom: 1rem;
}

.ukol {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--bg-edit);
    color: var(-font-edit);
    margin-top: 0.2rem;
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
}

.ukol * {
    background-color: var(--bg-edit);
    color: var(--font-edit);
}

.ukol i {
    color: var(--icon-color);
    cursor: pointer;
}

.chyby {
    position: absolute;
    top: 10px;
    left: 200px;
    width: calc(100vw - 240px);
    background-color: var(--icon-delete);
    z-index: 50;
    padding: 0.5rem;
    border-radius: 0.5rem;
    opacity: 0;
}

.chyby * {
    background-color: inherit;
    color: var(--bg-edit);
    font-size: calc(var(--font-size) * 0.8);
}

.chyby.zobrazit {
    animation: skryt 4s 1;
}

@keyframes skryt {
    0% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@media screen and (min-width: 780px) {
    .ovladani {
        height: 40px;
        margin-top: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .seznam-ukolu {
        margin-top: 100px;
        margin-bottom: 1.5rem;
    }

    .ukol {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .chyby {
        left: 260px;
        width: calc(100vw - 330px);
    }
}

@media screen and (min-width: 1200px) {
    .chyby {
        left: 320px;
        width: calc(100vw - 440px);
    }
}
</style>
