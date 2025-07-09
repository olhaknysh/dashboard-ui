import { HttpStatus } from '../../shared';

export const ERROR_HTTP_STATUS_MESSAGES: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: 'Bad Request - Invalid data provided',
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized - Please log in again',
  [HttpStatus.FORBIDDEN]:
    "Forbidden - You don't have permission to access this resource",
  [HttpStatus.NOT_FOUND]: 'Not Found - The requested resource was not found',
  [HttpStatus.METHOD_NOT_ALLOWED]:
    'Method Not Allowed - This operation is not supported',
  [HttpStatus.CONFLICT]: 'Conflict - The request conflicts with current state',
  [HttpStatus.UNPROCESSABLE_ENTITY]:
    'Unprocessable Entity - The request data is invalid',
  [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests - Please try again later',
  [HttpStatus.INTERNAL_SERVER_ERROR]:
    'Internal Server Error - Something went wrong on the server',
  [HttpStatus.NOT_IMPLEMENTED]:
    'Not Implemented - This feature is not available',
  [HttpStatus.BAD_GATEWAY]: 'Bad Gateway - Server communication error',
  [HttpStatus.SERVICE_UNAVAILABLE]:
    'Service Unavailable - Server is temporarily unavailable',
  [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout - Request timed out',
};
