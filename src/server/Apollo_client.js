import { ApolloClient, InMemoryCache, } from '@apollo/client';

const AUTH_TOKEN = '8989cAdx1ph22'
const CORS = 'https://cors-anywhere.herokuapp.com/'
const client = new ApolloClient({
    uri: `${CORS}https://dropmail.me/api/graphql/${AUTH_TOKEN}`,
    fetchOptions: {
      mode: 'cors',
    },
    headers: {
      ContentType: 'text/json'
    },
    cache: new InMemoryCache(),
  }); 

export default client