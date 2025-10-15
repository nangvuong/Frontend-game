import React, { useState, useRef } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import "./Game.css";
import { shuffleArray } from "../../utils/shuffle";

export default function Game() {
  const word = "CAMBRIDGE";
  const [letters, setLetters] = useState(shuffleArray(word.split("")));
  const [selected, setSelected] = useState([]);
  const [dragging, setDragging] = useState(null);
  const dragRef = useRef(null);

  // 👉 Click vào chữ để chọn / bỏ chọn
  const handleLetterClick = (letter, index) => {
    if (selected.includes(letter)) {
      setSelected(selected.filter((l, i) => i !== selected.indexOf(letter)));
    } else if (selected.length < word.length) {
      setSelected([...selected, letter]);
    }
  };

  // 👉 Kiểm tra kết quả
  const handleCheck = () => {
    if (selected.join("") === word) {
      alert("🎉 Correct!");
    } else {
      alert("❌ Try again!");
    }
  };

  // 👉 Reset
  const handleReset = () => {
    setSelected([]);
    setLetters(shuffleArray(word.split("")));
  };

  // 👉 Drag bắt đầu
  const handlePointerDown = (e, index) => {
    const el = e.target;
    setDragging(index);
    dragRef.current = {
      el,
      startX: e.clientX,
      startY: e.clientY,
      originalLeft: el.offsetLeft,
      originalTop: el.offsetTop,
    };
    el.setPointerCapture(e.pointerId);
  };

  // 👉 Di chuyển
  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const { el, startX, startY, originalLeft, originalTop } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.zIndex = 1000;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  // 👉 Kéo xong
  const handlePointerUp = () => {
    if (!dragRef.current) return;
    dragRef.current.el.style.transform = "";
    dragRef.current.el.style.zIndex = "";
    dragRef.current = null;
    setDragging(null);
  };

  return (
    <Box className="game-wrapper">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Word Scramble
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Arrange the letters to form the correct word:
      </Typography>

      {/* Vùng đáp án */}
      <Box className="answer-box">
        {word.split("").map((_, i) => (
          <Paper key={i} className="answer-slot">
            {selected[i] || ""}
          </Paper>
        ))}
      </Box>

      {/* Vùng chữ */}
      <Box className="letters-box">
        {letters.map((letter, index) => (
          <Paper
            key={index}
            className={`letter-tile ${
              selected.includes(letter) ? "disabled" : ""
            }`}
            onClick={() => handleLetterClick(letter, index)}
            onPointerDown={(e) => handlePointerDown(e, index)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <Typography variant="subtitle1" sx={{fontWeight:"bold", opacity:0.7, minWidth: "40px", minHeight: "40px", alignContent: "center"}}>{letter}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Nút chức năng */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheck}
          sx={{ mr: 2 }}
        >
          CHECK
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          RESET
        </Button>
      </Box>
    </Box>
  );
}
