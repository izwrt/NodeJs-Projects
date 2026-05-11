import { EventEmitter } from "node:events";

// The ChatRoom class extends EventEmitter to inherit event-driven capabilities
class ChatRoom extends EventEmitter {
    // A Set is used to store active users, ensuring all usernames are unique
    users: Set<string>
    
    constructor() {
        super();
        this.users = new Set<string>();
    }

    // Method to handle a user joining the chat
    join(user: string) {
        this.users.add(user);
        // Emits a 'join' event with the username, which listeners can react to
        this.emit('join', user)
    }

    // Method to handle sending a message
    sendMessage(user:string, message:string){
        // Ensure the user has actually joined before they can send messages
        if(this.users.has(user)) {
            // Emits a 'message' event with the username and their message
            this.emit('message', user, message)
        }
        else{
            console.log(`${user} is not in chat`)
        }
    }

    // Method to handle a user leaving the chat
    leave(user: string){
        // Check if the user is in the chat room
        if(this.users.has(user)){
            this.users.delete(user);
            // Emits a 'leave' event after successfully removing the user
            this.emit('leave', user);
        }
        else{
            console.log(`${user} is not available`);
        } 
    }
}

export default ChatRoom;

