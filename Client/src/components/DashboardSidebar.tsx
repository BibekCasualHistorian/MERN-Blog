import { FaSignOutAlt } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const dashboardLinks = [
  { title: "Profile", icon: <FaPerson className="inline-block mr-4" /> },
  { title: "Logout", icon: <FaSignOutAlt className="inline-block mr-4" /> },
];

const DashboardSidebar = () => {
  return (
    <div className="p-3 pt-5 lg:min-h-screen">
      {dashboardLinks.map((each) => {
        return (
          <div
            className="bg-gray-500 px-4 rounded-[10px] mb-1 font-medium text-[20px] p-2 flex cursor-pointer justify-between items-center"
            key={Math.random()}
          >
            <h2 className="flex items-center mr-4 ">
              {each.icon}
              {each.title}
            </h2>
            {each.title == "Profile" && (
              <span className="text-sm p-1 px-2 rounded-lg bg-slate-800 text-white">
                User
              </span>
            )}
          </div>
        );
      })}
      {/* <div className="bg-black px-2 rounded-lg font-medium text-[20px] p-2 flex cursor-pointer justify-between items-center">
        <h2 className="flex items-center mr-4 ">
          <FaPerson className="inline-block mr-4" />
          Profile
        </h2>
        <span className="text-sm p-1 px-2 rounded-lg bg-slate-800 text-white">
          User
        </span>
      </div>
      <div className="font-medium text-[20px] p-2 flex items-center">
        <FaSignOutAlt className="inline-block mr-4" />
        Logout
      </div> */}
    </div>
  );
};

export default DashboardSidebar;
