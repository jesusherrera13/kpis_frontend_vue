<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
import { ActivityIcon, AnchorIcon, DeviceDesktopIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import { useDashboarStore } from '@/stores/apps/dashboard';

const storeDashboard = useDashboarStore();

onMounted(() => {
    storeDashboard.fetchTopEstado();
});

const colors = ref([
    '#f1c40f',
    '#9b59b6',
    '#2980b9',
    '#c0392b',
    '#27ae60',
    '#16a085',
    '#b7950b',
    '#1abc9c',
    '#fadbd8',
    '#ba4a00',
    '#641e16'
]);

const labels: any = computed(() => {
    return storeDashboard.top_estados.map((item: any, i) => {
        return item.estado_destino;
    });
});

const series: any = computed(() => {
    return storeDashboard.top_estados.map((item: any, i) => {
        return item.total;
    });
});

const getEstados: any = computed(() => {
    return storeDashboard.top_estados.map((item: any, i) => {
        return item;
    });
});

/*Chart*/
const chartOptions = computed(() => {
    return {
        // series: [25, 35, 35, 15],
        series: series.value,
        // labels: ['Mobile', 'tablet', 'Other', 'Desktop'],
        labels: labels.value,
        chart: {
            height: 210,
            type: 'donut',
            foreColor: '#adb0bb',
            fontFamily: `inherit`
        },
        // colors: [getPrimary.value, getSecondary.value, '#ecf0f2', '#6352ce'],
        colors: colors.value,
        dataLabels: { enabled: false },
        legend: { show: false },
        grid: {
            show: false,
            borderColor: 'transparent',
            padding: { top: 0, right: 0 }
        },
        stroke: { colors: ['transparent'] },
        plotOptions: {
            pie: {
                donut: {
                    size: '80%',
                    background: 'transparent',
                    labels: {
                        show: false,
                        name: {
                            show: true,
                            fontSize: '18px',
                            color: undefined,
                            offsetY: -10
                        },
                        value: { show: false, color: '#98aab4' },
                        total: { show: false, label: 'Our Visitors', color: '#98aab4' }
                    }
                }
            }
        },
        tooltip: { theme: 'dark', fillSeriesColor: false },
        responsive: [{ breakpoint: 480, options: { chart: { height: 230 } } }]
    };
});

const select = ref('March');
const items = ref(['March', 'April', 'May', 'June']);
</script>

<template>
    <!-- ------------------------------------ -->
    <!-- html -->
    <!-- ------------------------------------ -->
    <div class="mt-3 pt-5 position-relative">
        <apexchart type="donut" height="210" :options="chartOptions" :series="chartOptions.series"></apexchart>
    </div>
    <div class="d-flex align-center justify-space-between mt-9">
        <div v-for="item in getEstados" :key="item.estado_destino_id" class="d-flex align-center px-2">
            <span class="text-overline">
                <i class="mdi mdi-brightness-1 text-secondary mx-1"></i>
            </span>
            <span class="textSecondary text-subtitle mr-1">{{ item.estado_destino }}</span>
        </div>
        <!-- <div class="d-flex align-center px-2">
            <span class="text-overline">
                <i class="mdi mdi-brightness-1 text-primary mx-1"></i>
            </span>
            <span class="textSecondary text-subtitle mr-1">Sonora</span>
        </div>
        <div class="d-flex align-center px-2">
            <span class="text-overline">
                <i class="mdi mdi-brightness-1 mx-1"></i>
            </span>
            <span class="textSecondary text-subtitle mr-1">Baja California </span>
        </div> -->
    </div>
</template>

<style scoped>
.total-sales-icon {
    position: absolute;
    left: 46%;
    top: 45%;
}
</style>
