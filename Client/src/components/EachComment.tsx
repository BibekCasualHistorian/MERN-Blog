import { useState } from "react";

const EachComment = ({
  data,
  each,
  handleEditUpdate,
  handleLikeAndDisLikes,
  handleDelete,
}) => {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(each.comment);

  const handleSubmit = () => {
    handleEditUpdate(each._id, comment);
    setEdit(false);
  };
  return (
    <div className="border mx-500" key={Math.random()}>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h1>@ {each.userId.username}</h1>
          <p>{}</p>
        </div>
        <input
          min={2}
          type="text"
          name=""
          id=""
          value={comment}
          readOnly={!edit}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-3">
          <span onClick={() => handleLikeAndDisLikes(true, each._id)}>
            Like {each.noOfLikes}
          </span>
          <span onClick={() => handleLikeAndDisLikes(false, each._id)}>
            dislike {each.noOfDislikes}
          </span>
          {data._id == each.userId._id && (
            <>
              {!edit && (
                <span className="" onClick={() => setEdit(true)}>
                  Edit
                </span>
              )}
              {edit && <button onClick={() => handleSubmit()}>Save</button>}
              <span onClick={() => handleDelete(each._id)}>Delete</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EachComment;
