import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    try {
      // Extract the authorization bearer token from the request headers
      const token = req.headers.authorization;

      // Check if the token is present
      if (!token) {
        return res.status(401).json({ error: 'Authorization header missing' });
      }

      // Extract data from the incoming request body
      const { msg } = req.body;
      const requestData = JSON.stringify({ msg }); // Assuming your API expects the message in this format

      // Make the POST request to the external API
      const apiUrl = 'https://api.thenextleg.io/v2/imagine'; // Replace with your actual external API URL
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: requestData,
      });

      // Check if the API request was successful
      if (apiResponse.ok) {
        const responseData = await apiResponse.json();
        const { messageId } = responseData;
        return res.status(200).json({"messageId":messageId});
      } else {
        const errorData = await apiResponse.text();
        console.error('External API Error:', errorData);
        return res
          .status(apiResponse.status)
          .json({ error: 'External API Error', rawError: errorData });
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
