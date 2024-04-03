import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const headings = [
  "Data Created",
  "Comment Content",
  "No of Likes",
  "PostId",
  "UserId",
  "Delete",
];

const DashBoardComments = () => {
  const { data: userData } = useSelector((state: any) => {
    console.log(state);
    return state.user;
  });
  console.log("userData", userData);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/comments/get-comment`
      );
      const data = await response.json();
      console.log("dashboard comments", response, data);
      if (response.ok) {
        setComments(data.data.comments);
      } else {
        console.log("error");
      }
    };
    fetchData();
  }, [userData]);

  const handleDelete = async (commentId: any) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/comments/delete-comment?commentId=" +
          commentId,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({ userId: data._id }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setComments((prevState) => {
          return prevState.filter((comment) => comment._id !== commentId);
        });
      }
    } catch (error) {}
  };

  console.log("comments", comments);

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
        {comments.map((comment) => {
          return (
            <div className="grid grid-cols-6" key={Math.random()}>
              <h2>{comment.updatedAt.toString().substr(0, 10)}</h2>
              <h2>{comment.comment}</h2>
              <h2>{comment.noOfLikes || "unknown"}</h2>
              <h2>{comment.postId || "unknown"}</h2>
              <p className="">{comment?.userId?._id || "unknown"}</p>
              <p
                className="text-red-500"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashBoardComments;
