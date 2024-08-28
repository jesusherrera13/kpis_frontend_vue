<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { HeartIcon, UsersIcon, TrashIcon } from 'vue-tabler-icons';
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

// types
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

import user1 from '@/assets/images/profile/user-1.jpg';
import user8 from '@/assets/images/profile/user-2.jpg';
import user3 from '@/assets/images/profile/user-3.jpg';
import user4 from '@/assets/images/profile/user-4.jpg';
import user5 from '@/assets/images/profile/user-5.jpg';
import user6 from '@/assets/images/profile/user-6.jpg';
import user7 from '@/assets/images/profile/user-7.jpg';
import user11 from '@/assets/images/profile/user-3.jpg';
import user12 from '@/assets/images/profile/user-4.jpg';
import user9 from '@/assets/images/profile/user-5.jpg';
import user10 from '@/assets/images/profile/user-2.jpg';

// components
import ProfileBanner from '@/components/apps/equipo-profile/ProfileBanner.vue';
import { useFollowersStore } from '@/stores/apps/userprofile/followers';
import { useEquipoStore } from '@/stores/apps/equipo/equipo';
import { useUserStore } from '@/stores/apps/user/user';

const store = useEquipoStore();
const storeUser = useUserStore();
const route = useRoute();

onMounted(() => {
    // store.fetchEquipos();
    let response = store.show(route.params.id);
    response.then(() => {
        Object.assign(equipo.value, store.equipo);
    });

    store.fetchIntegrantes(route.params.id);
});

const getIntegrantes: any = computed(() => {
    return store.integrantes;
});

const getEquipo: any = computed(() => {
    // return store.followers;
});

const searchValue = ref('');
const equipo = ref({});
// dropdown data
const actionDD = ref([
    { title: 'Favorite', icon: HeartIcon },
    { title: 'Edit Friend List', icon: UsersIcon },
    { title: 'Remove', icon: TrashIcon }
]);
const page = ref({ title: 'Perfil de Equipo' });

const filteredCards = computed(() => {
    /* return [
        {
            id: '#1Followers_Barney',
            avatar: user6,
            name: 'Barney',
            location: 'Handburgh',
            follow: 1
        },
        {
            id: '#2Followers_Thea',
            avatar: user3,
            name: 'Thea',
            location: 'New jana',
            follow: 2
        },
        {
            id: '#3Followers_Guiseppe',
            avatar: user7,
            name: 'Guiseppe',
            location: 'Jenkinsstad',
            follow: 1
        },
        {
            id: '#4Followers_Henderson',
            avatar: user8,
            name: 'Henderson',
            location: 'South Antonina',
            follow: 1
        },
        {
            id: '#5Followers_Maddison',
            avatar: user6,
            name: 'Maddison',
            location: 'New Dorthy',
            follow: 1
        },
        {
            id: '#6Followers_Wilber',
            avatar: user1,
            name: 'Wilber',
            location: 'Twilahsven',
            follow: 1
        },
        {
            id: '#7Followers_Hayden',
            avatar: user4,
            name: 'Hayden',
            location: 'Darrelshaire',
            follow: 1
        },
        {
            id: '#8Followers_Lloyd',
            avatar: user10,
            name: 'Lloyd',
            location: 'New Credrick',
            follow: 1
        },
        {
            id: '#9Followers_Kris',
            avatar: user8,
            name: 'Kris',
            location: 'New Dianna',
            follow: 1
        }
    ]; */

    return getIntegrantes.value.filter((integrante: any) => {
        console.log(integrante);
        return integrante.nombre.toLowerCase().includes(searchValue.value.toLowerCase());
    });
});

const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Perfil de Equipo',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <ProfileBanner :equipo="equipo" />
    <v-row class="justify-content-end mt-5">
        <v-col cols="12">
            <div class="d-sm-flex align-center mb-5">
                <h3 class="text-h3">
                    Integrantes
                    <v-chip size="small" class="ml-2 elevation-0" variant="elevated" color="secondary">{{ filteredCards.length }}</v-chip>
                </h3>
                <v-sheet width="250" class="ml-0 ml-sm-auto mt-3 mt-sm-0">
                    <v-text-field
                        color="primary"
                        hide-details
                        variant="outlined"
                        placeholder="Search Followers"
                        density="compact"
                        prepend-inner-icon="mdi-magnify"
                        v-model="searchValue"
                    >
                    </v-text-field>
                </v-sheet>
            </div>

            <v-row>
                <v-col cols="12" md="4" sm="6" v-for="(card, i) in filteredCards" :key="i">
                    <v-card elevation="10">
                        <v-card-text>
                            <div class="d-flex align-center gap-3">
                                <v-avatar size="40">
                                    <img :src="card.avatar" :alt="card.avatar" width="40" />
                                </v-avatar>
                                <div class="w-50">
                                    <h6 class="text-h6">{{ card.nombre }}</h6>
                                    <span class="text-truncate d-flex align-center gap-2">
                                        <mapPinIcon size="14" />
                                        <span class="text-truncate w-50">{{ card.location }}</span>
                                    </span>
                                </div>
                                <div class="ml-auto">
                                    <v-btn v-if="card.follow == 1" variant="outlined" color="primary"> Followed</v-btn>
                                    <v-btn v-else variant="flat" color="primary"> Follow</v-btn>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
