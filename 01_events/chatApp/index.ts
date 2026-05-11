import ChatRoom from "./chatRoom.js";

// Initialize a new instance of the ChatRoom
const chat = new ChatRoom()

// Listen for the 'join' event. This callback runs whenever chat.emit('join', ...) is called.
chat.on('join', (user) => {
    console.log(`${user} has joined the chat`);
});

// Listen for the 'message' event.
chat.on('message', (user, message) => {
    console.log(`${user} : ${message}`);
});

// Listen for the 'leave' event.
chat.on('leave', (user) => {
    console.log(`${user} has left the chat`);
});

// --- Simulating Chat Activity ---

// Users join
chat.join("Ishwar")
chat.join("Nakul")

// Users send messages
chat.sendMessage("Ishwar", "Hy Nakul");
chat.sendMessage("Nakul", "Hy Ishwar");

// A user leaves
chat.leave("Ishwar");

// Attempt to send a message after leaving (will trigger the "not in chat" logic)
chat.sendMessage("Ishwar", "This message wont be sent.");