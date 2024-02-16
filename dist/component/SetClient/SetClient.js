"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetClient = void 0;
const context_1 = require("@apollo/client/link/context");
const client_1 = require("@apollo/client");
const httpLink = new client_1.HttpLink({
    uri: 'http://localhost:4000/graphql',
});
const authLink = (0, context_1.setContext)((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: Object.assign(Object.assign({}, headers), { "x-token": token ? token : " " }),
    };
});
exports.SetClient = new client_1.ApolloClient({
    link: authLink.concat(httpLink),
    cache: new client_1.InMemoryCache(),
});
