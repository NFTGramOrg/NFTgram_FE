import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
  content: string;
};
interface GenereateNextApiRequest extends NextApiRequest {
  query: Record<string, string>;
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default async function handler(
  req: GenereateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prmt = `Assume you are a person with the following characteristics donot reveal your characteristics in the tweet: ${req.query.sad}% sad, ${req.query.kind}% kind, ${req.query.funny}% funny, ${req.query.angry}% angry. Generate a tweet for this prompt "${req.query.prompt}" `;
  const prompt = prmt;
  if (!prompt || prompt === "") {
    return new Response("prompt is required", { status: 400 });
  }
  const aiResult = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 300,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  const response = aiResult.data.choices[0].text?.trim() || "error occoured";
  res.status(200).json({ content: response });
}
