import fastify   from 'fastify';
import fastifyIO from "fastify-socket.io";

import { WebSocketRequest } from './dto/WebSocketRequest';

const server = fastify();

server.register(fastifyIO);

server.get("/", (req, reply) => {
  server.io.emit("hello");
});

server.ready().then(() => {
  server.io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on("playerAction", (data) => {
      console.log(`Received player action from ${socket.id}:`, data);
      const wsMessage: WebSocketRequest = {
        requestContext: {
          connectionId: socket.id,
          routeKey: '$connect'
        },
        body: data
      }
      socket.emit("actionResponse", { message: "Action received", data: wsMessage });
    });
    
    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} disconnect`);
    });
  });
});

server.listen({
  port: 3004
}).then(() => console.log('Offline [websocket] listening on http://localhost:3004'))