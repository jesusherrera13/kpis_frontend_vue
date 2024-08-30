<script setup lang="ts">
import { ActivityIcon, AnchorIcon, DeviceDesktopIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import { ref, onMounted, computed } from 'vue';
import { useDashboarStore } from '@/stores/apps/dashboard';

import img1 from '@/assets/images/profile/1.jpg';

const storeDashboard = useDashboarStore();

onMounted(() => {
    storeDashboard.fetchAcumuladoEmpresa();
});

const select = ref({ state: 'January', abbr: 'FL' });
const items = ref([
    { state: 'January', abbr: 'FL' },
    { state: 'February', abbr: 'GA' },
    { state: 'March', abbr: 'NE' },
    { state: 'April', abbr: 'CA' }
]);

const getData = computed(() => {
    /* {
        title: 'Total Julio',
        iconcolor: 'bg-secondary',
        icon: ActivityIcon,
        number: '$163,249'
    },
    {
        title: 'Corporativo',
        iconcolor: 'bg-warning',
        icon: DeviceDesktopIcon,
        number: '$52,376'
    },
    {
        title: 'La Paz',
        iconcolor: 'bg-primary',
        icon: ShoppingCartIcon,
        number: '$11,795'
    },
    {
        title: 'Alimentos',
        iconcolor: 'bg-error',
        icon: AnchorIcon,
        number: '$31,687'
    } */
    return storeDashboard.acumulado_empresa.map((item: any) => {
        return { ...item, iconcolor: 'bg-primary', icon: DeviceDesktopIcon, img: img1, statuscolor: 'success', statustext: 'Alto' };
    });
});
</script>
<template>
    <VCard elevation="10">
        <v-card-text>
            <div>
                <h3 class="text-h5 title mb-1">Acumulado de Empresas</h3>
                <h5 class="text-subtitle-1">Table data</h5>
            </div>
            <v-table class="month-table mt-7 mb-5">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-subtitle-1 font-weight-medium">Empresa</th>
                            <!-- <th class="text-subtitle-1 font-weight-medium">Nombre</th> -->
                            <th class="text-subtitle-1 font-weight-medium">Prioridad</th>
                            <th class="text-subtitle-1 font-weight-medium">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in getData" :key="item.empresa_origen_id" class="month-item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40">
                                        <img :src="item.img" alt="user" width="45" />
                                    </v-avatar>
                                    <div class="mx-4">
                                        <h4 class="text-subtitle-1 text-no-wrap font-weight-medium">
                                            {{ item.empresa_origen }}
                                        </h4>
                                        <h6 class="text-subtitle-2 text-no-wrap textSecondary mt-1">
                                            {{ item.leademail }}
                                        </h6>
                                    </div>
                                </div>
                            </td>
                            <!-- <td>
                                <h5 class="text-no-wrap text-body-1">{{ item.projectname }}xx</h5>
                            </td> -->
                            <td>
                                <v-chip class="ma-2" :color="item.statuscolor" size="small" label>{{ item.statustext }}</v-chip>
                            </td>
                            <td>
                                <h4 class="text-no-wrap text-body-1">
                                    {{ item.total.toLocaleString('en-us', { minimumFractionDigits: 2 }) }}
                                </h4>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </v-card-text>
    </VCard>
</template>
