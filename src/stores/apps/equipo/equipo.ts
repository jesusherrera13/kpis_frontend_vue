import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useEquipoStore = defineStore({
    id: 'Equipo',
    state: () => ({
        equipos: [],
        equipo: {
            id: '',
            nombre: '',
            departamento_id: ''
        },
        params: {},
        is_loading: false,
        integrantes: []
    }),
    actions: {
        // Fetch followers from action
        async fetchEquipos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/equipo`, { params: this.params });
                this.equipos = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                console.log(this.equipo);
                const response = await axiosClient.post(`/equipo`, this.equipo);
                this.equipo = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async show(id: any) {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/equipo/${id}`);
                this.equipo = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            this.is_loading = true;
            try {
                const response = await axiosClient.put(`/equipo/${this.equipo.id}`, this.equipo);
                this.equipo = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/equipo/${this.equipo.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async fetchIntegrantes(equipo_id: any) {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/equipo-integrantes`, { equipo_id: equipo_id });
                this.integrantes = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async storeIntegrantes(items: Object) {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/equipo-store-integrantes`, { items: items });
                // this.equipos = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        }
    }
});
