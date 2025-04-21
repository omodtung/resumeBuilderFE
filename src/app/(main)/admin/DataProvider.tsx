import {DataProvider, fetchUtils, DeleteManyResult} from "react-admin"
import fetch from "node-fetch";

const API_URL = "http://localhost:8080/admin";

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const page = (params.pagination?.page ?? 1) - 1;
        const perPage = params.pagination?.perPage ?? 10;
        let sort = params.sort?.field ?? '';
        let order = params.sort?.order ?? 'ASC';
        // console.log(sort);

        let apiUrl = `${API_URL}/${resource === 'user_subscriptions' ? 'users-pagi' : resource}${resource === 'users' ? '-pagi' : ''}?page=${page}&limit=${perPage}&order=${order}`;

        const response = await fetch(apiUrl).then(res => res.json());
        console.log(response);

        let data;
        let total;

         if (resource === 'plans' || resource === 'resumes') {
            data = response;
            total = Array.isArray(response) ? response.length : 0;
        }
        else if (resource === 'user_subscriptions') {
            data = response.user.flatMap(user => user.userSubscriptions);
            total = data.length;
        } else {
            data = response[resource];
            total = Array.isArray(data) ? data.length : 1;
        }

        return {
            data: data,
            // total: parseInt(response.headers.get('X-Total-Count') || '0', 10),
            total: total,
        };
    },
    getOne: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}/${params.id}`).then(res => res.json());
        const keys = Object.keys(response);
        const key = keys[0];
        let data = response[key];
        console.log(response);
        return {data: data};
    },
    getMany: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}`).then(res => res.json());
        return {
            data: response.filter((item: any) => params.ids.includes(item.id)),
            total: response.length,
        };
    },
    getManyReference: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}`).then(res => res.json());
        return {
            data: response.filter((item: any) => params.target === item.id),
            total: response.length,
        };
    },
    create: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        }).then(res => res.json());
        const keys = Object.keys(response);
        const key = keys[0];
        let data = response[key];
        console.log(response);
        return {data: data};
    },
    update: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        }).then(res => res.json());
        const keys = Object.keys(response);
        const key = keys[0];
        let data = response[key];
        console.log(response);
        return {data: data};
    },
    updateMany: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        }).then(res => res.json());
        return {data: response};
    },
    delete: async (resource, params) => {
        const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(res => res.json());
        return {data: response};
    },
   deleteMany: async (resource, params) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: params.ids }),
    });
    if (response.status === 204) {
        return Promise.resolve({ data: params.ids } as DeleteManyResult);
    }
    throw new Error('Failed to delete');
  },
};
