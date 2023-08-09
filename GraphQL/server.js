import { ApolloServer} from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

import connectToDatabase from "./DB.js";

connectToDatabase();
const server =new ApolloServer({
    typeDefs,
    resolvers,
    plugins:
    [ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log(`server is running in ${url}`);
})