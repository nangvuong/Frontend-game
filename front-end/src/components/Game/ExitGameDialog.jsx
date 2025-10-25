import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from "@mui/material";
import { FaSignOutAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function ExitGameDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)",
          borderRadius: "20px",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "16px 16px 12px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <FaSignOutAlt style={{ fontSize: "1.4rem", color: "#ffed4e" }} />
        <DialogTitle
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "0.95rem",
            padding: "0",
            letterSpacing: "0.3px",
          }}
        >
          Thoát Game?
        </DialogTitle>
      </Box>

      {/* Content */}
      <DialogContent sx={{ padding: "16px" }}>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.95)",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            textAlign: "center",
            fontWeight: "bold",
            opacity: 0.9,
          }}
        >
          Bạn chắc chắn muốn thoát game?
        </Typography>
      </DialogContent>

      {/* Actions */}
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
      <DialogActions sx={{ gap: "8px", padding: "12px 16px" }}>
        <Button
          onClick={onClose}
          startIcon={<FaTimes />}
          sx={{
            color: "white",
            border: "1.5px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            padding: "6px 14px",
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.8)",
              transform: "translateY(-1px)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }
          }}
        >
          Không
        </Button>
        <Button
          onClick={onConfirm}
          startIcon={<FaCheck />}
          sx={{
            background: "linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)",
            color: "white",
            borderRadius: "8px",
            padding: "6px 14px",
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            border: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
              transform: "translateY(-1px)",
            }
          }}
        >
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}
