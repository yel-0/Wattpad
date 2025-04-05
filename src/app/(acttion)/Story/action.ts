"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcgn707fg",
  api_key: "447553432962878",
  api_secret: "B392SZv18oPqrYoIviTDVaHEjq4",
});
export async function CreateStory(formData: FormData) {
  try {
    // Extract form data from FormData object
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const language = formData.get("language") as string;
    const copyright = formData.get("copyright") as string;
    const visibility = formData.get("visibility") as string;

    // Handle the file (coverImage)
    const coverImage = formData.get("coverImage") as File;
    if (coverImage) {
      console.log("Cover Image:", coverImage);
      // Optionally handle file upload (e.g., save it to a server or cloud storage)
    }

    console.log(formData);

    const arrayBuffer = await coverImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         tags: ["nextjs-server-actions-upload-sneakers"],
    //         upload_preset: "nextjs-server-actions-upload",
    //       },
    //       function (error, result) {
    //         if (error) {
    //           reject(error);
    //           return;
    //         }
    //         resolve(result);
    //       }
    //     )
    //     .end(buffer);
    // });
  } catch (error) {
    console.error("Error creating story:", error);
  }
}
