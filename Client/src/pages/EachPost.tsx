import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const EachPost = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/post/get-posts?postId=${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setPost(data.data.newPosts[0]);
          setLoading(false);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  console.log("post", post);

  return (
    <div className="mt-8 text-center">
      <h1 className="text-balance text-5xl font-semibold">{post.title}</h1>
      <Link
        to={``}
        className="mt-7 block w-fit mx-auto border-2 rounded-3xl font-semibold py-1 px-6 hover:bg-slate-200 hover:text-black"
      >
        {post.category}
      </Link>
      <img src={`data:image/jpg;base64,${post.imageBase64}`} alt="" />
      <p
        className="text-gray-600 text-xl mt-4 max-w-[700px] mx-auto"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
      <CommentSection postId={post._id} />
    </div>
  );
};

export default EachPost;
