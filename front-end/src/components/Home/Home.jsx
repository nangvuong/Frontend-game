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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WordScrambleDisplay from './WordScrambleDisplay';
import ChallengeResponse from './ChallengeResponse';
import ChallengeSendConfirmation from './ChallengeSendConfirmation';
import { userAPI } from '../../composables/useAPI';
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

  // Fetch danh sách users khi component mount
  useEffect(() => {
    fetchOnlineUsers();
  }, []);

  const fetchOnlineUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userAPI.getUsers();
      
      if (response.success && response.data) {
        // Map data từ backend sang format frontend
        const players = response.data.map((user) => ({
          id: user.id,
          name: user.fullName || user.username,
          avatar: user.avatar || '👤',
          status: user.status, // ONLINE, IN_GAME, OFFLINE
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

  const filteredPlayers = allPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map status từ backend sang badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE':
        return 'success'; // Xanh lá
      case 'IN_GAME':
        return 'warning'; // Vàng
      case 'OFFLINE':
        return 'error'; // Đỏ
      default:
        return 'default';
    }
  };

  // Map status sang text hiển thị
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

  // Chỉ cho phép thách đấu user ONLINE
  const canChallenge = (player) => player.status === 'ONLINE';

  const handleAcceptChallenge = () => {
    console.log('Challenge accepted from:', incomingChallenge.name);
    setIncomingChallenge(null);
    navigate('/game', {
      state: {
        currentUser: user,
        opponent: incomingChallenge,
      },
    });
  };

  const handleRejectChallenge = () => {
    console.log('Challenge rejected from:', incomingChallenge.name);
    setIncomingChallenge(null);
  };

  const handleSimulateChallenge = (player) => {
    if (canChallenge(player)) {
      setSelectedPlayerForChallenge(player);
    }
  };

  const handleSendChallenge = (player) => {
    console.log('Challenge sent to:', player.name);
    setIsWaitingForResponse(true);
    // TODO: Implement challengeAPI.sendChallenge()
    setTimeout(() => {
      setIsWaitingForResponse(false);
      setSelectedPlayerForChallenge(null);
      navigate('/game', {
        state: {
          currentUser: user,
          opponent: player,
        },
      });
    }, 2000);
  };

  const handleCancelChallenge = () => {
    setSelectedPlayerForChallenge(null);
    setIsWaitingForResponse(false);
  };

  return (
    <Box className="home-container">
      {/* Left Column - Search & Players List */}
      <Box className="home-left-column">
        {/* Search Bar */}
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

        {/* Loading State */}
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

        {/* Error State */}
        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          </Box>
        )}

        {/* Players List */}
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

      {/* Right Column - Word Scramble Display or Challenge Response */}
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
    </Box>
  );
}