import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";

const Dashboard = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  // Access specific query parameters
  const tab = searchParams.get("tab");

  console.log("tab", tab);

  return (
    <div className="lg:grid lg:grid-cols-5">
      <div className="items-stretch bg-gray-100 dark:bg-slate-600">
        <DashboardSidebar />
      </div>
      <div className="col-span-4 p-2 ">
        <DashboardProfile />
      </div>
    </div>
  );
};

export default Dashboard;
