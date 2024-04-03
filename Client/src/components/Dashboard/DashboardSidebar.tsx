import { FaSignOutAlt } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import { HiAnnotation } from "react-icons/hi";

const dashboardLinks = [
  {
    title: "Dashboard",
    icon: <FaPerson className="inline-block mr-4" />,
    pathName: "",
  },
  {
    title: "Profile",
    icon: <FaPerson className="inline-block mr-4" />,
    pathName: "profile",
  },
  {
    title: "Posts",
    icon: <FaPerson className="inline-block mr-4" />,
    pathName: "posts",
  },
  {
    title: "Users",
    icon: <FaPerson className="inline-block mr-4" />,
    pathName: "users",
  },
  {
    title: "Comments",
    icon: <HiAnnotation className="inline-block mr-4" />,
    pathName: "comments",
  },
];

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state: any) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/logout/" + data._id,
        { method: "GET" }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.ok) {
        localStorage.removeItem("user");
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="p-3 pt-5 lg:min-h-screen">
      {dashboardLinks.map((each) => {
        return (
          <NavLink
            to={`/dashboard/${each.pathName}`}
            className=" bg-gray-200 px-4 rounded-[10px] mb-1 font-medium text-[20px] p-2 flex cursor-pointer justify-between items-center"
            key={Math.random()}
          >
            <h2 className="flex items-center mr-4 ">
              {each.icon}
              {each.title}
            </h2>
            {each.title == "Profile" && (
              <span className="text-sm p-1 px-2 rounded-lg bg-slate-800 text-white">
                {data.isAdmin ? "Admin" : "User"}
              </span>
            )}
          </NavLink>
        );
      })}
      <div className="bg-gray-200 px-4 rounded-[10px] mb-1 font-medium text-[20px] p-2 flex cursor-pointer justify-between items-center">
        <h2 className="flex items-center mr-4 " onClick={handleLogout}>
          <FaSignOutAlt className="inline-block mr-4" />
          Logout
        </h2>
      </div>
    </div>
  );
};

export default DashboardSidebar;
