import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import WordListPanel from "./WordListPanel";
import WordEditPanel from "./WordEditPanel";
import AddWordPanel from "./AddWordPanel";
import WordLettersDisplay from "../shared/WordLettersDisplay";
import "./AdminWordManagement.css";

// Default GAME_WORDS
const DEFAULT_GAME_WORDS = [
  { id: 1, word: "VITE", image: "https://vitejs.dev/logo.svg" },
  { id: 2, word: "REACT", image: "https://react.dev/images/og-home.png" },
  {
    id: 3,
    word: "JAVASCRIPT",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
  },
  {
    id: 4,
    word: "DESIGN",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
  },
  {
    id: 5,
    word: "CREATE",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
  },
  {
    id: 6,
    word: "PUZZLE",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
  },
  {
    id: 7,
    word: "GAMING",
    image: "https://images.unsplash.com/photo-1538481143235-5d8333846fbb?w=400",
  },
  {
    id: 8,
    word: "PLAYER",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400",
  },
  {
    id: 9,
    word: "WINNER",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400",
  },
  {
    id: 10,
    word: "BATTLE",
    image: "https://images.unsplash.com/photo-1538481143235-5d8333846fbb?w=400",
  },
];

export default function AdminWordManagement({ user }) {

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, wordId: null, wordName: "" });

  // Load words from localStorage on mount
  useEffect(() => {
    const loadWords = async () => {
      try {
        setLoading(true);
        // Try to load from localStorage first
        const saved = localStorage.getItem("gameWords");
        if (saved) {
          setWords(JSON.parse(saved));
        } else {
          // Use default if not found
          setWords(DEFAULT_GAME_WORDS);
          localStorage.setItem("gameWords", JSON.stringify(DEFAULT_GAME_WORDS));
        }
      } catch (error) {
        console.error("Error loading words:", error);
        setWords(DEFAULT_GAME_WORDS);
      } finally {
        setLoading(false);
      }
    };

    loadWords();
  }, []);

  // Save words to localStorage
  const saveWords = (updatedWords) => {
    try {
      localStorage.setItem("gameWords", JSON.stringify(updatedWords));
      setWords(updatedWords);
      showNotification("Đã lưu thành công!", "success");
    } catch (error) {
      console.error("Error saving words:", error);
      showNotification("Lỗi khi lưu dữ liệu", "error");
    }
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle add word
  const handleAddWord = (newWord) => {
    const updated = [...words, newWord];
    saveWords(updated);
    setIsAddingWord(false);
  };

  // Handle update word
  const handleUpdateWord = (updatedWord) => {
    const updated = words.map((w) =>
      w.id === updatedWord.id ? updatedWord : w
    );
    saveWords(updated);
    setSelectedWord(null);
    showNotification("Từ đã được cập nhật", "success");
  };

  // Handle delete word
  const handleDeleteWord = (wordId) => {
    const word = words.find(w => w.id === wordId);
    setDeleteDialog({
      open: true,
      wordId: wordId,
      wordName: word?.word || "",
    });
  };

  // Confirm delete word
  const handleConfirmDelete = () => {
    const updated = words.filter((w) => w.id !== deleteDialog.wordId);
    saveWords(updated);
    setSelectedWord(null);
    setDeleteDialog({ open: false, wordId: null, wordName: "" });
    showNotification("Từ đã được xóa", "success");
  };

  // Filter words based on search
  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        className="admin-container"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Alert Notification */}
      <Collapse in={!!notification} sx={{ position: "fixed", top: 90, right: 24, zIndex: 1000, width: "auto" }}>
        {notification && (
          <Alert
            severity={notification.type}
            onClose={() => setNotification(null)}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              animation: "slideInRight 0.3s ease-out",
            }}
          >
            {notification.message}
          </Alert>
        )}
      </Collapse>

      <Box className="admin-container">
        {/* Left: Search Bar + Word List */}
        <Box className="admin-left">
          {/* Search Bar with Add Button */}
          <Box className="search-wrapper">
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm từ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#4b2edc", fontSize: "1.3rem" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "white",
                    height: "48px",
                    fontSize: "1rem",
                    "&:hover fieldset": {
                      borderColor: "#4b2edc !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4b2edc !important",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 12px",
                  },
                }}
              />
              <IconButton
                onClick={() => {
                  setIsAddingWord(true);
                  setSelectedWord(null);
                }}
                sx={{
                  background: "linear-gradient(135deg, #6ee7b7 0%, #5ad9a4 100%)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "12px",
                  minWidth: "48px",
                  height: "48px",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5ad9a4 0%, #4bbf96 100%)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Word List */}
          <WordListPanel
            words={filteredWords}
            selectedWord={selectedWord}
            onSelectWord={setSelectedWord}
          />
        </Box>

        {/* Right: Add Panel, Edit Panel or Word Display */}
        <Box className="admin-right">
          {isAddingWord ? (
            <AddWordPanel
              onAdd={handleAddWord}
              onCancel={() => setIsAddingWord(false)}
              existingWords={words}
            />
          ) : selectedWord ? (
            <WordEditPanel
              word={selectedWord}
              onUpdate={handleUpdateWord}
              onDelete={handleDeleteWord}
            />
          ) : (
            <Box className="word-display-wrapper">
              <WordLettersDisplay slogan="Quản Lý Từ Gợi Ý - Nhấn chọn từ để sửa" />
            </Box>
          )}
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, wordId: null, wordName: "" })}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >
          Xác nhận xoá
        </DialogTitle>
        <DialogContent>
            Bạn chắc chắn muốn xóa từ <strong sx={{ color: "#4b2edc" }}>{deleteDialog.wordName}</strong> không? 
            Hành động này không thể hoàn tác.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, wordId: null, wordName: "" })}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
