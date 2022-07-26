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

  useEffect(() => {
    const search = () => {
      axios.get(`${API_URL}${searchInput}`).then((response) => {
        // console.log(response.data.results[0].collectionName);
        const arr = [];
        const data = response.data.results;
        // console.log(data);

        // console.log(data[4].collectionName.indexOf("A Promised Land"));
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i].collectionName.indexOf(searchInput));
          if (data[i].collectionName.indexOf(searchInput)) {
            arr.push(data[i].collectionName);
            if (arr.length >= 5) {
              break;
            }
          }
        }
        console.log(arr.length);

        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i].indexOf(searchInput)) {
        //     arr.push(data[i]);
        //   }
        //   if (arr.length >= 5) {
        //     break;
        //   }
        // }
        console.log(arr);
      });
    };
    search();
  }, [searchInput]);

  return (
    <div className="container">
      <div className="containerWrapper">
        <div className="contentWrapper">
          <div className="inputAndIconSearchWrapper">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Band"
              className="searchInput"
            ></input>
            <FaSearch />{" "}
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
