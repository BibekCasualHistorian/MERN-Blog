import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminOnly from "./components/AdminOnly";
import CreatePost from "./pages/CreatePost";
import DashBoardPosts from "./components/Dashboard/DashBoardPosts";
import DashBoardUsers from "./components/Dashboard/DashBoardUsers";
import EachPost from "./pages/EachPost";
import DashBoardComments from "./components/Dashboard/DashBoardComment";
import DashboardProfile from "./components/Dashboard/DashboardProfile";
import DashboardHome from "./components/Dashboard/DashboardHome";
import Search from "./pages/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/post/:id" element={<PrivateRoute />}>
            <Route path="" element={<EachPost />} />
          </Route>
          <Route path="/search" element={<PrivateRoute />}>
            <Route path="" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route element={<Dashboard />}>
              <Route path="" element={<DashboardHome />} />
              <Route path="profile" element={<DashboardProfile />} />
              <Route path="posts" element={<DashBoardPosts />} />
              <Route path="users" element={<DashBoardUsers />} />
              <Route path="comments" element={<DashBoardComments />} />
            </Route>
          </Route>
          <Route path="/create-post" element={<AdminOnly />}>
            <Route path="" element={<CreatePost />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
