// pages/api/generate-post-request.ts

import { NextApiRequest, NextApiResponse } from 'next';

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
        try {
          const responseData = await apiResponse.json();

          // Check if the response indicates success
          if (responseData.success) {
            const { messageId } = responseData;

            // Start the polling loop to check progress with a 2-minute timeout
            await pollProgress(messageId, token, 120000, res); // Pass res as an argument

            // Respond with success
            return res.status(200).json({ success: true });
          } else {
            return res.status(400).json({ error: 'API request was not successful' });
          }
        } catch (jsonError) {
          // Log the error and return an appropriate response
          console.error('Error parsing JSON from response:', jsonError);
          return res.status(500).json({ error: 'Error parsing JSON from response' });
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

async function pollProgress(messageId: string, token: string, timeout: number, res: NextApiResponse): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    // Make the GET request to check progress
    const progressApiUrl = `https://api.thenextleg.io/v2/message/${messageId}`;
    const progressApiResponse = await fetch(progressApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    // Check if the API request was successful
    if (progressApiResponse.ok) {
      const progressData = await progressApiResponse.json();

      // Check if progress is 100%
      if (progressData.progress === 100) {
        // Send the final response with image URLs
        return res.status(200).json(progressData.response);
      }
      else{
        console.log(progressData.progress);
      }
    } else {
      const errorData = await progressApiResponse.text();
      console.error('External API Error:', errorData);

      // You might want to handle errors here and return an appropriate response
      return res.status(progressApiResponse.status).json({ error: 'External API Error', rawError: errorData });
    }

    // Wait for a specified interval before making the next request (e.g., 5 seconds)
    await delay(5000); // Adjust the interval as needed
  }

  // If the timeout is reached, respond with an appropriate message
  return res.status(500).json({ error: 'Timeout: Progress not reached 100% within 2 minutes' });
}
