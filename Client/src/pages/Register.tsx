import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../store/slices/userSlice";
import OAuth from "../components/OAuth";

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, data, loading, isAuthenticated } = useSelector(
    (state: any) => state.user
  );

  const [formData, setFormData] = useState({});

  console.log("data", data, loading, isAuthenticated);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log("formData", formData);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      console.log("formData", formData);
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.ok) {
        dispatch(loginSuccess(data));
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        throw Error(data.message);
      }
    } catch (error: any) {
      console.log("error", error);
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div className="text-center rounded-2xl max-w-[500px] m-auto border-black border-2 p-6">
      <h1 className="font-bold text-4xl ">New to this site ?</h1>
      <h3 className="text-xl text-gray-400 mb-4">Register Now</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-3 flex flex-col gap-1 text-left">
          <label htmlFor="username" className="font-semibold">
            Your Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="p-2 rounded-lg bg-white border border-gray-400"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 flex flex-col gap-1 text-left">
          <label htmlFor="email" className="font-semibold">
            Your Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            className="p-2 rounded-lg bg-white border border-gray-400"
          />
        </div>
        <div className="mt-3 flex flex-col gap-1 text-left">
          <label htmlFor="password" className="font-semibold">
            Your Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            className="p-2 rounded-lg bg-white border border-gray-400"
          />
        </div>
        {error && <p className="text-red-700 mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white p-2 mt-4 w-full rounded-sm"
        >
          Register
        </button>
      </form>

      <OAuth />
      <p className="text-gray-600 mt-3">
        Already Registered ? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
};

export default Register;
