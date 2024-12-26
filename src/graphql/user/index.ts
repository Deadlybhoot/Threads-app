// This code defines and exports everything related to the "User" functionality in a GraphQL schema. It’s a modular way to handle GraphQL code, ensuring that the schema, operations, and logic for "User" are all in one place.

import { typeDefs } from "./typedef";
import { queries } from "./queries";
import { mutations } from "./mutations";
import { resolvers } from "./resolvers";

export const User = { typeDefs, queries, mutations, resolvers };
