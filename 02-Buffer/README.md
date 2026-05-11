# 02-Buffer

This is a simple demonstration of using the `Buffer` class in Node.js.

## What is a Buffer?
In Node.js, a `Buffer` is a global object used to handle binary data. Because JavaScript historically had no mechanism for reading or manipulating streams of binary data, the `Buffer` class was introduced as part of the Node.js API to make it possible to interact with TCP streams, file system operations, and other contexts where binary data is required.

## Features in this example:
- **Buffer.from**: Creating a new buffer from a string.
- **toString**: Converting binary buffer data back into a readable string format.

## Running the code:
```bash
npm start
# Or run with tsx:
npx tsx BufferBasic.ts
```