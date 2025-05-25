#  Anonymous Chat App

A minimalist, real-time anonymous chat platform that pairs users by language — no accounts, no names, just conversation.

##  Features

-  Anonymous user pairing based on selected language
-  Real-time chat using WebSockets (Socket.IO)
-  Simple matching flow, extensible for topics and feelings
-  Automatically handles partner disconnections
-  No login, no tracking — completely anonymous

---

##  Getting Started

### Prerequisites

Make sure you have Node.js installed:

```bash
node -v
npm -v
```

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/anonymous-chat.git
cd anonymous-chat
npm install
```

The server will run on `http://localhost:3000`. Visit it in your browser to use the chat.

## How It Works

- User connects and selects a language.
- The server searches for a waiting user in the same language queue.
- If a match is found, both users are paired and can chat anonymously.
- If no match is found, the user is added to the waiting queue.
- If one user disconnects, the partner is notified.


## Built With

- Express
- Socket.IO
- HTML/CSS/JavaScript (for frontend)

## Future Improvements

- Matching by topic or mood
- Typing indicators and read receipts
- Chat timeout or "skip" button
- Responsive frontend UI enhancements
- Anonymous feedback after chat

## License

This project is licensed under the MIT License.

## Acknowledgements

- Inspired by anonymous peer-to-peer chat platforms
- Built for fun and simplicity
