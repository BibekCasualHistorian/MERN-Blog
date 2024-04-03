import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(9);

  const handleShowMore = () => {
    // setStartIndex((startIndex) => startIndex + limit);
    setLimit((limit) => limit + 9);
  };
  useEffect(() => {
    const fetchData = () => {
      fetch(
        `http://localhost:3000/api/post/get-posts?startIndex=${startIndex}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data.data.posts);
        });
    };
    fetchData();
  }, [limit, startIndex]);
  const Hero = () => {
    return (
      <div className="text-center" style={{ marginTop: "14vh" }}>
        <h2 className="text-6xl font-semibold">Welcome to my blogs</h2>
        <p
          className="mt-4 mx-auto"
          style={{
            textWrap: "balance",
            maxWidth: "900px",
            letterSpacing: "1px",
          }}
        >
          My blog provides insightful discussions on topics ranging from
          technology trends to practical programming tips, catering to both
          beginners and seasoned developers. With engaging content presented in
          a clear and concise manner, readers can stay updated and empowered in
          their journey through the ever-evolving landscape of technology.
        </p>
        <Link to={"/"} className="mt-5 block text-green-700 font-semibold">
          View all posts
        </Link>
      </div>
    );
  };
  const RecentPosts = () => {
    return (
      <div className="mt-4 sm:p-5 lg:p-8">
        <h1 className="text-center text-3xl font-semibold">Recents Posts</h1>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 &&
            posts.map((post) => {
              console.log("post", post);
              return (
                <div
                  key={Math.random()}
                  className="rounded-md p-2 border border-blue-400"
                >
                  <Link to={`/post/${post._id}`}>
                    <img src={"/random.jpg"} alt="" className="rounded-lg" />
                    <h2 className="font-semibold text-lg ml-3">{post.title}</h2>
                    <p className="ml-3 font-serif">
                      {post.category || "Unavailable"}
                    </p>
                  </Link>
                </div>
              );
            })}
        </div>
        <h1
          className="text-center text-green-700 font-semibold text-lg mt-5"
          onClick={() => handleShowMore()}
        >
          Show More
        </h1>
      </div>
    );
  };
  return (
    <div className="p-2">
      <Hero />
      <RecentPosts />
    </div>
  );
};

export default Home;
