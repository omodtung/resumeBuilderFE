import {DataProvider, fetchUtils, DeleteManyResult} from "react-admin"
import fetch from "node-fetch";

const API_URL = "http://localhost:8080/admin";

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const page = (params.pagination?.page ?? 1) - 1;
        const perPage = params.pagination?.perPage ?? 10;
        let sort = params.sort?.field ?? '';
        let order = params.sort?.order ?? 'ASC';
        let filter = params.filter ?? '';
        sort = sort === 'id' ? '' : sort; //bypass sort id error
        

         if (params.filter && Object.keys(params.filter).length === 0 && params.filter.constructor === Object) {
            filter = '';
        } if (typeof params.filter === 'object') {
            params.filter = JSON.stringify(params.filter);
        }
        if (params.filter) {
            if (typeof params.filter === 'string') {
                try {
                    // Decode the URL-encoded string
                    const decodedFilter = decodeURIComponent(params.filter);

                    // Parse the decoded string as a JSON object
                    const filterObject = JSON.parse(decodedFilter);

                    // Extract values from the object and append them to the API URL
                    Object.entries(filterObject).forEach(([key, value]) => {
                        sort = key;
                        filter = value;
                        console.log(`Filter key: ${key}, Filter value: ${value}`);
                    });
                } catch (error) {
                    console.error("Error parsing filter:", error);
                    // Handle the error appropriately, e.g., by ignoring the filter
                }
            }
        }

        let apiUrl;
        console.log(resource);
        if (resource.startsWith('users/resumes/')) {
            const userId = resource.split('/')[2];
            
            apiUrl = `${API_URL}/users/resumes/${userId}?page=${page}&limit=${perPage}&filter=${filter}&sort=${sort}&order=${order}`; //user resumes
        } else {
            apiUrl = `${API_URL}/${
              resource === 'plans'
                ? 'plans-filter'
                : resource === 'user_subscriptions'
                ? 'user-subscription'
                : resource === 'users'
                ? 'users-pagi'
                : resource === 'resumes'
                ? 'resumes-filter'
                : resource
            }?page=${page}&limit=${perPage}&filter=${filter}&sort=${sort}&order=${order}`;
        }

        // Get token from session storage
        const token = sessionStorage.getItem('token');

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        console.log(apiUrl);
        console.log(response);

        let data;
        let total;

        if (resource.startsWith('users/resumes/')) {
            data = response;
            total = Array.isArray(response) ? response.length : 0;
        } else {
             data = response.data;
             total = response.totalItems;
        }

        return {
            data: data,
            total: total,
        };
    },
    getOne: async (resource, params) => {
        // Get token from session storage
        const token = sessionStorage.getItem('token');

        const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        const keys = Object.keys(response);
        const key = keys[0];
        let data = response[key];
        if (resource === 'users') {
            const userSubscriptionResponse = await fetch(`${API_URL}/user_subscription/${data.user_subscription_id}`).then(res => res.json());
            data.user_subscription = userSubscriptionResponse.user_subscription;
        }
        console.log(response);
        return {data: data};
    },
    getMany: async (resource, params) => {
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/${resource}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return {
            data: response.filter((item: any) => params.ids.includes(item.id)),
            total: response.length,
        };
    },
    getManyReference: async (resource, params) => {
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/${resource}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return {
            data: response.filter((item: any) => params.target === item.id),
            total: response.length,
        };
    },
    create: async (resource, params) => {
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/${resource}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
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
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
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
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/${resource}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        }).then(res => res.json());
        return {data: response};
    },
    delete: async (resource, params) => {
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return {data: response};
    },
   deleteMany: async (resource, params) => {
    // Get token from session storage
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/${resource}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
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
