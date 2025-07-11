import { FastifyInstance } from 'fastify';
import { PostController } from '@/controllers/post.controller';

const GetPostsSchema = {
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string' },
      sortBy: {
        type: 'string',
        enum: ['id', 'title', 'views', 'likes'],
        default: 'id',
      },
      sortOrder: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
      },
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
      },
      pageSize: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 20,
      },
    },
  },
};

export async function postRoutes(fastify: FastifyInstance) {
  const controller = new PostController();

  fastify.get(
    '/',
    {
      schema: GetPostsSchema,
    },
    controller.getPosts.bind(controller),
  );
}
