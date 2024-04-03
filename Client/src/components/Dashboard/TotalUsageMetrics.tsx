import { useEffect, useState } from "react";
import { FaComments, FaNewspaper, FaUser } from "react-icons/fa";

const TotalUsageMetrics = ({ users, posts, comments }) => {
  return (
    <div className="grid gap-4 p-2 lg:grid-cols-3">
      <div className="flex justify-between shadow-xl shadow-slate-300 rounded-md p-3">
        <div>
          <h1 className="text-2xl">Total Users</h1>
          <p className="text-3xl mt-1">{users.totalUsers || "NA"}</p>
          <p className="mt-6 text-sm">
            ⬆️ {users.lastMonthsUsers || "NA"} last months
          </p>
        </div>
        <div className="bg-green-600 p-5 border-none rounded-full self-start">
          <FaUser className="bg-green-600 text-2xl" />
        </div>
      </div>
      <div className="flex justify-between shadow-xl shadow-slate-300  rounded-md p-3">
        <div>
          <h1 className="text-2xl">Total Comments</h1>
          <p className="text-3xl mt-1">{comments.totalComments || "NA"}</p>
          <p className="mt-6 text-sm">
            ⬆️ {comments.lastMonthsComments || "NA"} last months
          </p>
        </div>
        <div className="bg-blue-600 p-5 border-none rounded-full self-start">
          <FaComments className="bg-blue-600 text-2xl" />
        </div>
      </div>
      <div className="flex justify-between shadow-xl shadow-slate-300  rounded-md p-3">
        <div>
          <h1 className="text-2xl">Total Posts</h1>
          <p className="text-3xl mt-1">{posts.totalPosts || "NA"}</p>
          <p className="mt-6 text-sm">
            ⬆️ {posts.lastMonthsPosts || "NA"} last months
          </p>
        </div>
        <div className=" bg-lime-600 p-5 border-none rounded-full self-start">
          <FaNewspaper className="bg-lime-400 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default TotalUsageMetrics;
