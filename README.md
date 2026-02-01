
 🖌️ Real-Time Collaborative Drawing Canvas

A real-time, multi-user drawing application where multiple users can draw simultaneously on a shared canvas.
The app uses raw HTML Canvas API and WebSockets (Socket.io) to synchronize drawing actions instantly across users.



 ✨ Features

* 🎨 Freehand drawing using brush tool
* 🧽 Eraser tool
* 🎚️ Adjustable stroke width
* 🎨 Color selection
* ⚡ Real-time synchronization across multiple users
* ↩️ Global Undo / Redo (affects all users)
* 🌐 Works across multiple browser tabs or windows
* 🧩 No external canvas or drawing libraries used



 🛠️ Tech Stack

 Frontend

* HTML5
* CSS3
* JavaScript
* HTML Canvas API

 Backend

* Node.js
* Express.js
* Socket.io (WebSockets)



 📂 Project Structure

```
collaborative-canvas/
├── client/
│   ├── index.html
│   ├── style.css
│   ├── canvas.js
│   └── socket.js
├── server/
│   └── server.js
├── package.json
└── README.md
```



 ▶️ How to Run the Project

 Prerequisites

* Node.js (v18 or above recommended)

 Steps

```bash
npm install
npm start
```

Open your browser and go to:

```
http://localhost:4000
```

The application will start immediately with no additional setup.



 👥 Testing with Multiple Users

1. Start the server using `npm start`
2. Open the app URL in two or more browser tabs or windows
3. Each tab represents a different user
4. Draw simultaneously in different tabs
5. Verify:

   * Drawings appear in real time
   * Undo and redo actions sync across all tabs
   * Brush, eraser, color, and size work correctly



 🌍 Browser Compatibility

The application works on all modern browsers:

* ✅ Google Chrome
* ✅ Mozilla Firefox
* ✅ Apple Safari



 ⚙️ How It Works (High Level)

* Each user establishes a WebSocket connection with the server
* Drawing actions are sent as stroke data (start point, end point, color, size, tool)
* The server acts as the single source of truth
* All connected clients receive and render updates in real time
* Undo/Redo rebuilds the canvas from the shared stroke history



 ⚠️ Known Limitations

* Cursor indicators are not included to ensure drawing stability under time constraints
* Drawings are not persisted after server restart
* No authentication (each browser tab is treated as a unique user)



 ⏱️ Time Spent

Approximately 3–5 days, including:

* Real-time canvas implementation
* WebSocket synchronization
* Global undo/redo logic
* UI design and testing
* Debugging and stabilization



