import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import fs from 'fs';
import axios from "axios";
import { Readable } from "stream";
type ResponseData = {
  image_url: string;
};
interface GenereateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
    profile: string;
  };
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



// Function to fetch the image and create a file blob
// async function createFileFromURL(url:string) {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });

//     if (response.status === 200) {
//       const data = Buffer.from(response.data);
//       return data; 
//       // const stream = Readable.from(data);
//       // // Create a Blob object with the image data
//       // const blob = new Blob([stream], { type: 'image/png' });

//       // // Manually create a File-like object
//       // const file = {
//       //   name: 'image.png',
//       //   type: 'image/png',
//       //   webkitRelativePath: 'images/image.png',
//       //   size: blob.size,
//       //   lastModified: Date.now(), // You can set this to the desired timestamp
//       //   arrayBuffer: () => blob.arrayBuffer(),
//       //   stream: () => blob.stream(),
//       //   text: () => blob.text(),
//       //   slice: (start: number | undefined, end: number | undefined) => blob.slice(start, end),
//       // };
//       // return file;
//     } else {
//       console.error('Failed to fetch the image.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

export default async function handler(
    req: GenereateNextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
const imgresponse = await openai.createImage({
    prompt:`${req.body.prompt} and  ${req.body.profile} ,sad,high quality,pokemon styled cartoon.`,
    n: 1,
    size: "512x512",
  });
  const image_url = imgresponse.data.data[0].url || "Image unavailable";
  res.status(200).json({image_url: image_url });
}