Client:
- Canvas handles rendering only
- WebSocket sends drawing events
- No drawing logic on server

Server:
- Broadcasts draw events
- Maintains global stroke history
- Handles undo by user ID

Sync Strategy:
- Stroke-based events
- Server is source of truth
