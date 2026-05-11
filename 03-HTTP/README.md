# 03-HTTP (Advanced Routing & Logging)

This project builds upon the basic HTTP server by adding more advanced native routing based on HTTP methods (GET, POST) and implementing a simple file-based logging system.

## Features in this example:
- **Method-based Routing**: Distinguishing between `GET` and `POST` requests using `req.method`.
- **Path-based Routing**: Using nested switch statements to handle different URLs based on their method.
- **File System Logging**: Using Node's native `fs` (File System) module to append request logs to a `log.txt` file automatically.
- **Chaining Responses**: Writing the status code and ending the response in a single line using `res.writeHead(200).end(...)`.

## Running the code:
```bash
npm start
# Or run with tsx:
npx tsx index.ts
```