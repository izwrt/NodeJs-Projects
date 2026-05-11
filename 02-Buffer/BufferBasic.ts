import { Buffer } from "node:buffer";

// Create a buffer from a string. This converts the text into binary data.
const data = Buffer.from("Hello Ishwar");

// Convert the binary buffer back to a readable string and log it
console.log(data.toString());
