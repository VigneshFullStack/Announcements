import React, { useRef, useEffect, useState } from "react";
import "../../../styles//components/ScratchCard.scss";
import IMG from "../../../assets/images/scratch.png";

const ScratchCard = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://localhost:7057/api/graphql/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                randomQuote
              }
            `,
          }),
        });

        const result = await response.json();
        setQuote(result.data.randomQuote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textX, setTextX] = useState(null);
  const [textY, setTextY] = useState(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    const img = new Image();
    img.src = IMG;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      setImageLoaded(true);

      // Calculate random text position within card area (excluding margins)
      const margin = 20;
      setTextX(Math.floor(Math.random() * (width - 2 * margin)) + margin);
      setTextY(Math.floor(Math.random() * (height - 2 * margin)) + margin);
    };

    // Scratch effect
    let isDrawing = false;

    const handleMouseDown = (e) => {
      isDrawing = true;
      scratch(e);
    };

    const handleMouseMove = (e) => {
      if (isDrawing) scratch(e);
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    const scratch = (e) => {
      if (!imageLoaded) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2, false);
      ctx.fill();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [IMG, imageLoaded]);

  return (
    <div className="scratch-card d-flex justify-content-center align-items-center">
      <div className="cls_dummy d-flex justify-content-center align-items-center">
        <canvas
          ref={canvasRef}
          width={350}
          height={350}
          className="cls_canvas"
        ></canvas>
        {imageLoaded && ( 
          <span className="quote-text">{quote}</span>
        )}
      </div>
    </div>
  );
};

export default ScratchCard;
