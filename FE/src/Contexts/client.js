import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || ""
    }
  }
});
const wsLink = new GraphQLWsLink(createClient({
  uri: `${process.env.NEXT_PUBLIC_API_WS_URL}/subscriptions`,
  options: {
    reconnect: true
  }
}));
const httpLink = new HttpLink({
  uri: 'http://192.168.0.181:5002/graphql',
  // uri:`${process.env.NEXT_PUBLIC_API_URL}/graphql`
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});

export default client
