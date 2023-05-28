import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../footer/footer";
import MainPage from "../main_page/mainPage";
import NavBar from "../NavBar/NavBar";

test("Footer render", () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Developed by Denislav Stoyanov©/i);
  expect(linkElement).toBeInTheDocument();
});

test("Mainpage render", () => {
  render(<MainPage />);
  const linkElement = screen.getByText(/Сайт за подготовка за НВО 10. клас/i);
  expect(linkElement).toBeInTheDocument();
});

test("NavBar render and route testing", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  fireEvent.click(screen.getByText(/Начална страница/i));

  // verify page content for default route
  expect(window.location.pathname).toBe("/nvo-10-math-frontend");

  const testLinks = screen.queryAllByText(/Тест/i);
  fireEvent.click(testLinks[0]); // Click the first matching element

  expect(window.location.pathname).toBe("/test_page/ExamPage");
});
