<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiTittleSubtitleCard from '@/components/shared/UiTittleSubtitleCard.vue';
import TheBandwidthUsage from '@/components/dashboards/analytical/TheBandwidthUsage.vue';
import TheDownloadCount from '@/components/dashboards/analytical/TheDownloadCount.vue';
import TotalVisitors from '@/components/dashboards/classic/TotalVisitors.vue';
import CurrentVisits from '@/components/dashboards/classic/CurrentVisits.vue';
import BlogCard from '@/components/dashboards/analytical/BlogCard.vue';
import NewsletterCampaign from '@/components/dashboards/analytical/NewsletterCampaign.vue';
import TheMonthTable from '@/components/dashboards/classic/TheMonthTable.vue';
import TheProfileCard from '@/components/dashboards/analytical/TheProfileCard.vue';
import TheRecentComments from '@/components/dashboards/classic/TheRecentComments.vue';
import TheTodoList from '@/components/dashboards/classic/TheTodoList.vue';
import TheDashboardTopCards from '@/components/dashboards/classic/TheDashboardTopCards.vue';
import EmpresaAcumulado from '@/components/dashboards/minimal/EmpresaAcumulado.vue';
import EmpresaAcumuladoTable from '@/components/dashboards/classic/EmpresaAcumuladoTable.vue';
import TopGastosEstados from '@/components/dashboards/classic/TopGastosEstados.vue';
import RubroBarraApilada from '@/components/dashboards/minimal/RubroBarraApilada.vue';
import RubroAcumuladoTable from '@/components/dashboards/classic/RubroAcumuladoTable.vue';

import { useDashboarStore } from '@/stores/apps/dashboard';

const storeDashboard = useDashboarStore();
const page = ref({ title: 'Classic' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Estadísticas',
        disabled: true,
        href: '#'
    }
]);

onMounted(() => {
    // storeDashboard.fetchDashboard();
});

const getData: any = computed(() => {
    return storeDashboard.data.map((item) => {
        // console.log(item);
        return item;
    });
});

const data = ref(getData);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <!---Revenue cards--->
        <v-col cols="12" sm="12" lg="12" class="mt-3">
            <h3 class="mb-3">Top Gastos</h3>
            <TheDashboardTopCards />
        </v-col>

        <v-col cols="12" sm="12" lg="12" class="mt-3">
            <RubroBarraApilada />
        </v-col>

        <v-col cols="12" sm="12" lg="12" class="mt-3">
            <EmpresaAcumulado />
        </v-col>

        <!---Table--->
        <v-col cols="12" sm="12" lg="8">
            <EmpresaAcumuladoTable />
        </v-col>
        <!---User profile card--->
        <!-- <v-col cols="12" sm="12" lg="4">x
            <TheProfileCard />
        </v-col> -->

        <!---Revenue cards--->
        <!-- <v-col cols="12" sm="12" lg="12" class="mt-3">
            <h3 class="mb-3">Orígen</h3>
            <TheDashboardTopCards />
        </v-col> -->

        <!-- <v-col cols="12" sm="12" lg="12" class="mt-3">
            <EmpresaAcumulado />
        </v-col> -->

        <!---Bandwidth usage / Download count--->

        <!-- <v-col cols="12" sm="12" lg="4">
            <TheBandwidthUsage />
            <div class="mt-7"></div>
            <TheDownloadCount />
        </v-col> -->

        <!---Total visitors--->
        <v-col cols="12" sm="12" lg="8">
            <UiTittleSubtitleCard title="Estado Top Gastos" subtitle="GASPASA">
                <TopGastosEstados />
            </UiTittleSubtitleCard>
        </v-col>
        <!---Current visits-->
        <v-col cols="12" sm="12" lg="4">
            <CurrentVisits />
        </v-col>
        <!---Blog cards--->
        <v-col cols="12" sm="12" lg="4">
            <BlogCard />
        </v-col>
        <!---Newsletter Campaign--->
        <v-col cols="12" sm="12" lg="4">
            <NewsletterCampaign />
        </v-col>
        <!---Table--->
        <v-col cols="12" sm="12" lg="8">
            <RubroAcumuladoTable />
        </v-col>
        <!---User profile card--->
        <v-col cols="12" sm="12" lg="4">
            <TheProfileCard />
        </v-col>
        <!---Recent comments--->
        <v-col cols="12" sm="12" lg="6">
            <TheRecentComments />
        </v-col>
        <!---To do list--->
        <v-col cols="12" sm="12" lg="6">
            <TheTodoList />
        </v-col>
    </v-row>
</template>
