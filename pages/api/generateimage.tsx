import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
  image_url: string;
};
interface GenereateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
    kind: number;
    sad: number;
    funny: number;
    angry: number;
  };
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function handler(
    req: GenereateNextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
const imgresponse = await openai.createImage({
    prompt:`create an image for the following tweet with the body(Donot have any text in the image,just make it relevent to the tweet and charachterstics) : ${req.body.prompt}.These are your characherstics: ${req.body.sad}% sad, ${req.body.kind}% kind, ${req.body.funny}% funny, ${req.body.angry}% angry.Which picture would you post along with this tweet? `,
    n: 1,
    size: "512x512",
  });
  const image_url = imgresponse.data.data[0].url || "Image unavailable";
  res.status(200).json({image_url: image_url });
}
