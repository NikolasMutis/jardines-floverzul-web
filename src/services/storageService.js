import { supabase } from "../config/supabaseClient";

const BUCKET_NAME = "imagenes";

export const uploadImage = async (file, folder = "general") => {
  if (!file) {
    return null;
  }

  const fileExtension = file.name?.split(".").pop() || "jpg";
  const filePath = `${folder}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Error subiendo imagen a Supabase Storage:", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
};
