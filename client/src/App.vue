<template>
  <ZahlaviAp />
  <SeznamUkolu />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ZahlaviAp from './components/ZahlaviAp.vue';
import SeznamUkolu from './components/SeznamUkolu.vue';
export default defineComponent({
  name: 'App',
  components: {
    ZahlaviAp,
    SeznamUkolu
  }
});
</script>

<style>
#app {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  padding: 0 1.5rem;
}

@media screen and (min-width: 780px) {
  #app {
    padding: 0 3rem;
  }
}

@media screen and (min-width: 1200px) {
  #app {
    padding: 0 5rem;
  }
}
</style>
