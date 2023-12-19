import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { createClient } from "@supabase/supabase-js";
const uploadImageToBucket = async (url: string) => {
    const dnow = Date.now();
    const supabase = SUPABASE_URL
      ? createClient(SUPABASE_URL, SUPABASE_KEY)
      : null;
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const { data, error } = supabase
      ? await supabase.storage.from("images").upload(`${dnow}.png`, blob, {
          contentType: "image/png",
        })
      : { data: null, error: new Error("supabase not initialized") };
  
      if (error) {
        throw new Error(error.message);
      }
    if (data.path != undefined) return data.path;
    else return "no image";
  };

export default uploadImageToBucket;