"use server";
import { storePost } from "@/lib/posts";
import { redirect } from "next/dist/server/api-utils";

export async function createPost(state, formData) {
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

  await storePost({
    title,
    imageUrl:
      "https://watanimg.elwatannews.com/image_archive/original_lower_quality/13791576141688568769.jpg",
    content,
    userId: 2,
  });
  //   redirect(`/feed`);
}
