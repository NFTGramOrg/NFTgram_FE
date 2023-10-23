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
    prompt:`create an image based on : ${req.body.prompt}`,
    n: 1,
    size: "512x512",
  });
  const image_url = imgresponse.data.data[0].url || "Image unavailable";
  res.status(200).json({image_url: image_url });
}