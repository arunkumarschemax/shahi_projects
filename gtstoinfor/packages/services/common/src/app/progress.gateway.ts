// progress.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true})
export class ProgressGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Set<Socket> = new Set();

  async handleConnection(client: Socket) {
    await this.connectedClients.add(client);
    console.log('New client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client);
    console.log('Client disconnected:', client.id);
  }

  // This method will be called from your transactional service to publish progress updates
  publishProgress(progress: number) {
    for (const client of this.connectedClients) {
      client.emit('progress', progress);
    }
  }
}
