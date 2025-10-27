import { useState, useMemo } from "react";
import { Box, TextField, InputAdornment, Snackbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WordScrambleDisplay from "./WordScrambleDisplay";
import ChallengeResponse from "./ChallengeResponse";
import ChallengeSendConfirmation from "./ChallengeSendConfirmation";
import ReadyPopup from "./ReadyPopup";
import PlayerList from "./PlayerList";
import { matchAPI } from "../../composables/useAPI";

// Custom hooks
import { useUserStatus } from "./hooks/useUserStatus";
import { useChallengeWebSocket } from "./hooks/useChallengeWebSocket";
import { useMatchWebSocket } from "./hooks/useMatchWebSocket";
import { useChallengeActions } from "./hooks/useChallengeActions";

import "./Home.css";

export default function Home({ user }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hooks
  const { allPlayers, loading, error, setError } = useUserStatus();
  const {
    incomingChallenge,
    setIncomingChallenge,
    notification: challengeNotification,
    setNotification: setChallengeNotification,
  } = useChallengeWebSocket(user);
  const {
    showReadyPopup,
    currentMatch,
    isReady,
    setIsReady,
    opponentReady,
    opponentInfo,
    setShowReadyPopup,
    setCurrentMatch,
    setOpponentInfo,
    notification: matchNotification,
    setNotification: setMatchNotification,
    startCancelling, // ⭐ THÊM
    finishCancelling, // ⭐ THÊM
  } = useMatchWebSocket(user);
  const {
    selectedPlayerForChallenge,
    setSelectedPlayerForChallenge,
    isWaitingForResponse,
    sendChallenge,
    cancelChallenge,
    acceptChallenge,
    rejectChallenge,
  } = useChallengeActions();

  // Merge notifications
  const notification = challengeNotification.open
    ? challengeNotification
    : matchNotification;

  // Filter players
  const filteredPlayers = useMemo(
    () =>
      allPlayers.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [allPlayers, searchTerm]
  );

  // Handlers
  const handlePlayerClick = (player) => {
    if (player.status === "ONLINE") {
      setSelectedPlayerForChallenge(player);
    }
  };

  const handleSendChallenge = (player) => {
    sendChallenge(
      player,
      (message) => setChallengeNotification({ open: true, message }),
      (message) => setChallengeNotification({ open: true, message })
    );
  };

  const handleCancelChallenge = () => {
    cancelChallenge(
      (message) => setChallengeNotification({ open: true, message }),
      (message) => setChallengeNotification({ open: true, message })
    );
  };

  const handleAcceptChallenge = () => {
    acceptChallenge(
      incomingChallenge.id,
      () => setIncomingChallenge(null),
      (message) => setChallengeNotification({ open: true, message })
    );
  };

  const handleRejectChallenge = () => {
    rejectChallenge(incomingChallenge.id, (message) => {
      setIncomingChallenge(null);
      setChallengeNotification({ open: true, message });
    });
  };

  const handleReady = async () => {
    try {
      const response = await matchAPI.readyMatch(currentMatch.id);
      setIsReady(true);

      if (response.data.status === "IN_PROGRESS") {
        console.log("🎮 Both players ready! Starting game...");
      }
    } catch (err) {
      console.error("❌ Error setting ready:", err);
      setMatchNotification({
        open: true,
        message: err.message || "Lỗi khi ready",
      });
    }
  };

  // ⭐ FIX: HANDLE CANCEL MATCH VỚI FLAG
  const handleCancelMatch = async () => {
    try {
      console.log("🚫 Cancelling match:", currentMatch.id);

      // ⭐ BẬT FLAG ĐỂ NGĂN WEBSOCKET XỬ LÝ
      startCancelling();

      // Đóng popup ngay lập tức
      setShowReadyPopup(false);

      // Gọi API cancel
      const response = await matchAPI.cancelMatch(currentMatch.id);
      console.log("✅ Match cancelled:", response);

      // Reset các state
      setCurrentMatch(null);
      setIsReady(false);
      setOpponentInfo(null);

      setMatchNotification({
        open: true,
        message: "Đã hủy trận đấu",
      });
    } catch (err) {
      console.error("❌ Error cancelling match:", err);

      // Nếu lỗi, mở lại popup
      setShowReadyPopup(true);

      setMatchNotification({
        open: true,
        message: err.message || "Không thể hủy trận đấu",
      });
    } finally {
      // ⭐ TẮT FLAG SAU KHI HOÀN TẤT (dù thành công hay thất bại)
      setTimeout(() => {
        finishCancelling();
      }, 500); // Delay 500ms để đảm bảo WebSocket message đã đến
    }
  };

  return (
    <Box className="home-container">
      {/* Left Column - Search & Players List */}
      <Box className="home-left-column">
        <Box className="search-wrapper">
          <TextField
            fullWidth
            placeholder="Tìm kiếm người chơi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
            className="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#4b2edc", fontSize: "1.3rem" }} />
                </InputAdornment>
              ),
            }}
            sx={{
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
        </Box>

        <PlayerList
          players={filteredPlayers}
          loading={loading}
          error={error}
          onPlayerClick={handlePlayerClick}
          onErrorClose={() => setError("")}
        />
      </Box>

      {/* Right Column */}
      <Box className="home-right-column">
        {incomingChallenge ? (
          <ChallengeResponse
            challenge={incomingChallenge}
            onAccept={handleAcceptChallenge}
            onReject={handleRejectChallenge}
          />
        ) : selectedPlayerForChallenge ? (
          <ChallengeSendConfirmation
            player={selectedPlayerForChallenge}
            isWaiting={isWaitingForResponse}
            onConfirm={handleSendChallenge}
            onCancel={handleCancelChallenge}
          />
        ) : (
          <WordScrambleDisplay />
        )}
      </Box>

      {/* Ready Popup */}
      <ReadyPopup
        open={showReadyPopup}
        matchData={currentMatch}
        currentUser={user}
        opponent={opponentInfo}
        onReady={handleReady}
        onCancel={handleCancelMatch}
        isReady={isReady}
        opponentReady={opponentReady}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => {
          setChallengeNotification({ open: false, message: "" });
          setMatchNotification({ open: false, message: "" });
        }}
        message={notification.message}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
}