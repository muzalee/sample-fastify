/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply } from 'fastify';

interface SuccessResponseOptions {
  statusCode?: number;
  data?: any;
  meta?: any;
  message?: string;
}

export const sendSuccessResponse = (
  reply: FastifyReply,
  options: SuccessResponseOptions = {},
): void => {
  const { statusCode = 200, data, meta, message } = options;

  reply.status(statusCode).send({
    status: 'success',
    data,
    meta,
    message,
  });
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

interface ErrorResponseOptionsBase {
  statusCode?: number;
  error?: any;
  message?: string;
}

type ErrorResponseOptions = RequireAtLeastOne<
  ErrorResponseOptionsBase,
  'error' | 'message'
>;

const HTTP_STATUS_TEXTS: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

export const sendErrorResponse = (
  reply: FastifyReply,
  options: ErrorResponseOptions,
): void => {
  const {
    error,
    statusCode = error?.statusCode ?? options.statusCode ?? 500,
    message,
  } = options;

  const errorTitle = HTTP_STATUS_TEXTS[statusCode] || 'Unknown Error';

  let errorMessage;
  if (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error;
    }
  } else {
    errorMessage = message;
  }

  reply.status(statusCode).send({
    status: 'error',
    error: errorTitle,
    message: errorMessage,
  });
};
