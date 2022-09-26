import { GraphQLClient } from "graphql-request";

// REMEMBER TO GET A NEW ZORA API KEY
const graphQLClient = new GraphQLClient("https://api.zora.co/graphql", {
    "X-API-KEY": "tLkmBFLHCjaPMsJKa8raNw",
});
export default graphQLClient