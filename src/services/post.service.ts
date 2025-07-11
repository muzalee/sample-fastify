import { BASE_CONSTANTS } from '@/constants';
import { Logger } from '@/utils/logger.util';
import { PaginatedResult } from '@/definitions/base.definition';
import { Post, PostQueryParams } from '@/definitions/post.definition';
import sampleData from '@/data/sample.json';

export class PostService {
  private readonly logger = Logger.forContext(PostService.name);
  private readonly posts: Post[] = sampleData as Post[];

  async getPosts(params: PostQueryParams): Promise<PaginatedResult<Post>> {
    try {
      const {
        search,
        sortBy = 'id',
        sortOrder = 'desc',
        page = 1,
        pageSize = BASE_CONSTANTS.DEFAULT_PAGE_SIZE,
      } = params;

      // Filter posts based on search criteria
      let filteredPosts = this.posts.filter(
        (post) => post.id && post.title && post.body,
      );

      if (search) {
        const searchLower = search.toLowerCase();
        filteredPosts = filteredPosts.filter(
          (post) =>
            post.title?.toLowerCase().includes(searchLower) ||
            post.body?.toLowerCase().includes(searchLower) ||
            post.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
        );
      }

      // Sort posts
      const validSortFields = ['id', 'title', 'views', 'likes'];
      const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';

      filteredPosts.sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;

        if (sortField === 'likes') {
          aValue = a.reactions?.likes || 0;
          bValue = b.reactions?.likes || 0;
        } else if (sortField === 'views') {
          aValue = a.views || 0;
          bValue = b.views || 0;
        } else if (sortField === 'title') {
          aValue = a.title || '';
          bValue = b.title || '';
        } else {
          aValue = a.id || 0;
          bValue = b.id || 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortOrder === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });

      // Calculate pagination
      const total = filteredPosts.length;
      const skip = (page - 1) * pageSize;
      const paginatedPosts = filteredPosts.slice(skip, skip + pageSize);

      // Calculate max station size (equivalent to max tags count for posts)
      const maxStationSize = Math.max(
        ...this.posts.map((post) => post.tags?.length || 0),
      );

      // Format items
      const formattedItems = paginatedPosts.map((post) => ({
        ...post,
        id: post.id,
      }));

      return {
        data: formattedItems,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        maxStationSize,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fetch posts: ${errorMessage}`);
      throw Error(`Failed to fetch posts: ${errorMessage}`);
    }
  }
}
