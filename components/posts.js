"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";
import { useOptimistic } from "react";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              {/* <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time> */}
            </p>
          </div>
          <div>
            <form
              className={post.isLiked ? "liked" : ""}
              action={action.bind(null, post.id)}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, selectedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === selectedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const newPost = { ...prevPosts[updatedPostIndex] };
      newPost.likes = newPost.likes + (newPost.isLiked ? -1 : 1);
      newPost.isLiked = !newPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = newPost;
      return newPosts;
    }
  );

  function updatePost(postId) {
    updateOptimisticPosts(postId);
    togglePostLikeStatus(postId);
  }

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }
  console.log(optimisticPosts);

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
