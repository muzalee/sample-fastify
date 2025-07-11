/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginatedResult<T> {
  data: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  [key: string]: any;
}
