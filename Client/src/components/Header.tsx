import { FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header className="p-3 flex items-center justify-between">
      <h1 className="text-white rounded-3xl p-1.5 bg-gradient-to-r from-sky-700 to-emerald-800">
        Bibek's Blog
      </h1>
      <div>
        <FaSearch />
      </div>
      <div className="flex gap-2">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/projects"}>Projects</NavLink>
      </div>
      <div>
        <NavLink to={"/login"}>Login</NavLink>
      </div>
    </header>
  );
};

export default Header;
