import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminOnly = () => {
  const { data } = useSelector((state: any) => state.user);
  const [num, setNum] = useState(0);
  // console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (num === 0) setNum(1);
  }, []);
  if (num === 0) {
  }
  if (num >= 1) {
    return data.isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
  } else {
    return <p>really</p>;
  }
};

export default AdminOnly;
