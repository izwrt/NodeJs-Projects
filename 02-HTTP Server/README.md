# 02-HTTP Server

This project demonstrates how to build a basic HTTP web server from scratch using Node.js's native `http` module, without using any external frameworks like Express.

## What is the `http` module?
The `node:http` module provides low-level APIs for creating HTTP servers and making HTTP requests. It is the foundation upon which frameworks like Express are built.

## Features in this example:
- **Creating a Server**: Using `http.createServer()` to listen for incoming requests.
- **Routing manually**: Using a `switch` statement on `req.url` to handle different paths (`/` and `/contact-us`).
- **Response Headers & Status Codes**: Using `res.writeHead()` to set status codes (e.g., 200 for OK, 400 for Bad Request).
- **Ending the Response**: Using `res.end()` to send data back to the client and close the connection.

## Running the code:
```bash
npm start
# Or run with tsx:
npx tsx index.ts
```