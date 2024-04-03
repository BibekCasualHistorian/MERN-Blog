import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const { data } = useSelector((state: any) => state.user);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUploadClick = () => {
    // Check if fileInputRef.current is defined before accessing its properties
    if (fileInputRef.current) {
      // Trigger click event on the file input
      (fileInputRef.current as HTMLInputElement).click();
    } else {
      console.error("File input reference is not available.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check for required fields
    if (!title || !category || !content || !image) {
      setError("All fields are required");
      setSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    // formData.append("category", category);
    formData.append("description", content);
    formData.append("image", image);
    formData.append("userId", data._id);

    console.log(formData);

    try {
      const response = await fetch(
        "http://localhost:3000/api/post/create-post",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const responseData = await response.json();

      console.log(response);
      console.log(responseData);

      if (response.ok) {
        navigate("/");

        // Handle success
        setSuccess(true);
        setError("");
        // Clear form fields
        setTitle("");
        setCategory("");
        setContent("");
        setImage(null);
        // Optionally, you can reset the success state after a delay
        setTimeout(() => setSuccess(false), 3000);
      } else {
        // Handle error from the server
        setError(responseData.message || "An error occurred");
        setSuccess(false);
      }
    } catch (error) {
      // Handle network error or any other unexpected error
      setError("An error occurred while creating the post");
      setSuccess(false);
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <form className="w-full text-center p-2" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-gray-800 font-semibold mb-4">
          Create Post
        </h1>
        <div className="flex flex-col gap-4 lg:flex-row mb-4">
          <input
            type="text"
            placeholder="Title"
            className="bg-gray-100 text-[20px] w-full border-gray-300 border-2 rounded-md p-1.5 text-gray-600"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <select
            className="bg-gray-100 lg:max-w-48 text-[20px] w-full border-gray-300 border-2 rounded-md p-1.5 text-gray-600"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="react">React</option>
            <option value="nextjs">Nextjs</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex mb-4 items-center gap-3 flex-col sm:flex-row justify-between border-dotted border-2 border-gray-500 p-2.5 mt-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <p
            className="text-gray-700 border cursor-pointer p-2 border-gray-400 rounded-lg hover:bg-blue-300"
            onClick={handleUploadClick}
          >
            Upload an Image
          </p>
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
          className="h-72"
        />
        <button
          type="submit"
          className="text-center w-full bg-gray-300 border-2 border-gray-200 rounded-lg p-2 mt-16 mb-4"
        >
          Publish
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">Post created successfully!</p>
        )}
        <div className="h-2 mb-24"></div>
      </form>
    </div>
  );
};

export default CreatePost;
