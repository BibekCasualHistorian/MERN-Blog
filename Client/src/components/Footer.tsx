const Footer = () => {
  return (
    <footer className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 text-center gap-4">
      <div className="col-span-full">
        <h1 className="w-fit mx-auto font-bold bg-gradient-to-tr from-purple-500 to-red-400 p-1 px-2 rounded-md text-white">
          Bibek's Blog
        </h1>
      </div>
      <div className="flex gap-4 flex-col">
        <h2 className="font-bold text-2xl">About</h2>
        <a href="" className="text-gray-500">
          My JS Projects
        </a>
        <a href="" className="text-gray-500">
          Blogs
        </a>
      </div>
      <div className="flex gap-4 flex-col">
        <h2 className="font-bold text-2xl">About</h2>
        <a href="" className="text-gray-500">
          My JS Projects
        </a>
        <a href="" className="text-gray-500">
          Blogs
        </a>
      </div>
      <div className="flex gap-4 flex-col">
        <h2 className="font-bold text-2xl">About</h2>
        <a href="" className="text-gray-500">
          My JS Projects
        </a>
        <a href="" className="text-gray-500">
          Blogs
        </a>
      </div>

      <h2 className=" mt-3 col-span-full text-center font-bold text-gray-600">
        2024 CopyRight{" "}
      </h2>
    </footer>
  );
};

export default Footer;
