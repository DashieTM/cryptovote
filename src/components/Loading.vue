<template>
    <div class="text-center">
        <v-progress-circular :size="props.size" indeterminate color="white"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({ size: Number });
</script>

<style scoped>
    div {
        margin-top: 4rem;
    }
</style>