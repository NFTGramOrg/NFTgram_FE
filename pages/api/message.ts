// pages/api/get-message-progress.ts
import { NextApiRequest, NextApiResponse } from 'next';

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Extract the authorization bearer token from the request headers
      const token = req.headers.authorization;

      // Check if the token is present
      if (!token) {
        return res.status(401).json({ error: 'Authorization header missing' });
      }

      // Extract message ID from the URL query parameters
      const { messageId } = req.body;
      console.log(messageId);
      // Make the GET request to the external API to check progress
      const apiUrl = `https://api.thenextleg.io/v2/message/${messageId}`;
      const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      // Check if the API request was successful
      if (apiResponse.ok) {
        const responseData = await apiResponse.json();

        // Check if progress is 100%
        if (responseData.progress === 100) {
          // Send the final response with image URLs
          return res.status(200).json(responseData.response);
        } else {
          console.log(responseData.progress);
          return res.status(200).json({ progress: responseData.progress });
        }
      } else {
        const errorData = await apiResponse.text();
        console.error('External API Error:', errorData);
        return res.status(apiResponse.status).json({ error: 'External API Error', rawError: errorData });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
