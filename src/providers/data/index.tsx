import graphqlDataProvider, { GraphQLClient,
    liveProvider as graphqlLiveProvider
 } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = 'https://api.crm.refine.dev/graphql'
export const WS_URL = 'wss://api.crm.refine.dev/graphql';
export const API_URL = `${API_BASE_URL}/graphql`;

// this block of code created a custom fetching mechanisym
export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        } catch (error) {
            return Promise.reject(error as Error)
        }
    }
});
// this block of code creates a websocket client 
export const wsClient = typeof window !== "undefined"
 ? createClient({
    url: WS_URL,
    connectionParams: () => {
        const accessToken = localStorage.getItem('access_token');
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
    }
 })
 : undefined

 export const dataProvider = graphqlDataProvider(client);
 export const liveProvider = wsClient ? graphqlDataProvider(wsClient) : undefined;
