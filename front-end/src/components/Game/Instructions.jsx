import React from "react";
import { Box, Typography, Dialog, Button, Stack, Divider } from "@mui/material";
import { FaTimes } from "react-icons/fa";

export default function Instructions({ isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box sx={{ padding: "32px 28px" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", background: "linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🎮 Cách Chơi
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: "auto", padding: 0, color: "#999", transition: "all 0.3s", "&:hover": { color: "#4b2edc", transform: "scale(1.1)" } }}>
            <FaTimes size={24} />
          </Button>
        </Box>

        <Divider sx={{ marginBottom: "28px", background: "linear-gradient(90deg, transparent, #ddd, transparent)" }} />

        {/* Instructions */}
        <Stack spacing={3}>
          {/* Objective */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Typography sx={{ fontSize: "1.4rem" }}>📝</Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", color: "#4b2edc" }}>
                Mục tiêu
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.95rem", color: "#555", lineHeight: "1.7", paddingLeft: "34px" }}>
              Sắp xếp các ký tự để tạo thành từ tiếng Anh đúng trong 20 giây.
            </Typography>
          </Box>

          {/* How to Play */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Typography sx={{ fontSize: "1.4rem" }}>🎯</Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", color: "#4b2edc" }}>
                Cách Chơi
              </Typography>
            </Box>
            <Stack spacing={1.5} sx={{ paddingLeft: "34px" }}>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold", color: "#6ee7b7", minWidth: "20px" }}>1.</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Nhấn vào các ký tự bên dưới để chọn</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold", color: "#6ee7b7", minWidth: "20px" }}>2.</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Các ký tự sẽ xuất hiện ở hàng trên</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold", color: "#6ee7b7", minWidth: "20px" }}>3.</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Nhấn vào ký tự đã chọn để hoàn tác</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold", color: "#6ee7b7", minWidth: "20px" }}>4.</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Hoàn thành từ trước khi hết thời gian</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Scoring */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Typography sx={{ fontSize: "1.4rem" }}>⭐</Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", color: "#4b2edc" }}>
                Điểm Số
              </Typography>
            </Box>
            <Stack spacing={1} sx={{ paddingLeft: "34px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography sx={{ fontSize: "1rem", color: "#ffd700" }}>•</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Mỗi ký tự đúng vị trí: <strong>10 điểm</strong></Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography sx={{ fontSize: "1rem", color: "#ffd700" }}>•</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Tối đa: <strong>100 điểm/vòng</strong></Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography sx={{ fontSize: "1rem", color: "#ffd700" }}>•</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555" }}>Chơi <strong>10 vòng</strong> để hoàn thành</Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ marginTop: "28px", marginBottom: "28px", background: "linear-gradient(90deg, transparent, #ddd, transparent)" }} />

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(135deg, #6ee7b7 0%, #4ca876 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "14px",
            borderRadius: "12px",
            textTransform: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 20px rgba(110, 231, 183, 0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 30px rgba(110, 231, 183, 0.5)",
            },
            "&:active": {
              transform: "translateY(-1px)",
            },
          }}
        >
          Hiểu Rồi
        </Button>
      </Box>
    </Dialog>
  );
}
