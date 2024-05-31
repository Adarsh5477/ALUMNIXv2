import React, { useState, useEffect } from "react";
import scrollTopIcon from "../assets/scroll_top.svg";

function ScrollToTop() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    rotateScrollToTopButton();
    toggleScrollToTopButton();
    attachScrollEventListener();
    attachScrollToTopButtonClickListener();
    attachSvgTextClickListener();

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      const scrollToTopButton = document.getElementById("scrollToTop");
      const svgText = document.getElementById("svgText");

      if (scrollToTopButton) {
        scrollToTopButton.removeEventListener("click", scrollToTop);
      }
      if (svgText) {
        svgText.removeEventListener("click", scrollToTop);
      }
    };
  }, []);

  const updateScrollPercentageText = () => {
    const scrollPercentageText = document.getElementById("svgText"); // Corrected selector
    if (scrollPercentageText) {
      const scrollPercentage = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );
      const opacity = 100;
      setScrollPercentage(scrollPercentage);
      scrollPercentageText.innerText = `${scrollPercentage}%`;
      scrollPercentageText.style.opacity = opacity;
    }
  };

  const rotateScrollToTopButton = () => {
    const scrollToTopButton = document.getElementById("scrollToTop");
    const rotationAngle = window.scrollY * 0.5;
    if (window.scrollY > 0) {
      scrollToTopButton.style.transform = `rotate(${rotationAngle}deg)`;
    } else {
      scrollToTopButton.style.transform = `rotate(-${rotationAngle}deg)`;
    }
  };

  const toggleScrollToTopButton = () => {
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.style.opacity = "1";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    rotateScrollToTopButton();
    toggleScrollToTopButton();
    updateScrollPercentageText();
  };

  const attachScrollEventListener = () => {
    window.addEventListener("scroll", handleScroll);
  };

  const attachScrollToTopButtonClickListener = () => {
    document
      .getElementById("scrollToTop")
      .addEventListener("click", scrollToTop);
  };

  const attachSvgTextClickListener = () => {
    document.getElementById("svgText").addEventListener("click", scrollToTop);
  };

  return (
    <div>
      <div id="scrollToTop">
        <img src={scrollTopIcon} alt="Scroll to Top" />
      </div>
      <div id="svgText">
        <p>0%</p>
      </div>
    </div>
  );
}

export default ScrollToTop;