<!-- 
    Záhlaví aplikace 
-->
<template>
    <div class="zahlavi">
        <i class="ri-todo-line ri-2x"></i>
        <h1>Úkoly</h1>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ZahlaviAp',
});
</script>

<style>
.zahlavi {
    position: fixed;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
}

.zahlavi * {
    color: var(--bg-edit);
}

.zahlavi h1 {
    padding-left: 1.2rem;
    margin: 0;
    font-size: calc(var(--font-size) * 1.5);
    font-weight: 500;
    letter-spacing: 0.3em;
}
</style>
