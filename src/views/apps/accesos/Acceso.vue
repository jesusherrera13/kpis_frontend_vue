<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import AppBaseCard from '@/components/shared/AppBaseCard.vue';
import ChatListing from '@/components/apps/accesos/ChatListing.vue';
import ChatDetail from '@/components/apps/accesos/ChatDetail.vue';
import ChatProfile from '@/components/apps/accesos/ChatProfile.vue';
import AccesoModulo from '@/components/apps/accesos/AccesoModulo.vue';
import AccesoPlaza from '@/components/apps/accesos/AccesoPlaza.vue';

// theme breadcrumb
const page = ref({ title: 'Chat app' });

const breadcrumbs = ref([
    {
        text: 'Messenger',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Basic -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <v-card elevation="10">
        <AppBaseCard>
            <template v-slot:leftpart>
                <ChatProfile />
                <ChatListing />
            </template>
            <template v-slot:rightpart>
                <ChatDetail />
                <AccesoModulo />
                <!-- <AccesoPlaza /> -->
            </template>

            <template v-slot:mobileLeftContent>
                <ChatProfile />
                <ChatListing />
            </template>
        </AppBaseCard>
    </v-card>
</template>

<style scoped lang="scss">
@media (max-width: 1279px) {
    .v-card {
        position: unset;
    }
}
</style>
