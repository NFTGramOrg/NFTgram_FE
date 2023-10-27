import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
type ResponseData = {
  content: string;
  image_url: string;
};
interface GenereateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
    image:boolean;
    kind: number;
    sad: number;
    funny: number;
    angry: number;
    profile: string;
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
  const prmt = `Assume you are a person with the following characteristics: ${req.body.sad}% sad, ${req.body.kind}% kind, ${req.body.funny}% funny, ${req.body.angry}% angry. Do not use % in the generated content. Strictly no emojis in texts or hashtags. Only UTF-8 characters. Generate a tweet for this prompt "${req.body.prompt}" `;
  const prompt = prmt;
  if (!prompt || prompt === "") {
    return new Response("prompt is required", { status: 400 });
  }
  const aiResult = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 100,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  let img_url: string | undefined;
  let imagemood='';
  if(req.body.sad>req.body.funny && req.body.sad>req.body.kind && req.body.sad>req.body.angry){
    imagemood='sad';
  }
  else if(req.body.funny>req.body.sad && req.body.funny>req.body.kind && req.body.funny>req.body.angry){
    imagemood='funny';
  }
  else if(req.body.kind>req.body.sad && req.body.kind>req.body.funny && req.body.kind>req.body.angry){
    imagemood='kind';
  }
  else{
    imagemood='angry';
  }
  if(req.body.image){
    const imgresponse = await openai.createImage({
      prompt:`${req.body.prompt} and  ${req.body.profile} ,${imagemood},high quality,pokemon styled cartoon.`,
      n: 1,
      size: "512x512",
    });
    img_url = imgresponse.data.data[0].url || "Image unavailable";
  }
  const response = aiResult.data.choices[0].text?.trim() || "error occoured";
  res.status(200).json({ content: response,image_url:img_url ?? "" });
}
