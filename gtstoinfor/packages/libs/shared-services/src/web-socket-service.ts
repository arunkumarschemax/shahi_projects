// WebSocketClient.js
import io from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const socket = io(URL,{protocols:'protocolOne'}); // Replace with your WebSocket server URL

const WebSocketClient = {
  connect: () => {
    socket.connect().on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('progress', (progress) => {
      // Handle the progress updates received from the server
      console.log('Progress:', progress);
      // Update your React state to show the progress in the frontend
      // For example, set the progress value in a state variable and display it in the UI
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  },
  disconnect: () => {
    socket.disconnect();
  },
};

export default WebSocketClient;
