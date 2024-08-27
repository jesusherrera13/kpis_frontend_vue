<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
//import Logo from '@/layouts/full/logo/LogoDark.vue';
/*Social icons*/
import { router } from '@/router';
import { useUserStore } from '@/stores/apps/user/user';
const store = useUserStore();

onMounted(() => {
    store.error = false;
    store.message = '';
});

const password = ref('123');
const password_confirmation = ref('123');
const checkbox = ref(false);
const valid = ref(true);
const show1 = ref(false);

const employee_id = ref('5073');
const rfc = ref('HEQJ770213HL5');
const email = ref('jesusherrera13@gmail.com');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length != 13) || 'Password must have 13 characters'
]);

const rfcRules = ref([
    (v: string) => !!v || 'RFC is required',
    (v: string) => (v && v.length == 13) || 'El RFC debe tener de 13 caracteres'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const employeeIdRules = ref([(v: string) => !!v || 'El número de empleado es requiredo']);

const form = ref();
const myButtonElement = ref<HTMLButtonElement | null>(null);

const errors = computed(() => {
    return store.errors;
});

const message = computed(() => {
    return store.message;
});

const auth_error = computed(() => {
    return store.error;
});

const alert = ref(false);
const dialog = ref(false);
const dialog_register = ref(false);

const submitForm = () => {
    if (myButtonElement.value) {
        // Agregar una clase al botón
        myButtonElement.value.classList.add('btn-clicked');

        // Quitar el evento click del botón
        myButtonElement.value.removeEventListener('click', submitForm);
    }

    if (form.value.validate()) {
        if (employee_id.value != '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && rfc.value != '') {
            // const formData = [
            //     'name'=> fname.value,
            //     'email': email.value,
            //     'password': password.value,
            // ];

            store
                .saveUser({
                    employee_id: employee_id.value,
                    email: email.value,
                    rfc: rfc.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value
                })
                .then((response) => {
                    const currentUrl = window.location.origin;
                    alert.value = store.alert;
                    dialog_register.value = store.alert;
                    // console.log('errors: ', errors.value);
                    // window.location.href = currentUrl + '/usuarios';
                })
                .catch((error) => {
                    if (myButtonElement.value) {
                        myButtonElement.value.classList.remove('btn-clicked');
                        myButtonElement.value.addEventListener('click', submitForm);
                    }

                    console.error('Error submitting form:', error.response.data);
                    alert('There was an error submitting the form.');
                });
        } else {
            console.log('datos invalidos');
        }

        // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a una API
    } else {
        if (myButtonElement.value) {
            myButtonElement.value.classList.remove('btn-clicked');
            myButtonElement.value.addEventListener('click', submitForm);
        }
        alert('Form is not valid');
    }
};

const hola = () => {
    store.error = false;
    store.alert = false;
    store.message = '';
    router.push('/auth/login');
};
</script>
<template>
    <!-- <v-row class="d-flex mb-6">
        <v-col cols="6" sm="6" class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="20" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>FB
            </v-btn>
        </v-col>
    </v-row> -->
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">Registro</span>
        </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Número de empleado</v-label>
        <VTextField v-model="employee_id" :rules="employeeIdRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">RFC</v-label>
        <VTextField v-model="rfc" :rules="rfcRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email</v-label>
        <VTextField v-model="email" :rules="emailRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Contraseña</v-label>
        <VTextField
            v-model="password"
            :counter="10"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Confirmar contraseña</v-label>
        <VTextField
            :counter="10"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
            maxlength="10"
            v-model="password_confirmation"
        ></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block submit flat @click="submitForm" ref="btn_registro" v-model="myButtonElement"
            >Registrar</v-btn
        >
        <!--  <v-alert
            v-if="auth_error"
            v-model="alert"
            border="start"
            close-label="Close Alert"
            color="warning"
            title="Error en autenticación"
            variant="tonal"
            closable
            class="mt-2"
        >
            {{ message }}
        </v-alert> -->
        <!-- <v-dialog v-model="dialog" width="auto">
            <v-card max-width="400" prepend-icon="mdi-alert-circle" :text="message" title="Error en autenticación">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Cerrar" @click="dialog = false"></v-btn>
                </template>
            </v-card>
        </v-dialog> -->

        <div v-if="auth_error" class="mt-2">
            <v-alert color="error">{{ message }}</v-alert>
        </div>

        <v-dialog v-model="dialog_register" width="auto" persistent>
            <v-card max-width="400" prepend-icon="mdi-alert-circle" :text="message" title="Usuario registrado">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Iniciar sesión" @click="hola"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<style>
.btn-clicked {
    background-color: rgb(207, 204, 204) !important;
}
</style>
