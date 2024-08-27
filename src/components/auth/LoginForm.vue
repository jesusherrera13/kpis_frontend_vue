<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';

const authStore = useAuthStore();

/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('admin123');
const username = ref('master@gmail.com');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

function validate(values: any, { setErrors }: any) {
    return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
}

const auth_error = computed(() => {
    return authStore.error;
});

const message = computed(() => {
    return authStore.message;
});
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6" class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="16" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign in with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign in with</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">Iniciar sesión</span>
        </div>
    </div>
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
        <VTextField v-model="username" :rules="emailRules" class="mb-8" required hide-details="auto"></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Contraseña</v-label>
        <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password" class="pwdInput"></VTextField>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <!-- <v-checkbox
                v-model="checkbox"
                :rules="[(v: any) => !!v || 'You must agree to continue!']"
                required
                hide-details
                color="primary"
            >
                <template v-slot:label class="">Remeber this Device</template>
            </v-checkbox> -->
            <div class="ml-sm-auto">
                <RouterLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                    >¿Olvidó su contraseña?</RouterLink
                >
            </div>
        </div>
        <v-btn size="large" :loading="isSubmitting" color="primary" :disabled="valid" block type="submit" flat>Login</v-btn>
        <!-- <div v-if="errors.apiError" class="mt-2">
            <v-alert closable color="error">{{ message }}</v-alert>
        </div> -->

        <div v-if="auth_error" class="mt-2">
            <v-alert color="error">{{ message }}</v-alert>
        </div>
    </Form>
</template>
