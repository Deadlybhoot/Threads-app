import UserService, { CreateUserPayload } from "../../services/user";

const queries = {

//   getUserToken:

// Purpose: Fetches a login token for a user based on their email and password.

// How It Works:

// Takes email and password as input.
// Passes them to the UserService.getUserToken() function to generate a token.
// Returns the token.
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },


//   getCurrentLoggedInUser

// Purpose: Gets information about the currently logged-in user.

// How It Works:

// Checks the context (provided by GraphQL server) to see if a user is logged in.
// If logged in, it fetches the user's details using their id.
// Throws an error if no user is logged in.
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
};
//
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
