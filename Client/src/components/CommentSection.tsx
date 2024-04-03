import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EachComment from "./EachComment";

const CommentSection = (postId: any) => {
  const { data } = useSelector((state: any) => {
    return state.user;
  });

  const [comment, setComment] = useState("");

  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      const response = await fetch(
        `http://localhost:3000/api/comments/get-comment?postId=${postId.postId}`
      );
      const data = await response.json();
      console.log(response, data);
      if (response.ok) {
        setAllComments(data.data);
      } else {
        console.log("error");
      }
    };
    fetchComment();
  }, [postId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/comments/create-comment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment,
            postId: postId.postId,
            userId: data._id,
          }),
          credentials: "include",
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setAllComments([...allComments, responseData.data]);
        setComment("");
      } else {
        throw Error(responseData.message || responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUpdate = async (commentId: any, comment: any) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/comments/update-comment?commentId=" +
          commentId +
          "&userId=" +
          data._id,

        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.ok) {
        console.log(responseData);
        const updatedComments = allComments.map((each) => {
          if (each._id === commentId) {
            return responseData.data;
          } else {
            return each;
          }
        });
        setAllComments(updatedComments);
      } else {
        // console.log(responseData.data);
      }
    } catch (error) {}
  };

  const handleLikeAndDisLikes = async (reaction: any, commentId: any) => {
    console.log("reaction", reaction);
    const action = {
      reaction: reaction ? "like" : "dislike",
      userId: data._id,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/comments/update-like-dislikes?commentId=" +
          commentId,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );
      const responseData = await response.json();
      console.log(response, responseData);
      if (response.ok) {
        const updatedComments = allComments.map((each) => {
          if (each._id === commentId) {
            return responseData.data;
          } else {
            return each;
          }
        });
        setAllComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDelete = async (commentId: any) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/comments/delete-comment?commentId=" +
          commentId,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: data._id }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        const updatedComments = allComments.filter(
          (each) => each._id !== commentId
        );
        setAllComments(updatedComments);
      }
    } catch (error) {}
  };

  console.log("allComments", allComments);

  return (
    <div className="max-w-[700px] mx-auto">
      <h1>Comment Sections</h1>
      <div>
        <span>Signed in as: </span>
        {/* <img src={} alt="" /> */}
        <span>
          @ <span>{data.username}</span>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name=""
          id=""
          cols={30}
          rows={8}
          minLength={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-2 border-gray-300"
        ></textarea>
        <div>
          <p>{200 - comment.length} character remaining</p>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        {allComments.map((each) => {
          // const [edit, setEdit] = useState(false);
          return (
            <EachComment
              key={Math.random()}
              data={data}
              each={each}
              handleEditUpdate={handleEditUpdate}
              handleLikeAndDisLikes={handleLikeAndDisLikes}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
