import { useEffect, useState } from "react";
import RecentUsageMetrics from "./RecentUsageMetrics";
import TotalUsageMetrics from "./TotalUsageMetrics";

const DashboardHome = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseUsers = await fetch(
        "http://localhost:3000/api/user/get-users?limit=5",
        {
          credentials: "include",
        }
      );
      const responseComments = await fetch(
        "http://localhost:3000/api/comments/get-comment?limit=5",
        { credentials: "include" }
      );
      const responsePosts = await fetch(
        "http://localhost:3000/api/post/get-posts?limit=5",
        { credentials: "include" }
      );
      const dataUsers = await responseUsers.json();
      const dataComments = await responseComments.json();
      const dataPosts = await responsePosts.json();
      if (responseUsers.ok) {
        setUsers(dataUsers.data);
      }
      if (responseComments.ok) {
        setComments(dataComments.data);
      }
      if (responsePosts.ok) {
        setPosts(dataPosts.data);
      }
    };
    fetchData();
  }, []);
  console.log("datum", users, comments, posts);
  return (
    <div>
      <TotalUsageMetrics users={users} comments={comments} posts={posts} />
      <RecentUsageMetrics
        users={users?.users || []}
        comments={comments?.comments || []}
        posts={posts?.posts || []}
      />
    </div>
  );
};

export default DashboardHome;
