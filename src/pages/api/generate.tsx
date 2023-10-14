import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

type ResponseData={
    text: string;
}
interface GenereateNextApiRequest extends NextApiRequest{
    body:{
        prompt:string;
    };
}
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);

export default async function handler(
    req: GenereateNextApiRequest,
    res: NextApiResponse<ResponseData>
){
    const prompt = req.body.prompt;
    if(!prompt || prompt===""){
        return new Response("prompt is required" , {status:400});
    }
    const aiResult = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0.9,
        max_tokens: 100,
        frequency_penalty: 0.5,
        presence_penalty: 0
});
const response = aiResult.data.choices[0].text?.trim() || "error occoured";
res.status(200).json({text:response});
}
