import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcgn707fg",
  api_key: "447553432962878",
  api_secret: "B392SZv18oPqrYoIviTDVaHEjq4",
});

async function Home() {
  async function create(formData: FormData) {
    "use server";
    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(file);

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

    // revalidatePath("/");
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add a New Image</h2>
      <form
        action={create}
        className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6"
      >
        <p className="mb-6">
          <label htmlFor="image" className="block font-semibold text-sm mb-2">
            Select an Image to Upload
          </label>
          <input
            id="image"
            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="file"
            name="image"
            required
          />
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
