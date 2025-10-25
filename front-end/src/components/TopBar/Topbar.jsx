import { Box, Button, Typography } from "@mui/material";
import { FaGamepad } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./TopBar.css";

export default function TopBar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout(false);
    }
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box className="topbar-container">
      {/* Logo - Bên trái */}
      <Box className="topbar-logo">
        <FaGamepad size={28} color="#4b2edc" />
        <Typography className="topbar-title">Word Scramble</Typography>
      </Box>

      {/* Navigation - Giữa */}
      <Box className="topbar-nav-center">
        <Link to="/" className={`topbar-nav-link ${isActive("/") ? "active" : ""}`}>
          <HomeIcon sx={{ fontSize: 20 }} />
          <span>Home</span>
        </Link>
        <Link to="/profile" className={`topbar-nav-link ${isActive("/profile") ? "active" : ""}`}>
          <PersonIcon sx={{ fontSize: 20 }} />
          <span>Profile</span>
        </Link>
        <Link to="/history" className={`topbar-nav-link ${isActive("/history") ? "active" : ""}`}>
          <HistoryIcon sx={{ fontSize: 20 }} />
          <span>History</span>
        </Link>
        <Link to="/rank" className={`topbar-nav-link ${isActive("/rank") ? "active" : ""}`}>
          <EmojiEventsIcon sx={{ fontSize: 20 }} />
          <span>Rank</span>
        </Link>
      </Box>

      {/* Logout Button - Bên phải */}
      <Button
        className="topbar-logout-btn"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </Box>
  );
}
