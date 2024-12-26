import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

const JWT_SECRET = "$uperM@n@123";

// CreateUserPayload: Defines the structure for creating a user.

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

// GetUserTokenPayload: Defines the structure for generating a login token.

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
//   Combines a random salt with the user's password and hashes it using SHA-256.
// Ensures passwords are stored securely in the database.
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  // getUserById: Fetches a user by their unique id from the database.

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  // createUser: Creates a new user in the database.
  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  // getUserByEmail: Fetches a user by their email from the database.
  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  //Generates a JWT token for authenticated users.
  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Generate JWT token
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  // Decodes a JWT token to extract the user information
  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}

export default UserService;
