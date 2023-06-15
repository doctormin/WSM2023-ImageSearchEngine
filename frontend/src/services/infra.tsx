import { API_BASE_URL, DEFAUL_HEADERS } from "../config";
import useSWR, { SWRResponse } from "swr";

export function post(path: string, body?: BodyInit | null) {
    const url = API_BASE_URL + path;
    if (body === undefined) {
        body = null
    }
    return fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: DEFAUL_HEADERS,
        body: body
    });
}

export function put(path: string, body?: BodyInit | null) {
    const url = API_BASE_URL + path;
    return fetch(url, { 
        method: "PUT", 
        mode: "cors",
        credentials: "include",
        headers: DEFAUL_HEADERS,
        body: body
    });
}

export function delete_(path: string, body?: BodyInit | null) {
    const url = API_BASE_URL + path;
    return fetch(url, { 
        method: "DELETE", 
        mode: "cors",
        credentials: "include",
        headers: DEFAUL_HEADERS,
        body: body
    });
}


export function useFetch<Data>(path: string): SWRResponse<Data, any> {
    const fetcher = async (_url: string) => {
        const res = await fetch(_url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            // credentials: 'include'
        });
        if (!res.ok) {
            throw res;
        }
        const json = await res.json();
        if (json.error) {
            throw res;
        }
        return json.data;
    }
    const url = API_BASE_URL + path;
    return useSWR<Data, any>(url, fetcher);
}

export function parseTimestamp(timestamp: string): string {
    var t = new Date(timestamp);
    var formatted = Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(t)
    return formatted
}

