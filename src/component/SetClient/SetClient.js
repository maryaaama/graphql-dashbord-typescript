import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
 
  const token = localStorage.getItem('token');
 
  return {
    headers: {
      ...headers,
      "x-token": token ? token : " ",
      
    },
  };
});

export const SetClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
