import { FastifyRequest, FastifyReply } from 'fastify';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '@/helpers/response.helper';
import { PostService } from '@/services/post.service';
import { PostQueryParams } from '@/definitions/post.definition';

export class PostController {
  private readonly service: PostService;

  constructor() {
    this.service = new PostService();
  }

  async getPosts(
    request: FastifyRequest<{ Querystring: PostQueryParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const result = await this.service.getPosts(request.query);

      sendSuccessResponse(reply, {
        data: result.data,
        meta: {
          total: result.total,
          page: result.page,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        },
        message: 'Post list retrieved successfully',
      });
    } catch (error) {
      sendErrorResponse(reply, {
        message:
          error instanceof Error ? error.message : 'Error retrieving post list',
      });
    }
  }
}
