import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let url = `https://jsonplaceholder.typicode.com/users`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setFilteredResults(response.data);
    });
  }, []);

  const handleOnChange = (e) => {
    const targetValue = e.target.value;
    setSearchInput(targetValue);
  };

  const filteredUsers = filteredResults.filter((user) => {
    return (
      searchInput === "" ||
      Object.values(user)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
  });

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Search..."
        value={searchInput}
        onChange={handleOnChange}
      />
      <div className="count">
        {filteredUsers.length > 0 ? filteredUsers.length : ""}
      </div>
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((item) => {
            return (
              <div className="card">
                <article className="card__username">{item.username}</article>
                <article className="card__phone">{item.phone} </article>
                <article className="card__name">{item.name}</article>
              </div>
            );
          })
        ) : (
          <h4 className="notFound_text">Nothing found for your search :(</h4>
        )}
      </div>
    </div>
  );
}
