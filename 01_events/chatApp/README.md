# Simple ChatApp using Node.js Events

This is a simple Chat Room application built using Node.js's built-in `EventEmitter` module. It demonstrates how event-driven programming works in Node.js, allowing different parts of an application to communicate with each other through events.

## Features

- **Join**: Users can join the chat room. Emits a `join` event.
- **Message**: Users can send messages to the chat room, provided they have joined. Emits a `message` event.
- **Leave**: Users can leave the chat room. Emits a `leave` event.

## How it works

The application consists of two main files:
1. `chatRoom.ts`: Defines the `ChatRoom` class that extends `EventEmitter`. It holds the state of the active users using a `Set` and defines the methods to `join`, `sendMessage`, and `leave`. Whenever these methods are called successfully, an event is emitted.
2. `index.ts`: The entry point. It creates an instance of `ChatRoom`, listens for the events (`join`, `message`, `leave`), and simulates a sequence of actions by different users.

## Concepts Demonstrated

- **Event Emitters**: Using `node:events` to publish and subscribe to custom events.
- **Class Inheritance**: The `ChatRoom` class extends the `EventEmitter` class.
- **Sets**: Using JavaScript's `Set` object to manage a unique list of active chat users.

## Running the app

Make sure you have Node.js and `tsx` installed.

```bash
npm start
# or run directly with tsx
npx tsx index.ts
```
