import NavBar from "./NavBar/NavBar";
import ExamPage from "./test_page/ExamPage";
import MainPage from "./main_page/mainPage";
import Grade8 from "./8thGrade/grade8";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "./footer/footer";

import axios from "axios";

function PageBuilder() {
  const [killSwitch, killSwitchSet] = useState();

  useEffect(() => {
    fetchDataa();
  }, []);

  const fetchDataa = () => {
    axios
      .get("https://nvo-10-math-backend.onrender.com/killswitch")
      .then((response) => {
        killSwitchSet(response.data[0].killswitch);
        //console.log(response.data[0].killswitch);
        //console.log(killSwitch);
        setTimeout(fetchDataa(), 1000);
      });
  };

  if (!killSwitch) {
    return (
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test_page/ExamPage" element={<ExamPage />} />
          <Route path="/8thGrade/grade8" element={<Grade8 />} />
        </Routes>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <p>No access 4 u lmao</p>
      </div>
    );
  }
}

export default PageBuilder;
