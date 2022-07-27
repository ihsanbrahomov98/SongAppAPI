import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css";

import axios from "axios";
import { API_URL } from "./API_Url";

// useState with initial data, which was presented in the task image.

const MainContainer = () => {
  const [arrayOfElements, setArrayOfElements] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
  ]);
  const [arrayOfElementsAfterInput, setArrayOfElementsAfterInput] =
    useState("");

  // useState with initial input value, which is used for axios GET requests on line 34

  const [searchInput, setSearchInput] = useState("");

  // useEffect for shifting the items indexes from first to last.

  useEffect(() => {
    const interval = setInterval(() => {
      copyOfArrayOfElements.push(copyOfArrayOfElements.shift());
      setArrayOfElements(copyOfArrayOfElements);
    }, 1000);
    return () => clearInterval(interval);
  }, [arrayOfElements]);

  // useEffect for making axios GET requests upon entering new data in the input on line 64, the data is stored in the useState searchInput

  useEffect(() => {
    const search = () => {
      axios
        .get(`${API_URL}${searchInput}${searchInput.length > 0 ? "." : ""}`)
        .then((response) => {
          // the reason of putting ${searchInput.length > 0 ? "." : ""} is the following: In the example URL(in the task),
          // we have https://itunes.apple.com/search?term=radiohead. There is dot after "term=radiohead", but the input in
          // the next image is just radiohead

          const arr = [];
          const data = response.data.results;
          for (let i = 0; i < data.length; i++) {
            if (data[i].collectionName.indexOf(searchInput)) {
              arr.push(data[i].collectionName);
            }
          }
          const uniqueArray = [...new Set(arr)];
          const sorted = uniqueArray.sort().slice(0, 5);
          setArrayOfElements(sorted);

          if (arr.length === 0) {
            setArrayOfElements(["A", "B", "C", "D", "E"]);
          }
          // The reason of putting if (arr.length === 0).... is in case of an invalid search. I couldn`t tell from the task if it was
          // necessary or not, but i did it nonetheless. If its wrong deleted it, with or without it, the code will run.
        });
    };
    search();
  }, [searchInput]);

  const copyOfArrayOfElements = [...arrayOfElements];

  return (
    <div className="container">
      <div className="containerWrapper">
        <div className="contentWrapper">
          <div className="inputContainer">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Band"
              className="element input"
            ></input>
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
