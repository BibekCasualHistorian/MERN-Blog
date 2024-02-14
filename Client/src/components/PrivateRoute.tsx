import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const [num, setNum] = useState(0);
  // console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (num === 0) setNum(1);
  }, []);
  if (num === 0) {
  }
  if (num >= 1) {
    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
  } else {
    return <p>really</p>;
  }
};

export default PrivateRoute;
