import { useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import "./AddWordPanel.css";

export default function AddWordPanel({ onAdd, onCancel, existingWords }) {
  const [formData, setFormData] = useState({ word: "", image: "" });
  const [errors, setErrors] = useState({ word: "", image: "" });

  const handleAdd = () => {
    const newErrors = { word: "", image: "" };
    
    if (!formData.word.trim()) {
      newErrors.word = "Vui lòng nhập từ";
    }
    if (!formData.image.trim()) {
      newErrors.image = "Vui lòng nhập link ảnh";
    }

    if (newErrors.word || newErrors.image) {
      setErrors(newErrors);
      return;
    }

    const newWord = {
      id: Math.max(...existingWords.map((w) => w.id), 0) + 1,
      word: formData.word.toUpperCase(),
      image: formData.image,
    };

    onAdd(newWord);
    setFormData({ word: "", image: "" });
    setErrors({ word: "", image: "" });
    onCancel();
  };

  const handleCancel = () => {
    setFormData({ word: "", image: "" });
    setErrors({ word: "", image: "" });
    onCancel();
  };

  return (
    <Box className="word-add-panel">
      <Card className="add-card">
        <CardContent className="add-content">
          {/* Form Fields */}
          <Box className="add-form">
            <TextField
              autoFocus
              fullWidth
              label="Từ"
              name="word"
              value={formData.word}
              onChange={(e) => {
                setFormData({ ...formData, word: e.target.value });
                setErrors({ ...errors, word: "" });
              }}
              className="form-field"
              margin="normal"
              variant="outlined"
              error={!!errors.word}
              helperText={errors.word}
            />

            <TextField
              fullWidth
              label="Ảnh gợi ý"
              name="image"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setErrors({ ...errors, image: "" });
              }}
              className="form-field"
              margin="normal"
              variant="outlined"
              error={!!errors.image}
              helperText={errors.image}
            />

            {formData.image && (
              <Box className="preview-section">
                <p>Preview:</p>
                <img
                  src={formData.image}
                  className="add-preview"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200?text=Image+Error";
                  }}
                />
              </Box>
            )}
          </Box>
        </CardContent>

        {/* Actions */}
        <CardActions className="add-actions">
          <Tooltip title="Hủy">
            <IconButton
              onClick={handleCancel}
              sx={{
                color: "#6b7280",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thêm">
            <IconButton
              onClick={handleAdd}
              sx={{
                color: "#5ad9a4",
                "&:hover": {
                  background: "rgba(90, 217, 164, 0.1)",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
}
