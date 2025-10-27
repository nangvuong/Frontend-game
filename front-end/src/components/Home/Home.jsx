import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItemAvatar,
  ListItem,
  Badge,
  Avatar,
  ListItemText,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WordScrambleDisplay from './WordScrambleDisplay';
import ChallengeResponse from './ChallengeResponse';
import ChallengeSendConfirmation from './ChallengeSendConfirmation';
import { userAPI, challengeAPI } from '../../composables/useAPI';
import { useWebSocket } from '../../composables/useWebSocket';
import './Home.css';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [incomingChallenge, setIncomingChallenge] = useState(null);
  const [selectedPlayerForChallenge, setSelectedPlayerForChallenge] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [sentChallengeId, setSentChallengeId] = useState(null); // ⚠️ THÊM state lưu challengeId
  const [notification, setNotification] = useState({ open: false, message: '' });

  const { connect, disconnect, subscribe, unsubscribe } = useWebSocket();

  // Fetch danh sách users khi component mount
  useEffect(() => {
    fetchOnlineUsers();
    
    // Kết nối WebSocket
    connect(() => {
      
      // Subscribe topic thay đổi status user
      subscribe('/topic/users/status', handleUserStatusChange);
      
      // Subscribe queue nhận thách đấu (chỉ user này)
      if (user?.id) {
        subscribe(`/queue/challenges/${user.id}`, handleChallengeNotification);
      }
    });

    return () => {
      // Cleanup khi unmount
      unsubscribe('/topic/users/status');
      if (user?.id) {
        unsubscribe(`/queue/challenges/${user.id}`);
      }
      disconnect();
    };
  }, [user?.id]);

  const fetchOnlineUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userAPI.getUsers();
      
      if (response.success && response.data) {
        const players = response.data.map((user) => ({
          id: user.id,
          name: user.fullName || user.username,
          avatar: user.avatar || '👤',
          status: user.status,
          rating: user.totalScore || 0,
          username: user.username,
        }));
        
        setAllPlayers(players);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Không thể tải danh sách người chơi');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi status từ WebSocket
  const handleUserStatusChange = (message) => {
    
    if (message.type === 'USER_STATUS_CHANGED') {
      const { userId, status, username } = message;
      
      // Update status trong danh sách players
      setAllPlayers((prev) =>
        prev.map((player) =>
          player.id === userId
            ? { ...player, status }
            : player
        )
      );
    }
  };

  // Xử lý nhận thách đấu từ WebSocket
  const handleChallengeNotification = (message) => {
    
    switch (message.type) {
      case 'NEW_CHALLENGE':
        // Nhận thách đấu mới
        const challengeData = message.data;
        setIncomingChallenge({
          id: challengeData.id,
          name: challengeData.challenger.fullName || challengeData.challenger.username,
          avatar: challengeData.challenger.avatar || '👤',
          rating: challengeData.challenger.totalScore || 0,
          username: challengeData.challenger.username,
          message: challengeData.message,
        });
        setNotification({
          open: true,
          message: message.message,
        });
        break;

      case 'CHALLENGE_ACCEPTED':
        // Đối thủ chấp nhận thách đấu
        setIsWaitingForResponse(false);
        setSentChallengeId(null); //  Reset challengeId
        setNotification({
          open: true,
          message: message.message,
        });
        
        // TODO: Navigate to game
        setTimeout(() => {
          navigate('/game', {
            state: {
              currentUser: user,
              opponent: selectedPlayerForChallenge,
              challengeId: message.data.id,
            },
          });
        }, 1500);
        break;

      case 'CHALLENGE_REJECTED':
        // Đối thủ từ chối thách đấu
        setIsWaitingForResponse(false);
        setSelectedPlayerForChallenge(null);
        setSentChallengeId(null); //  Reset challengeId
        setNotification({
          open: true,
          message: message.message,
        });
        break;

      case 'CHALLENGE_CANCELLED':
        // Người thách đấu hủy
        setIncomingChallenge(null);
        setNotification({
          open: true,
          message: message.message,
        });
        break;
    }
  };

  const filteredPlayers = allPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE':
        return 'success';
      case 'IN_GAME':
        return 'warning';
      case 'OFFLINE':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ONLINE':
        return 'Trực tuyến';
      case 'IN_GAME':
        return 'Đang chơi';
      case 'OFFLINE':
        return 'Ngoại tuyến';
      default:
        return 'Không rõ';
    }
  };

  const canChallenge = (player) => player.status === 'ONLINE';

  const handleAcceptChallenge = async () => {
    try {
      const response = await challengeAPI.acceptChallenge(incomingChallenge.id);
      
      setIncomingChallenge(null);
      
      // Navigate to game sẽ được xử lý bởi WebSocket notification
    } catch (err) {
      console.error('Error accepting challenge:', err);
      setNotification({
        open: true,
        message: 'Lỗi khi chấp nhận thách đấu',
      });
    }
  };

  const handleRejectChallenge = async () => {
    try {
      await challengeAPI.rejectChallenge(incomingChallenge.id);
      
      setIncomingChallenge(null);
      setNotification({
        open: true,
        message: 'Đã từ chối thách đấu',
      });
    } catch (err) {
      console.error('Error rejecting challenge:', err);
    }
  };

  const handleSimulateChallenge = (player) => {
    if (canChallenge(player)) {
      setSelectedPlayerForChallenge(player);
    }
  };

  const handleSendChallenge = async (player) => {
    try {
      setIsWaitingForResponse(true);
      
      const response = await challengeAPI.sendChallenge(
        player.id,
        'Chào bạn! Mình muốn thách đấu với bạn!'
      );
      
      
      // ⚠️ LƯU CHALLENGE ID ĐỂ HỦY SAU NÀY
      if (response.success && response.data?.id) {
        setSentChallengeId(response.data.id);
      }
      
      setNotification({
        open: true,
        message: `Đã gửi lời thách đấu đến ${player.name}`,
      });
      
      // Đợi response từ WebSocket
    } catch (err) {
      console.error('❌ Error sending challenge:', err);
      setIsWaitingForResponse(false);
      setNotification({
        open: true,
        message: err.message || 'Gửi thách đấu thất bại',
      });
    }
  };

  // ⚠️ HANDLE CANCEL CHALLENGE
  const handleCancelChallenge = async () => {
    try {
      // Nếu đang chờ phản hồi và có challengeId
      if (isWaitingForResponse && sentChallengeId) {
        
        const response = await challengeAPI.cancelChallenge(sentChallengeId);
        
        
        setNotification({
          open: true,
          message: 'Đã hủy thách đấu',
        });
      }
    } catch (err) {
      console.error('❌ Error cancelling challenge:', err);
      setNotification({
        open: true,
        message: err.message || 'Không thể hủy thách đấu',
      });
    } finally {
      // Reset state
      setSelectedPlayerForChallenge(null);
      setIsWaitingForResponse(false);
      setSentChallengeId(null);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
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
                  <SearchIcon sx={{ color: '#4b2edc', fontSize: '1.3rem' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                background: 'white',
                height: '48px',
                fontSize: '1rem',
                '&:hover fieldset': {
                  borderColor: '#4b2edc !important',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4b2edc !important',
                  borderWidth: '2px',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '12px 12px',
              },
            }}
          />
        </Box>

        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <CircularProgress sx={{ color: '#4b2edc' }} />
          </Box>
        )}

        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          </Box>
        )}

        {!loading && !error && filteredPlayers.length > 0 ? (
          <Box className="players-list-container">
            <List className="players-list">
              {filteredPlayers.map((player) => (
                <ListItem
                  key={player.id}
                  className={`player-list-item ${
                    !canChallenge(player) ? 'player-disabled' : ''
                  }`}
                  onClick={() => handleSimulateChallenge(player)}
                  sx={{
                    cursor: canChallenge(player) ? 'pointer' : 'not-allowed',
                    opacity: canChallenge(player) ? 1 : 0.6,
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color={getStatusColor(player.status)}
                    >
                      <Avatar className="player-avatar">{player.avatar}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.name}
                    secondary={
                      <Box>
                        <Box>Rating: {player.rating}</Box>
                        <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                          {getStatusText(player.status)}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : !loading && !error ? (
          <Box className="no-results">
            <span>😕 Không tìm thấy người chơi nào</span>
          </Box>
        ) : null}
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

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notification.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Box>
  );
}