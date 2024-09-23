import { NextApiRequest, NextApiResponse } from 'next';

import { sendJsonResponse, handleApiError } from '../../utils/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Your API logic here
    const data = { message: 'API is working' };
    sendJsonResponse(res, 200, data);
  } catch (error) {
    handleApiError(res, error);
  }
}
