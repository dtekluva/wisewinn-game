/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from 'next';

export function sendJsonResponse(res: NextApiResponse, statusCode: number, data: any) {
  res.status(statusCode).json(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleApiError(res: NextApiResponse, error: any) {
  console.error('API Error:', error);
  sendJsonResponse(res, 500, {
    error: 'Internal Server Error',
    message: error.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
}
