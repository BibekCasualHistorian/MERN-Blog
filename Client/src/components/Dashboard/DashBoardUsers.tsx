import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const headings = ["User Created", "Image", "Name", "Email", "Admin", "Delete"];

const DashBoardUsers = () => {
  const { user } = useSelector((state: any) => {
    return state.user;
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/user/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.data.users);
      }
      console.log(data);
    };
    fetchData();
  }, []);
  console.log("users", users);
  return (
    <div>
      <section className="grid grid-cols-6 text-center">
        {headings.map((each) => {
          return (
            <h1 className="font-bold p-3" key={each}>
              {each}
            </h1>
          );
        })}
      </section>
      <section>
        {users.map((user) => {
          const baseImage = `data:image/jpeg;base64,${user.imageBase64}`;
          return (
            <div key={Math.random()} className="grid grid-cols-6 text-center">
              <h1>{user.createdAt.toString().substr(0, 10)}</h1>
              <img src={baseImage} alt="" />
              <h1 className="text-wrap">{user.username}</h1>
              <h1>{user.email}</h1>
              <h1>{user.isAdmin ? "Yes" : "No"}</h1>
              <h1>Delete</h1>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashBoardUsers;
