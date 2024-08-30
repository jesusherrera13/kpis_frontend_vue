<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getPrimary, getSecondary } from '@/utils/UpdateColors';

import { useDashboarStore } from '@/stores/apps/dashboard';
const storeDashboard = useDashboarStore();

onMounted(() => {
    storeDashboard.fetchEmpresaAcumulado();
});

const categorias: any = computed(() => {
    return storeDashboard.empresa_acumulado.map((item: any, i) => {
        return item.nombre;
    });
});

const series: any = computed(() => {
    let series_: any = [];
    if (storeDashboard.empresa_acumulado.length) {
        let tmp: any = [];
        tmp = (storeDashboard.empresa_acumulado[0] as never)['rubros'];

        series_ = tmp.map((item: any) => {
            return { name: item.rubro, data: [] };
        });

        storeDashboard.empresa_acumulado.map((empresa: any) => {
            empresa.rubros.map((rubro: any) => {
                for (var i in series_) {
                    if (series_[i].name == rubro.rubro) {
                        series_[i].data.push(rubro.total);
                    }
                }
            });
        });
    }

    return series_;
});

/*Chart*/
const chartOptions = computed(() => {
    series.value;
    return {
        series: series.value,
        /* series: [
            {
                name: 'Alimentos',
                // data: [800000, 1200000, 1400000, 1300000, 1200000, 1400000, 1300000, 1300000, 1200000]
                data: [800000, 1200000, 1400000]
            },
            {
                name: '2020',
                data: [200000, 400000, 500000]
            }
        ], */

        grid: {
            show: true,
            borderColor: 'rgba(0, 0, 0, .3)',
            strokeDashArray: 3,
            padding: {
                left: 0,
                right: 0,
                bottom: 0
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '15%',
                endingShape: 'flat'
            }
        },
        colors: [getPrimary.value, getSecondary.value, '#fc4b6c'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        chart: {
            stacked: true,
            foreColor: '#adb0bb',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0
        },
        legend: {
            show: false
        },
        xaxis: {
            type: 'category',
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept'],
            categories: categorias.value,
            labels: {
                style: {
                    cssClass: 'text-muted fill-color'
                }
            }
        },
        yaxis: {
            show: true,
            labels: {
                style: {
                    cssClass: 'text-muted fill-color'
                }
            }
        },
        stroke: {
            curve: 'straight',
            width: 0
        },
        tooltip: {
            theme: 'dark'
        }
    };
});
</script>
<template>
    <v-card elevation="10">
        <v-card-text>
            <div class="d-md-flex align-center">
                <div>
                    <h3 class="text-h5 title mb-1">Total Acumulado</h3>
                    <h5 class="text-subtitle-1">Rubros de Empresas</h5>
                </div>
            </div>
            <apexchart class="mt-6" type="bar" height="270px" :options="chartOptions" :series="chartOptions.series"> </apexchart>
        </v-card-text>
    </v-card>
</template>
