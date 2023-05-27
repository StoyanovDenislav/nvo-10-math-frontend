import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./NavBar.css";

function NavBar() {
  const [isListShown, setIsListShown] = useState(false);

  const toggleList = () => {
    setIsListShown(!isListShown);
  };

  return (
    <div>
      <div className="w3-bar w3-red">
        <Link to="/main_page/mainPage" className="w3-bar-item w3-button">
          Начална страница
        </Link>
        <Link
          to="/8thGrade/grade8"
          className="w3-bar-item w3-button w3-hide-small"
        >
          8. клас
        </Link>
        <Link to="/link2" className="w3-bar-item w3-button w3-hide-small">
          9. клас
        </Link>
        <Link to="/link3" className="w3-bar-item w3-button w3-hide-small">
          10. клас
        </Link>
        <Link
          to="/test_page/ExamPage"
          className="w3-bar-item w3-button w3-hide-small"
        >
          Тест
        </Link>
        <a
          href="#"
          className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"
          onClick={toggleList}
        >
          &#9776;
        </a>
      </div>
      <div
        id="demo"
        className={`w3-bar-block w3-red ${
          isListShown ? "w3-show" : ""
        } w3-hide w3-hide-large w3-hide-medium`}
        style={{
          maxHeight: isListShown ? "500px" : "0",
          transition: "max-height 0.5s ease",
          overflow: "hidden",
        }}
      >
        <Link to="/8thGrade/grade8" className="w3-bar-item w3-button">
          8. клас
        </Link>
        <Link to="/link2" className="w3-bar-item w3-button">
          9. клас
        </Link>
        <Link to="/link3" className="w3-bar-item w3-button">
          10. клас
        </Link>
        <Link to="/test_page/ExamPage" className="w3-bar-item w3-button">
          Тест
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
