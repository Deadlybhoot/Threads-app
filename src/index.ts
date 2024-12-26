import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });


//   Flow in Simple Steps:
// A client sends a request to /graphql with a token in the headers.
// The middleware fetches the token and tries to decode it.
// If decoding is successful:
// The user information is added to the context.
// If decoding fails:
// An empty context is used.
// The GraphQL server uses this context to handle the request and execute the query or mutation based on the user's permissions.


  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), { 
      context: async ({ req }) => {
        // @ts-ignore
        const token = req.headers["token"];

        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
