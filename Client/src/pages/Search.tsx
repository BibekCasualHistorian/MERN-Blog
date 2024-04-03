import React, { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(9);
  const [searchTerms, setSearchTerms] = useState(
    queryParams.get("searchTerm") || ""
  );
  const [sortDirection, setSortDirection] = useState(
    queryParams.get("sortDirection") || "asc"
  );
  const [category, setCategory] = useState(queryParams.get("category") || "");
  const [posts, setPosts] = useState([]);

  console.log(startIndex, limit, searchTerms, sortDirection, category, posts);

  const SearchOutput = () => {
    return (
      <div>
        <h1>Post Results!</h1>
      </div>
    );
  };

  const SearchInput = ({
    category,
    searchTerms,
    sortDirection,
    setCategory,
    setSearchTerms,
    setSortDirection,
  }) => {
    return (
      <div className="mx-auto w-4/5">
        <div className="flex flex-wrap justify-center items-center">
          <div className="flex flex-col items-center mb-4 mr-4">
            <label htmlFor="searchTerm" className="mb-2">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              placeholder="Search"
              className="gray-200 py-1 px-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col items-center mb-4 mr-4">
            <label htmlFor="sortDirection" className="mb-2">
              Sort:
            </label>
            <select
              id="sortDirection"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              className="gray-200 py-1 px-2 border border-gray-300 rounded"
            >
              <option value="dsc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="category" className="mb-2">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="gray-200 py-1 px-2 border border-gray-300 rounded"
            >
              <option value="React">React</option>
              <option value="Javascript">Javascript</option>
              <option value="Next">Next</option>
            </select>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/get-posts?searchTerms=${searchTerms}`
        );
        const data = await response.json();
        if (response.ok) {
          setPosts(data.data);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid sm:grid-cols-3 p-2">
      <div className="">
        <SearchInput
          category={category}
          searchTerms={searchTerms}
          sortDirection={sortDirection}
          setCategory={setCategory}
          setSortDirection={setSortDirection}
          setSearchTerms={setSearchTerms}
        />
      </div>
      <div className="sm:col-span-2">
        <SearchOutput />
      </div>
    </div>
  );
};

export default Search;
