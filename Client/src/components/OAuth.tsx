import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const OAuth = () => {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      signInWithPopup(auth, provider).then(async (result: any) => {
        console.log("result", result);
        const { displayName, email, photoURL } = result.user;
        const response = await fetch("http://localhost:3000/api/user/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName, email, photoURL }),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(loginSuccess(data.data));
          localStorage.add("user", JSON.stringify(data.data));
          console.log("data", data);
          navigate("/");
        } else {
          throw Error(data.message);
        }
      });
    } catch (error: any) {
      console.log("error", error);
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="flex gap-3 justify-center items-center mt-4 bg-black text-white w-full p-2 rounded-lg"
    >
      <AiFillGoogleCircle className=" w-7 h-7 inline" />
      Continue With Google
    </button>
  );
};

export default OAuth;
