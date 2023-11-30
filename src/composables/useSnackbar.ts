import { ref } from 'vue';

export function useSnackbar() {
    const snackbar = ref(false);
    const message = ref('');
    const color = ref('');
    const timeout = ref(3000);

    function showSnackbar(newMessage: string, type: string) {
        message.value = newMessage;
        switch (type) {
            case 'error':
                color.value = 'red';
                break;
            case 'success':
                color.value = 'green';
                break;
            default:
                color.value = 'blue';
        }
        snackbar.value = true;

        setTimeout(() => {
            snackbar.value = false;
        }, timeout.value);
    }

    return { snackbar, message, color, timeout, showSnackbar }
}