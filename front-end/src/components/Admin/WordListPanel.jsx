import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import "./WordListPanel.css";

export default function WordListPanel({ words, selectedWord, onSelectWord }) {
  return (
    <Box className="word-list-panel">
      <List className="word-list">
        {words.map((word, index) => (
          <ListItem
            key={word.id}
            disablePadding
            className="word-list-item"
            onClick={() => onSelectWord(word)}
            sx={{
              "&.MuiListItem-root": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <Avatar
            src={word.image}
            alt={word.word}
            className="word-item-avatar"
            onError={(e) => {
                e.target.src = "https://via.placeholder.com/56";
            }}
            >
            {word.word[0]}
            </Avatar>

            <ListItemText
              primary={word.word}
              secondary={word.image.substring(0, 50)}
              primaryTypographyProps={{
                className: "word-item-title",
              }}
              secondaryTypographyProps={{
                className: "word-item-url",
              }}
              sx={{
                margin: 0,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
