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
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import "./WordEditPanel.css";

export default function WordEditPanel({ word, onUpdate, onDelete }) {
  const [editWord, setEditWord] = useState(word.word);
  const [editImage, setEditImage] = useState(word.image);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ word: "", image: "" });

  const handleSave = () => {
    const newErrors = { word: "", image: "" };
    
    if (!editWord.trim()) {
      newErrors.word = "Vui lòng nhập từ";
    }
    if (!editImage.trim()) {
      newErrors.image = "Vui lòng nhập link ảnh";
    }

    if (newErrors.word || newErrors.image) {
      setErrors(newErrors);
      return;
    }

    onUpdate({
      ...word,
      word: editWord.toUpperCase(),
      image: editImage,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditWord(word.word);
    setEditImage(word.image);
    setIsEditing(false);
    setErrors({ word: "", image: "" });
  };

  return (
    <Box className="word-edit-panel">
      <Card className="edit-card">

        <CardContent className="edit-content">
          {/* Edit Fields */}
          {isEditing ? (
            <Box className="edit-form">
              <TextField
                fullWidth
                label="Từ"
                value={editWord}
                onChange={(e) => {
                  setEditWord(e.target.value);
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
                label="Link Ảnh"
                value={editImage}
                onChange={(e) => {
                  setEditImage(e.target.value);
                  setErrors({ ...errors, image: "" });
                }}
                className="form-field"
                margin="normal"
                variant="outlined"
                error={!!errors.image}
                helperText={errors.image}
              />

              {editImage && (
                <Box className="preview-section">
                  <img
                    src={editImage}
                    className="edit-preview"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200?text=Error";
                    }}
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Box className="view-info">
              <Box className="info-item">
                <label>Từ:</label>
                <span>{word.word}</span>
              </Box>
              <Box className="info-item">
                <label>Link Ảnh:</label>
                <span className="url-text">{word.image}</span>
              </Box>
            </Box>
          )}
        </CardContent>

        {/* Actions */}
        <CardActions className="edit-actions">
          {isEditing ? (
            <>
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
              <Tooltip title="Lưu">
                <IconButton
                  onClick={handleSave}
                  sx={{
                    color: "#4b2edc",
                    "&:hover": {
                      background: "rgba(75, 46, 220, 0.1)",
                    },
                  }}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Xóa">
                <IconButton
                  onClick={() => onDelete(word.id)}
                  sx={{
                    color: "#ef4444",
                    "&:hover": {
                      background: "rgba(239, 68, 68, 0.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sửa">
                <IconButton
                  onClick={() => setIsEditing(true)}
                  sx={{
                    color: "#4b2edc",
                    "&:hover": {
                      background: "rgba(75, 46, 220, 0.1)",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
