import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { createClient } from "@supabase/supabase-js";
interface GenereateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
    image: boolean;
    nft:string;
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
  res: NextApiResponse
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
  let imagemood = "";
  if (
    req.body.sad > req.body.funny &&
    req.body.sad > req.body.kind &&
    req.body.sad > req.body.angry
  ) {
    imagemood = "sad";
  } else if (
    req.body.funny > req.body.sad &&
    req.body.funny > req.body.kind &&
    req.body.funny > req.body.angry
  ) {
    imagemood = "funny";
  } else if (
    req.body.kind > req.body.sad &&
    req.body.kind > req.body.funny &&
    req.body.kind > req.body.angry
  ) {
    imagemood = "kind";
  } else {
    imagemood = "angry";
  }
  if (req.body.image) {
    try{
    const apiUrl = 'https://api.thenextleg.io/v2/imagine'; // Replace with your actual external API URL
    const imageprmt =`${req.body.nft} ${req.body.prompt} ${req.body.profile} ${req.body.prompt} cartoony 4k --iw .2`;
    // const imageprmt =`${req.body.nft} the character is ${req.body.prompt},${req.body.prompt}, mood of the image is ${imagemood},cartoony,4k,no text`;
    console.log("image prompt", imageprmt);
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MIDJOURNEY_KEY}`,
      },
      body: JSON.stringify({ "msg":imageprmt }),
    });
    if (apiResponse.ok) {
      const responseData = await apiResponse.json();
      const { messageId } = responseData;
      const response = aiResult.data.choices[0].text?.trim() || "error occoured";
      res.status(200).json({ content: response, messageId: messageId});
    } else {
      const errorData = await apiResponse.text();
      console.error('External API Error:', errorData);
      res.status(apiResponse.status).json({ error: 'External API Error', rawError: errorData });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  }
}

