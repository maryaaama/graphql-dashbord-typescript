import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage or another source
  const token = localStorage.getItem('token');
  console.log('set client x-token',token);
  // Return the headers to the context so httpLink can read them
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
