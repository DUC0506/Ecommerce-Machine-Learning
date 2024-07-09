/* eslint-disable no-undef */
import socket from 'socket.io';
import app from './app';
import logger from './config/logger';
import connectDB from './config/db';
import config from './config/config';

// Connect to MongoDB
connectDB();

const serverPort = config.server.port;

const server = app.listen(serverPort, () => {
  logger.info(`
      ################################################
      🚀 Server listening on port: ${serverPort} 🚀
      ################################################
  `);
});
const io = socket(server, {
  cors: {
    origin: process.env.PORT_CLIENT,
    credentials: true
  }
});

global.onlineUsers = new Map();
io.on('connection', (socket1) => {
  global.chatSocket = socket1;
  socket1.on('add-user', (userId) => {
    onlineUsers.set(userId, socket1.id);
  });

  socket1.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket1.to(sendUserSocket).emit('msg-receive', data.msg);
    }
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
