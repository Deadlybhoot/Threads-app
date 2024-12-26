// Definition of Queries:
// The queries variable is defined as a string that contains GraphQL query definitions. These are instructions for how the application can request specific data from the backend.

// First Query: getUserToken:

// Purpose: To get a user authentication token based on their email and password.
// Inputs:
// email: The user’s email address (a String).
// password: The user’s password (also a String).
// Output:
// A String, which is the JWT token used for authentication.

// Second Query: getCurrentLoggedInUser:

// Purpose: To fetch the details of the currently logged-in user.
// Inputs:
// No additional input is required; it relies on the authentication token of the logged-in user.
// Output:
// A User object containing the user’s details like name, email, and more.


export const queries = `#graphql
    getUserToken(email: String!, password: String!): String
    getCurrentLoggedInUser: User
`;
