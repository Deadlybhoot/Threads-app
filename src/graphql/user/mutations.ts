// Graphql code for creating new user
// This would:

// Create a new user with the provided firstName, lastName, email, and password.
// Return a string, which could be something like: "User created successfully!".




export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!): String
`;



// firstName: String!: The user's first name. The ! means this field is required.