import FormSubmit from "@/components/form-submit";
import PostForm from "@/components/post-form";
import { redirect } from "next/navigation";
import { createPost } from "@/actions/posts";

export default function NewPostPage() {
  return <PostForm action={createPost} />;
}
