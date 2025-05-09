"use server";
import { uploadImage } from "@/lib/cloudinaryConfig";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  let errors = [];

  if (!title || title.trim().length == 0) {
    errors.push("Title is required field");
  }
  if (!content || content.trim().length == 0) {
    errors.push("Content is required field");
  }
  if (!image || image.size == 0) {
    errors.push("Image is required field");
  }
  if (errors.length > 0) {
    return {
      errors,
    };
  }
  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  await storePost({
    title,
    imageUrl,
    content,
    userId: 1,
  });
  revalidatePath("/", "layout");
  redirect(`/feed`);
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
