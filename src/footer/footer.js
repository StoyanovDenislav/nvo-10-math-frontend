import React, { useState, useEffect } from "react";
import "./footer.css";

function Footer() {
  const [pageHeightVh, setPageHeightVh] = useState(0);

  useEffect(() => {
    function handleResize() {
      const footer = document.querySelector(".footer");
      const bodyHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;
      const footerHeight = footer.offsetHeight;

      const calculatedPageHeightVh = ((bodyHeight + 100) / windowHeight) * 100;
      setPageHeightVh(calculatedPageHeightVh);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      data-aos="fade-up"
      data-aos-offset="0"
      data-aos-duration="1500"
      className="footer"
      style={{ height: `calc(${pageHeightVh}vh)` }}
    >
      <p>
        Developed by Denislav Stoyanov©
        <br />
      </p>
    </footer>
  );
}

export default Footer;
