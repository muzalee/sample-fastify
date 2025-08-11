import fastify from 'fastify';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/helpers/response.helper';
import { v1Routes } from '@/routes/v1';
import cors from '@fastify/cors';
import { appConfig } from './configs';

const server = fastify({
  logger: true,
});

server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
});

const setupErrorHandlers = () => {
  server.setNotFoundHandler((request, reply) => {
    sendErrorResponse(reply, {
      statusCode: 404,
      message: `Route ${request.method}:${request.url} not found`,
    });
  });

  server.setErrorHandler((error, _, reply) => {
    sendErrorResponse(reply, {
      error,
    });
  });
};

const startServer = async () => {
  try {
    // NOTE: MongoDB
    // await mongoose.connect(appConfig.MONGODB_URI ?? '');
    // server.log.info(`MongoDB connected successfully`);

    setupErrorHandlers();

    registerRoutes();

    const port = Number(appConfig.PORT) || 3000;
    server.listen({ port, host: '0.0.0.0' });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

const registerRoutes = () => {
  // API health check endpoint
  server.get('/', (_req, reply) => {
    sendSuccessResponse(reply, {
      statusCode: 200,
      message: 'Welcome to Sample Fastify API',
    });
  });

  // Register v1 routes
  server.register(v1Routes, { prefix: '/v1' });
};

startServer();
