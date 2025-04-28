import FormSubmit from "@/components/form-submit";
import PostForm from "@/components/post-form";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(state, formData) {
    "use server";
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");

    await storePost({
      title,
      imageUrl:
        "https://watanimg.elwatannews.com/image_archive/original_lower_quality/13791576141688568769.jpg",
      content,
      userId: 2,
    });
    redirect(`/feed`);
  }
  return <PostForm action={createPost} />;
}
