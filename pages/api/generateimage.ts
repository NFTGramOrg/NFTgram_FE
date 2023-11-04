import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { createClient } from "@supabase/supabase-js";
type ResponseData = {
  image_url: string;
  i_url: string;
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

export default async function handler(
    req: GenereateNextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
const imgresponse = await openai.createImage({
    prompt:`${req.body.prompt} and  ${req.body.profile} ,sad,high quality,pokemon styled cartoon.`,
    n: 1,
    size: "512x512",
  });
  const dnow =Date.now();
  const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
    const uploadImageToBucket = async (url:string) => {
        const response = await fetch(url, { mode: 'cors' });
        const blob = await response.blob();
        const { data, error } = supabase
          ? await supabase.storage
          .from('images')
          .upload(`${dnow}.png`, blob, {
          contentType: 'image/png',
          }): { data: null, error: new Error("supabase not initialized") };
      
        if (error) {
          throw new Error(error.message);
        }
        if(data.path!=undefined)
        return data.path;
        else return "no image";
    };
  const image_url = imgresponse.data.data[0].url || "Image unavailable";
  const path = uploadImageToBucket(image_url);
    const publicUrl ="https://deegrjwtmqprtizddphp.supabase.co/storage/v1/object/public/images/"+dnow+".png"
     res.status(200).json({image_url: image_url,i_url:publicUrl});
}