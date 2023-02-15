import { ApolloClient, InMemoryCache } from '@apollo/client';

const AUTH_TOKEN = '8989cAdx1ph22'

const client = () =>{ 
    const client = new ApolloClient({
    uri: `https://dropmail.me/api/graphql/${AUTH_TOKEN}`,
    cache: new InMemoryCache(),
  })

  return client 
}

export default client