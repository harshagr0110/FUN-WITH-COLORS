import React, { useState } from "react";
import domtoimage from "dom-to-image";
import "./App.css";

export default function App() {
  const [color, setColor] = useState("cyan");
  const [fontSize, setFontSize] = useState(24);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("light");

  const palettes = [
    ["#FF5733", "#FFC300", "#DAF7A6", "#581845"],
    ["#6A0572", "#AB83A1", "#C4B5B5", "#EC7063"],
    ["#3498DB", "#2ECC71", "#F1C40F", "#E74C3C"],
  ];

  const randomGradient = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F333FF",
      "#33FFF1",
      "#FFA500",
      "#800080",
      "#FFFF00",
      "#0000FF",
      "#008000",
      "#FF0000",
    ];
    const randomColors = Array(4)
      .fill()
      .map(() => colors[Math.floor(Math.random() * colors.length)]);
    return `linear-gradient(to right, ${randomColors.join(", ")})`;
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (!newColor.includes("gradient"))
      setHistory([newColor, ...history.slice(0, 4)]);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const downloadImage = async () => {
    const node = document.querySelector(".app");
    try {
      const dataUrl = await domtoimage.toPng(node);
      const link = document.createElement("a");
      link.download = "color-playground.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error capturing the image:", error);
    }
  };

  return (
    <div
      className={`app theme-${theme}`}
      style={{
        backgroundColor: color,
        backgroundImage: color.includes("gradient") ? color : "none",
      }}
    >
      <header className="header">
        <h1 style={{ fontSize: `${fontSize}px` }}>
          COLOR: {color.toUpperCase()}
        </h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <div className="main-container">
        {/* Left Section */}
        <div className="left-section">
          <h2>Color Palettes</h2>
          {palettes.map((palette, index) => (
            <div key={index} className="palette">
              {palette.map((col, idx) => (
                <div
                  key={idx}
                  className="palette-color"
                  style={{ backgroundColor: col }}
                  onClick={() => handleColorChange(col)}
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="controls-section">
            <h2>Change Color</h2>
            <button onClick={() => handleColorChange("red")}>RED</button>
            <button onClick={() => handleColorChange("green")}>GREEN</button>
            <button onClick={() => handleColorChange("blue")}>BLUE</button>
            <button onClick={() => handleColorChange(randomGradient())}>
              RANDOM GRADIENT
            </button>
            <input
              type="color"
              onChange={(e) => handleColorChange(e.target.value)}
            />
          </div>
          <div className="controls-section">
            <h2>Change Font Size</h2>
            <input
              type="range"
              min="10"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
          <button onClick={downloadImage}>Download Image</button>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>Live Preview</h2>
          <div
            className="preview-box"
            style={{
              backgroundColor: color,
              backgroundImage: color.includes("gradient") ? color : "none",
            }}
          >
            Preview Area
          </div>
        </div>
      </div>

      <footer className="footer">
        <button onClick={() => navigator.clipboard.writeText(color)}>
          Copy CSS
        </button>
        <div className="history">
          <h2>Recent Colors</h2>
          <div className="history-container">
            {history.map((col, index) => (
              <div
                key={index}
                className="history-color"
                style={{ backgroundColor: col }}
                onClick={() => handleColorChange(col)}
              ></div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
