import { defineStore } from 'pinia';
import axiosClient from '@/axios';

const VITE_API_URL = `${import.meta.env.VITE_API_URL}`;

export const useDashboarStore = defineStore({
    id: 'Dashboard',
    state: () => ({
        top: [],
        top_origen: [],
        top_destino: [],
        top_estados: [],
        data: [],
        empresa_acumulado: [],
        acumulado_empresa: [],
        acumulado_rubro: [],
        is_loading: false
    }),
    actions: {
        async fetchDashboard(params?: any) {
            try {
                const response = await axiosClient.post(`${VITE_API_URL}/dashboard`, { params: params });
                this.data = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchDashboardTop(params?: any) {
            try {
                const response = await axiosClient.post(`${VITE_API_URL}/dashboard/top`, { params: params });
                this.top = response.data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchEmpresaAcumulado(params?: any) {
            try {
                const response = await axiosClient.post(`${VITE_API_URL}/dashboard/empresa-acumulado`, { params: params });
                this.empresa_acumulado = response.data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchAcumuladoEmpresa(params?: any) {
            try {
                const response = await axiosClient.post(`${VITE_API_URL}/dashboard/acumulado-empresa`, { params: params });
                this.acumulado_empresa = response.data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchAcumuladoRubro(params?: any) {
            try {
                const response = await axiosClient.post(`${VITE_API_URL}/dashboard/acumulado-rubro`, { params: params });
                this.acumulado_rubro = response.data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchTopEstado(params?: any) {
            try {
                const response = await axiosClient.post(`${VITE_API_URL}/dashboard/top-estado`, { params: params });
                this.top_estados = response.data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
