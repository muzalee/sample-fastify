import { FastifyInstance } from 'fastify';
import { sendSuccessResponse } from '@/helpers/response.helper';
import { postRoutes } from './post.route';

export async function v1Routes(fastify: FastifyInstance) {
  fastify.get('/', (_req, reply) => {
    sendSuccessResponse(reply, {
      statusCode: 200,
      message: 'Sample Fastify v1',
    });
  });

  fastify.register(postRoutes, { prefix: '/posts' });
}
