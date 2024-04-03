import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoData from "./NoData";

const EachHeader = ({ title, url }) => {
  return (
    <div className=" px-4 py-1 flex items-center font-bold justify-between border">
      <h1 className="basis-2/3">Recent {title || "Unavailble"}</h1>
      <Link
        to={url}
        className=" text-nowrap border-2 border-black p-1.5 px-6 rounded-xl"
      >
        See All
      </Link>
    </div>
  );
};

const RecentUsageMetrics = ({ users, comments, posts }) => {
  console.log("users", users, comments, posts);
  const RecentUsers = () => {
    return (
      <div className=" p-2">
        <EachHeader title="Users" url={"/dashboard/users"} />
        <div className="text-center">
          <div className=" flex justify-between uppercase font-bold p-3 bg-gray-200">
            <h1 className="basis-1/3  text-center">User Image</h1>
            <h1 className="basis-2/3  text-center">Username</h1>
          </div>
          <div className="mt-2">
            {users.length > 0 ? (
              users.map((user: any) => {
                const img = `data:image/png;base64,${user.imageBase64}`;
                return (
                  <div
                    className="flex items-center justify-between border p-1.5"
                    key={Math.random()}
                  >
                    <div className="basis-1/3 border-2">
                      <img
                        src={"/random.jpg"}
                        alt="user"
                        className="w-12 rounded-full h-12 mx-auto object-cover"
                      />
                    </div>
                    <h1 className="basis-2/3">{user.username}</h1>
                  </div>
                );
              })
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    );
  };
  const RecentComments = () => {
    return (
      <div className=" p-2">
        <EachHeader title="Comments" url={"/dashboard/comments"} />
        <div>
          <div className=" flex justify-between uppercase font-bold p-3 bg-gray-200">
            <h1 className="basis-2/3  text-center">Comments Content</h1>
            <h1 className="basis-1/3  text-center">Likes</h1>
          </div>
          <div className="mt-2 text-center">
            {comments.length > 0 ? (
              comments.map((comment: any) => {
                return (
                  <div
                    className="text-center flex items-center justify-between border p-1.5"
                    key={Math.random()}
                  >
                    <h1 className="basis-2/3">{comment.comment}</h1>
                    <h1 className="basis-1/3">{comment.noOfLikes}</h1>
                  </div>
                );
              })
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    );
  };
  const RecentPosts = () => {
    return (
      <div className=" p-2">
        <EachHeader title="Posts" url={"/dashboard/posts"} />
        <div className="text-center">
          <div className=" grid grid-cols-5 items-center uppercase rounded-sm font-bold p-3 bg-gray-200">
            <h1 className="">Post Image</h1>
            <h1 className=" col-span-3 ">Post Title</h1>
            <h1 className=" ">Category</h1>
          </div>
          <div className="mt-2">
            {posts.length > 0 ? (
              posts.map((post: any) => {
                // console.log("post", post);
                const img = `data:image/png;base64,${post.imageBase64}`;
                return (
                  <div
                    className="grid grid-cols-5 items-center justify-between border p-1.5"
                    key={Math.random()}
                  >
                    <div className="basis-2/5 border-2">
                      <img
                        src={"/random.jpg"}
                        alt="post"
                        className="w-12 rounded-full h-12 mx-auto object-cover"
                      />
                    </div>
                    <h1 className="col-span-3">
                      {post.title || "Unavailabe Title"}
                    </h1>
                    <h1 className="basis-3/5">
                      {post.category || "Unavailable"}
                    </h1>
                  </div>
                );
              })
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-6 p-1 grid md:grid-cols-6">
      <div className="md:col-span-3">
        <RecentUsers />
      </div>
      <div className="md:col-span-3">
        <RecentComments />
      </div>
      <div className="md:row-start-2 md:col-start-2 md:col-span-4">
        <RecentPosts />
      </div>
    </div>
  );
};

export default RecentUsageMetrics;
