import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "./API_Url";

const MainContainer = () => {
  const [arrayOfElements, setArrayOfElements] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
  ]);
  const [searchInput, setSearchInput] = useState("");
  const copyOfArrayOfElements = [...arrayOfElements];

  useEffect(() => {
    const interval = setInterval(() => {
      copyOfArrayOfElements.push(copyOfArrayOfElements.shift());
      setArrayOfElements(copyOfArrayOfElements);
    }, 1000);
    return () => clearInterval(interval);
  }, [arrayOfElements]);

  const search = () => {
    axios.get(`${API_URL}${searchInput}`).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="container">
      <div className="containerWrapper">
        <div className="contentWrapper">
          <div className="inputAndIconSearchWrapper">
            <input placeholder="Search Band" className="searchInput"></input>
            <FaSearch onClick={() => search()} />{" "}
          </div>
          <div className="containerOfTheElements">
            {arrayOfElements.map((element) => (
              <div key={element} className="element">
                {element}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
