import {DataProvider, fetchUtils} from "react-admin"

const API_URL = "http://localhost:8080/admin";

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const page = params.pagination?.page ?? 1;
        const perPage = params.pagination?.perPage ?? 10;
        const sort = params.sort?.field ?? 'id';
        const order = params.sort?.order ?? 'ASC'; 
        const response = await fetchUtils.fetchJson(
            `${API_URL}/${resource}?page=${page}&limit=${perPage}&sort=${sort}&order=${order}`
        );
        const data = await response.json();
        return {
            data: response.json,
            // total: parseInt(response.headers.get('X-Total-Count') || '0', 10),
            total: data.length,
        };
    },
    getOne: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`);
        const data = await response.json();
        return {data};
    },
    getMany: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}`);
        const data = await response.json();
        return {
            data: data.filter((item: any) => params.ids.includes(item.id)),
            total: data.length,
        };
    },
    getManyReference: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}`);
        const data = await response.json();
        return {
            data: data.filter((item: any) => params.target === item.id),
            total: data.length,
        };
    },
    create: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return {data};
    },
    update: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return {data};
            },
    updateMany: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return {data};
    },
    delete: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return {data};
    },
    deleteMany: async (resource, params) => {
        const response = await fetchUtils.fetchJson(`${API_URL}/${resource}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ids: params.ids}),
        });
        const data = await response.json();
        return {data};
    }
};