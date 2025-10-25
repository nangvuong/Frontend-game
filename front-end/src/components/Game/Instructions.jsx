import React from "react";
import { Box, Typography, Dialog, Button } from "@mui/material";
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
          backgroundColor: "#f8f9fa",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ padding: "32px 24px" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "#4b2edc" }}>
            🎮 Cách Chơi
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: "auto", padding: 0 }}>
            <FaTimes size={24} color="#666" />
          </Button>
        </Box>

        {/* Instructions */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Box>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#4b2edc", marginBottom: "8px" }}>
              📝 Mục tiêu
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.6" }}>
              Sắp xếp các ký tự để tạo thành từ tiếng Việt đúng trong 20 giây.
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#4b2edc", marginBottom: "8px" }}>
              🎯 Cách Chơi
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginLeft: "12px" }}>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                1. Nhấn vào các ký tự bên dưới để chọn
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                2. Các ký tự sẽ xuất hiện ở hàng trên
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                3. Nhấn vào ký tự đã chọn để hoàn tác
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                4. Hoàn thành từ trước khi hết thời gian
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#4b2edc", marginBottom: "8px" }}>
              ⭐ Điểm Số
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginLeft: "12px" }}>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                • Mỗi ký tự đúng vị trí: 10 điểm
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                • Tối đa 100 điểm/round
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                • Thi đấu 10 round, ai có điểm cao hơn thắng
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#4b2edc", marginBottom: "8px" }}>
              ⏱️ Thanh Tiến Trình
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginLeft: "12px" }}>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                🟢 Xanh lá (trên 30s): Thời gian còn nhiều
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                🟠 Cam (10-30s): Thời gian sắp hết
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                🔴 Đỏ (dưới 10s): Cảnh báo - còn ít thời gian
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            marginTop: "24px",
            backgroundColor: "#4b2edc",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "8px",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "#3a1fa3",
            },
          }}
        >
          Hiểu Rồi
        </Button>
      </Box>
    </Dialog>
  );
}
