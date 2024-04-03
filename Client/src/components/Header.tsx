import { useEffect, useState } from "react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleDarkMode } from "../store/slices/themeSlice";
import { loginSuccess, logout } from "../store/slices/userSlice";

const navigationLocation = [
  { pathName: "/", title: "Home" },
  { pathName: "/about", title: "About" },
  { pathName: "/projects", title: "Projects" },
];

const Header = () => {
  const { isAuthenticated, data } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropDown, setDropDown] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  console.log("dropDown", dropDown);
  console.log("profile", profile);

  // console.log(isAuthenticated, data);

  useEffect(() => {
    const user = localStorage.getItem("user");
    // console.log(user);
    if (user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [location]);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const handleSearch = async () => {
    setDropDown(false);
    setProfile(false);
    navigate(`/search?searchTerm=${search}&sortDirection=asc`);
  };

  return (
    <header className="relative bg-gray-100 p-3 lg:px-7 flex gap-4 items-center justify-between border-b-2 border-gray-300 dark:bg-slate-600 ">
      <Link
        to={"/"}
        className="text-white font-bold rounded-2xl p-1.5 px-2 bg-gradient-to-r from-purple-600 to-pink-800"
      >
        Bibek's Blog
      </Link>
      <div className="border-2 p-2.5 px-4 rounded-2xl h-full sm:hidden">
        <FaSearch />
      </div>
      <form className="border bg-gray-100 hidden rounded-3xl border-gray-300 sm:inline-block  p-1 pr-3">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setSearch(e.target.value)}
          className="border-none hover:outline-none outline-none px-2 bg-inherit text-gray-600"
          placeholder="Search..."
        />
        <FaSearch className="inline text-gray-500" onClick={handleSearch} />
      </form>
      <div className=" hidden sm:flex gap-4">
        {navigationLocation.map((each) => {
          return (
            <Link
              key={each.pathName}
              to={each.pathName}
              className={each.pathName == location.pathname ? "font-bold" : ""}
            >
              {each.title}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <div
          className="border-gray-300 border p-2 px-3 cursor-pointer rounded-2xl"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {theme == "light" ? <FaSun /> : <FaMoon />}
        </div>
        {!isAuthenticated && (
          <div className="ml-auto">
            <Link
              to={"/login"}
              className="border-gray-300 border p-2 px-3 rounded-xl font-bold hover:bg-pink-500 group-hover:text-white"
            >
              Login
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <div className="relative">
            <img
              className="w-9 h-full rounded-full object-cover cursor-pointer"
              src={Boolean(data.photo) ? `${data.photo}` : ""}
              alt="really"
              onClick={() => setProfile(!profile)}
            />
            {profile && (
              <div
                className="border border-gray-200 rounded-lg absolute p-6 right-0 flex flex-col bg-white items-center"
                style={{ top: "120%" }}
              >
                <div className="text-center mb-4">
                  <h2>{data.username}</h2>
                  <h3 className="text-gray-500">{data.email}</h3>
                </div>
                <Link
                  to={"/dashboard"}
                  onClick={() => setProfile(false)}
                  className="p-2 px-3 rounded-xl font-bold"
                >
                  Profile
                </Link>
                <p
                  onClick={handleLogout}
                  className="p-2 px-3 rounded-xl font-bold cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className="w-8 flex gap-1 flex-col bg-white cursor-pointer sm:hidden"
        onClick={() => setDropDown((prevState) => !prevState)}
      >
        <span className="bg-gray-700 rounded-lg w-full h-1"></span>
        <span className="bg-gray-700 rounded-lg w-full h-1"></span>
        <span className="bg-gray-700 rounded-lg w-full h-1"></span>
      </div>
      {dropDown && (
        <div
          className="flex flex-col left-0 w-full top-full absolute bg-white pb-4 border-b-2 sm:hidden"
          style={{ transition: " display 2s" }}
        >
          {navigationLocation.map((each) => {
            return (
              <Link
                onClick={() => setProfile(false)}
                key={each.pathName}
                to={each.pathName}
                className={`p-2 ${
                  location.pathname == each.pathName
                    ? "bg-green-500 font-bold  text-white"
                    : ""
                }`}
              >
                {each.title}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
