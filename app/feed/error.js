"use client";

export default function FeedError({ error }) {
  return (
    <>
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </>
  );
}
