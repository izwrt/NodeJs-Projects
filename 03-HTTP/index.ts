import type { RequestListener } from "node:http";
import http from "node:http";
import fs from "node:fs";

const handler: RequestListener = (req, res) => {
  const method = req.method;
  const path = req.url;

  // Log every incoming request to a file
  const log = `\n[${new Date().toLocaleDateString()}]: ${method} ${path}`
  fs.appendFileSync('log.txt',log, 'utf-8');

  // Handle requests based on their HTTP Method (GET vs POST)
  switch (method) {
    case "GET": {
      // Handle different URLs for GET requests
      switch (path) {
        case "/":
            return res.writeHead(200).end("Hello from the Server!");

        case '/contact-us':
            return res.writeHead(200).end("izwrt@gmail.com")

        case "/tweet":
                return res.writeHead(201).end("Tweet-1\nTweet-2")
      }
    }
    break;

    case "POST": {
        // Handle different URLs for POST requests
        switch (path) {
            case "/tweet":
                return res.writeHead(201).end("Hello from the server!")
        }
    }
  }

  // Fallback for any route or method that isn't handled above
  return res.writeHead(404).end('Ops Your lost...!')
};

const server = http
  .createServer(handler)
  .listen(8000, () => console.log(`Server started.... OLA!`));
