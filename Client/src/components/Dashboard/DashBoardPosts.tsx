import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const headings = [
  "Data Updated",
  "Image",
  "Title",
  "Category",
  "Delete",
  "Edit",
];

const DashBoardPosts = () => {
  const { data: userData } = useSelector((state: any) => {
    console.log(state);
    return state.user;
  });
  console.log("userData", userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/post/get-posts?userId=${userData._id}`
      );
      const data = await response.json();
      console.log("dashboard posts", response, data);
      if (response.ok) {
        setPosts(data.data.posts);
      } else {
        console.log("error");
      }
    };
    fetchData();
  }, [userData]);

  console.log("posts", posts);

  return (
    <div className="text-center bg-gray-300 min-h-[80%]">
      <section className="grid grid-cols-6 bg-gray-400 mb-3">
        {headings.map((heading) => (
          <h1 className="font-bold p-4" key={heading}>
            {heading}
          </h1>
        ))}
      </section>
      <section>
        {posts.map((post) => {
          console.log("post", post);
          const baseImage = `data:image/jpeg;base64,${post.imageBase64}`;
          console.log(baseImage);
          return (
            <Link
              to={`/post/${post._id}`}
              className="grid grid-cols-6"
              key={Math.random()}
            >
              <h2>{post.updatedAt.toString().substr(0, 10)}</h2>
              <img
                className="object-cover bg-black"
                src={baseImage}
                alt="man"
              />
              <h2>{post.title || "Unavailabe title"}</h2>
              <h2>{post.category || "uncategorized"}</h2>
              <p className="text-red-500">Delete</p>
              <p className="text-green-500">Edit</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default DashBoardPosts;
