import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../../store/slices/userSlice";

const DashboardProfile = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  console.log(photo);

  const handleDelete = async () => {
    setError("");
    const response = await fetch(
      "http://localhost:3000/api/user/delete-profile/" + data._id,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      localStorage.removeItem("user");
      dispatch(logout());
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  const handleImageClick = () => {
    // Trigger click on the file input when the image is clicked
    document.getElementById("fileInput")?.click();
  };

  const handleInputChange = (e: any, field: String) => {
    const value = e.target.value;

    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      // Add more cases for other fields as needed
      default:
        break;
    }
  };

  const handleFileChange = (event: any) => {
    // Handle file change here
    const photo = event.target.files[0];

    if (photo) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Set the data URL as the source for the photo state
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(photo);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Clear previous errors
    setError("");

    // Validate input fields
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      // Reset the username to its initial value or data.username
      setUsername(data.username);
      return;
    }

    if (password.length > 0 && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      // Reset the password to an empty string or its initial value
      setPassword("");
      return;
    }

    // Email validation using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      // Reset the email to its initial value or data.email
      setEmail(data.email);
      return;
    }

    const formData = new FormData();

    // Append only if the username has changed
    if (username != data.username) {
      formData.append("username", username);
    }

    // Append only if the email has changed
    if (email != data.email) {
      formData.append("email", email);
    }

    // Append only if the password has changed
    if (password != data.password) {
      formData.append("password", password);
    }

    // Append only if the profile image has changed
    // if (selectedImage instanceof Blob) {
    //   formData.append("profileImage", selectedImage, "profileImage.jpg");
    // }
    if (photo != null && photo !== data.photo) {
      formData.append("photo", photo);
    }

    // Submit the formData to the backend using a patch request
    // Replace the placeholder URL with your actual backend endpoint
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/update-profile/" + data._id,
        {
          method: "PATCH",
          body: formData,
          // headers: {
          //   "Content-Type": `multipart/form-data; boundary=${formData.get}`,
          // },
        }
      );
      const responseData = await response.json();
      console.log(response);
      console.log(responseData);
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(responseData.data));
        dispatch(loginSuccess(responseData.data));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating the profile.");
    }
  };

  const handleImageError = () => {
    // Reset photo to its previous value (data.photo)
    setPhoto(data.photo);
  };

  const handleLogout = async () => {
    console.log("handleLogout");
    const response = await fetch(
      "http://localhost:3000/api/user/logout/" + data._id,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      localStorage.removeItem("user");
      dispatch(logout());
      navigate("/");
    } else {
      setError(responseData.message);
    }
  };

  return (
    <div className="col-span-4 p-2 ">
      <form
        onSubmit={handleSubmit}
        className=" relative flex flex-col gap-5 py-2 items-center max-w-[500px] mx-auto "
      >
        <h1 className="font-semibold text-4xl">Profile</h1>
        <img
          src={photo || data.photo}
          alt=""
          className="rounded-full border-red-500 border-8 w-[140px] object-contain h-[140px]"
          onClick={handleImageClick}
        />

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          onError={handleImageError}
        />

        <input
          type="text"
          value={username}
          onChange={(e) => handleInputChange(e, "username")}
          className="p-2 text-gray-700 w-full font-semibold min-w-[60%] hover:outline-none outline-none border border-gray-700 rounded-lg"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => handleInputChange(e, "email")}
          className="p-2 text-gray-700 w-full font-semibold min-w-[60%] hover:outline-none outline-none border border-gray-700 rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handleInputChange(e, "password")}
          placeholder="**********"
          className="bg-gray-100 w-full text-black p-2 font-semibold  min-w-[60%] hover:outline-none outline-none border border-gray-700 rounded-lg"
        />
        <button
          className=" bg-gray-100 text-black w-full p-2 font-bold rounded-[8px] transition-colors hover:bg-black hover:text-white border border-gray-400"
          style={{ transition: "all 0.2s" }}
        >
          Update
        </button>

        {error && (
          <div className="text-red-700 border ">
            <p>{error}</p>
          </div>
        )}

        {data.isAdmin && (
          <NavLink
            to="/create-post"
            className=" bg-gray-100 text-center text-black w-full p-2 font-bold rounded-[8px] transition-colors hover:bg-black hover:text-white border border-gray-400"
          >
            Create Post
          </NavLink>
        )}

        <div className="  text-red-700 flex w-full justify-between  font-semibold">
          <p className="cursor-pointer" onClick={handleDelete}>
            Delete Account
          </p>
          <p className="cursor-pointer" onClick={handleLogout}>
            Sign Out
          </p>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
