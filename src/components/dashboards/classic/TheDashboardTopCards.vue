<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ActivityIcon, AnchorIcon, DeviceDesktopIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import { useDashboarStore } from '@/stores/apps/dashboard';

const storeDashboard = useDashboarStore();

onMounted(() => {
    storeDashboard.fetchDashboardTop();
});

const getData: any = computed(() => {
    let icons = [ActivityIcon, AnchorIcon, DeviceDesktopIcon, ShoppingCartIcon];
    let icon_colors = ['bg-secondary', 'bg-warning', 'bg-primary', 'bg-error'];

    return storeDashboard.top.map((item: any, i) => {
        return { ...item, icon: icons[i], iconcolor: icon_colors[i] };
    });

    return [];
});

const the_tops = ref(getData);
</script>
<template>
    <v-row>
        <v-col cols="12" lg="3" sm="6" v-for="item in the_tops" :item="item" :key="item.title" class="py-0 mb-3">
            <VCard elevation="10">
                <v-card-text class="pa-5">
                    <div class="d-flex align-center">
                        <v-btn :class="[item.iconcolor]" class="elevation-0 mr-2" icon dark>
                            <component :is="item.icon" stroke-width="1.5" size="24" />
                        </v-btn>
                        <div class="">
                            <h2 class="text-h4">${{ item.total.toLocaleString('en-us', { minimumFractionDigits: 2 }) }}</h2>
                            <h4 class="text-subtitle-1 mt-1">
                                {{ item.titulo }}
                            </h4>
                        </div>
                    </div>
                </v-card-text>
            </VCard>
        </v-col>
    </v-row>
</template>
