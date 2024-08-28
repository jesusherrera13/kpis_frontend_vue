<script setup lang="ts">
import { ref, shallowRef, watch, computed } from 'vue';
import { HeartIcon, PhotoIcon, UserCircleIcon, UsersIcon } from 'vue-tabler-icons';
import profileBg from '@/assets/images/backgrounds/profilebg.jpg';
import UserImage from '@/assets/images/profile/user-1.jpg';
import { useUserStore } from '@/stores/apps/user/user';
import { useEquipoStore } from '@/stores/apps/equipo/equipo';

const tab = ref(null);
const storeUser = useUserStore();
const storeEquipo = useEquipoStore();

const items = shallowRef([
    { tab: 'Profile', icon: UserCircleIcon, href: '/apps/user/profile' },
    { tab: 'Followers', icon: HeartIcon, href: '/apps/user/profile/followers' },
    { tab: 'Friends', icon: UsersIcon, href: '/apps/user/profile/friends' },
    { tab: 'Gallery', icon: PhotoIcon, href: '/apps/user/profile/gallery' }
]);

const dialog = ref(false);
const search = ref('');
const search_u = ref('');

function close() {
    dialog.value = false;
}

const headers: any = ref([
    { title: 'Nombre', align: 'start', key: 'name' },
    { title: 'Acciones', align: 'end', key: 'actions', sortable: false }
]);

const getUsers: any = computed(() => {
    // return store.users;
    return storeUser.users.map((item: any) => {
        return { ...item };
    });
});

const usuarios_disponibles = ref(getUsers);

const props = defineProps({
    equipo: Object || Array
});

function hola() {
    storeUser.fetchUsers();
}

function agregarIntegrante(item: any) {
    // console.log(props.equipo?.id, item.id);
    let response = storeEquipo.storeIntegrantes([{ equipo_id: props.equipo?.id, user_id: item.id }]);
    response.then(() => {
        storeEquipo.fetchIntegrantes(props.equipo?.id);
        dialog.value = false;
    });
}

watch([() => dialog], () => {
    console.log('dialog ', dialog);
});
</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img :src="profileBg" alt="profile" class="w-100" />
        <div>
            <v-row class="mt-1">
                <v-col cols="12" lg="4" sm="12" class="order-sm-second">
                    <div class="px-4 py-1">
                        <v-row class="justify-center">
                            <v-col cols="4" class="text-center">
                                <FileDescriptionIcon size="20" />
                                <h4 class="text-h4">938</h4>
                                <h6 class="text-h6 font-weight-regular">Posts</h6>
                            </v-col>
                            <v-col cols="4" class="text-center">
                                <UserCircleIcon size="20" />
                                <h4 class="text-h4">3,586</h4>
                                <h6 class="text-h6 font-weight-regular">Followers</h6>
                            </v-col>
                            <v-col cols="4" class="text-center">
                                <UserCheckIcon size="20" />
                                <h4 class="text-h4">2,659</h4>
                                <h6 class="text-h6 font-weight-regular">Following</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" lg="4" sm="12" class="d-flex justify-center order-sml-first">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <v-avatar size="100" class="userImage">
                                <img :src="UserImage" width="100" alt="Mathew" />
                            </v-avatar>
                        </div>
                        <h5 class="text-h5 mt-3">{{ equipo?.nombre }}</h5>
                        <span class="text-h6 font-weight-regular">{{ equipo?.departamento }}</span>
                    </div>
                </v-col>
                <v-col cols="12" lg="4" class="d-flex align-center justify-center justify-lg-end order-sm-third">
                    <div class="d-flex align-center justify-space-between px-10 py-1 gap-3">
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-facebook"
                            ><BrandFacebookIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-twitter"
                            ><BrandTwitterIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-dribbble"
                            ><BrandDribbbleIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-youtube"
                            ><BrandYoutubeIcon size="16"
                        /></v-btn>

                        <v-dialog v-model="dialog" max-width="800" persistent>
                            <template v-slot:activator="{ props }">
                                <v-btn color="primary" v-bind="props" flat class="ml-auto" @click="hola">
                                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Agregar integrante
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="pa-4 bg-secondary">
                                    <span class="title text-white">Integrantes</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                density="compact"
                                                v-model="search_u"
                                                label="Buscar"
                                                hide-details
                                                variant="outlined"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-data-table
                                                items-per-page="10"
                                                :headers="headers"
                                                :items="usuarios_disponibles"
                                                :search="search_u"
                                                class="border rounded-md"
                                                density="compact"
                                            >
                                                <template v-slot:item.actions="{ item }">
                                                    <v-btn
                                                        color="primary"
                                                        v-bind="props"
                                                        flat
                                                        class="ml-auto"
                                                        @click="agregarIntegrante(item)"
                                                    >
                                                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Agregar
                                                    </v-btn>
                                                    <!-- <v-menu>
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn icon="mdi-dots-vertical" v-bind="props" variant="plain"></v-btn>
                                                        </template>

                                                        <v-list density="compact" nav>
                                                            <v-list-item
                                                                value="editar"
                                                                prepend-icon="mdi-square-edit-outline"
                                                                @click="editItem(item)"
                                                            >
                                                                <v-list-item-title>Editar</v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item value="configurar" prepend-icon="mdi-cog" @click="goTo(item)">
                                                                <v-list-item-title>Configurar</v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item
                                                                value="eliminar"
                                                                prepend-icon="mdi-delete"
                                                                @click="deleteItem(item)"
                                                            >
                                                                <v-list-item-title>Eliminar</v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-menu> -->
                                                </template>
                                            </v-data-table>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" @click="close">Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-col>
                <v-col md="12" class="order-sm-last">
                    <v-tabs v-model="tab" color="primary" dark class="profiletab bg-grey100">
                        <v-tab v-for="item in items" :key="item.tab" :to="item.href">
                            <component :is="item.icon" size="18" stroke-width="1.5" class="mr-2"></component>
                            {{ item.tab }}
                        </v-tab>
                    </v-tabs>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>
<style lang="scss">
.avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .userImage {
        border: 4px solid rgb(255, 255, 255);
    }
}

.top-spacer {
    margin-top: -95px;
}

.profiletab .v-slide-group__content {
    justify-content: end;
    .v-btn--variant-text .v-btn__overlay {
        background: transparent;
    }
}

@media (max-width: 1023px) {
    .order-sm-second {
        order: 2;
    }
    .order-sml-first {
        order: 1;
    }
    .order-sm-third {
        order: 3;
    }
    .order-sm-last {
        order: 4;
    }
}

.btn-brand-facebook {
    background-color: rgb(24, 119, 242) !important;
}

.btn-brand-twitter {
    background-color: rgb(29, 161, 242) !important;
}
.btn-brand-dribbble {
    background-color: rgb(234, 76, 137) !important;
}
.btn-brand-youtube {
    background-color: rgb(205, 32, 31) !important;
}
</style>
