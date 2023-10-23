import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";

type ResponseData = {
  content: string;
};
interface GenereateNextApiRequest extends NextApiRequest {
  query: {
    prompt: string;
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
  const supabase = SUPABASE_URL
    ? createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;
  const { prompt } = req.query;
  console.log(prompt);

  const { data, error } = supabase
    ? await supabase.from("tweets").select("*").eq("prompt", prompt)
    : { data: null, error: new Error("supabase not initialized") };

  if (data) {
    console.log("Found in db");
    const account = data[0];
    res.status(200).json({ content: account.gen });
  } else {
    res.status(200).json({ content: "No content" });
  }
}
