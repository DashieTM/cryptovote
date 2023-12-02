<template>
    <div class="text-center">
        <v-progress-circular :size="props.size" indeterminate :color="color"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({ size: Number, color: String });
</script>

<style scoped>

</style>