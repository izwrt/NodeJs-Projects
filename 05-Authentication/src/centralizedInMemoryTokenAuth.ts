import express from "express";
import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";

const app = express();
const PORT = 8000;

app.use(express.json());

/*
  Topic 1: Centralized in-memory token authentication

  How it works:
  The server creates a token and stores the user against that token.
  Later, the client sends the token back, and the server looks it up.

  Pros:
  - Very simple to understand and implement
  - Client only needs to remember one token
  - Server can invalidate a token by deleting it from usersByToken

  Cons:
  - Duplicate email checks are slower because we scan the central store
  - All data is lost when the server restarts
  - This does not work well with multiple servers unless they share storage
  - This is only for learning; production apps need password hashing, expiry, and stronger security
*/

type User = {
  name: string;
  email: string;
  password: string;
};

// Central token store: token -> user.
const usersByToken: Record<string, User> = {};

// Create a user account and issue a basic token for future requests.
app.post("/sign-up", (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  // We keep only one central store in this lesson, so we scan it to find duplicate emails.
  const emailAlreadyExists = Object.values(usersByToken).some((user) => user.email === email);

  if (emailAlreadyExists) {
    return res.status(409).json({
      error: "Email already exists"
    });
  }

  const token = randomUUID();
  
  usersByToken[token] = { name, email, password };

  return res.status(201).json({
    message: "User has been created",
    token
  });
});

// Read the current user's profile by looking up the token.
app.post("/me", (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      error: "Token is required"
    });
  }

  const user = usersByToken[token];

  if (!user) {
    return res.status(401).json({
      error: "Invalid token"
    });
  }

  const { password, ...userWithoutPassword } = user;

  return res.status(200).json({
    user: userWithoutPassword
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
