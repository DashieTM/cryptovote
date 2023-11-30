<template>
    <div>
        <v-snackbar
        :timeout="timeout"
        :color="color"
        >
            {{ message }}
        </v-snackbar>
    </div>
</template>

<script setup lang="ts">
import { useSnackbar } from '../composables/useSnackbar'

const { message, color, timeout } = useSnackbar();
</script>