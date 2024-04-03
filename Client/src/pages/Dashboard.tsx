import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";

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
      <div className="m-3 lg:col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
