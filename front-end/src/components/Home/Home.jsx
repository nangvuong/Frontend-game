import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItemAvatar, ListItem, Badge, Avatar, ListItemText, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WordScrambleDisplay from './WordScrambleDisplay';
import ChallengeResponse from './ChallengeResponse';
import ChallengeSendConfirmation from './ChallengeSendConfirmation';
import './Home.css';

export default function Home({ user }) {
  const navigate = useNavigate();
  const allPlayers = [
    { id: 1, name: 'Nguyễn Văn A', avatar: '👨', status: 'online', rating: 2500 },
    { id: 2, name: 'Trần Thị B', avatar: '👩', status: 'online', rating: 2300 },
    { id: 3, name: 'Phạm Văn C', avatar: '🧔', status: 'playing', rating: 2100 },
    { id: 4, name: 'Lê Thị D', avatar: '👨‍💼', status: 'online', rating: 1950 },
    { id: 5, name: 'Hoàng Văn E', avatar: '🧔', status: 'offline', rating: 1800 },
    { id: 6, name: 'Đặng Thị F', avatar: '👨‍💼', status: 'online', rating: 2200 },
    { id: 7, name: 'Vũ Văn G', avatar: '🧔', status: 'playing', rating: 2050 },
    { id: 8, name: 'Bùi Thị H', avatar: '👨‍💼', status: 'online', rating: 1900 },
    { id: 9, name: 'Cao Văn I', avatar: '👨‍💼', status: 'offline', rating: 1750 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [incomingChallenge, setIncomingChallenge] = useState({ id: 9, name: 'Cao Văn I', avatar: '👨‍💼', status: 'offline', rating: 1750 });
  const [selectedPlayerForChallenge, setSelectedPlayerForChallenge] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const filteredPlayers = allPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAcceptChallenge = () => {
    console.log('Challenge accepted from:', incomingChallenge.name);
    setIncomingChallenge(null);
    // Navigate to game page with user and opponent info
    navigate('/game', {
      state: {
        currentUser: user,
        opponent: incomingChallenge
      }
    });
  };

  const handleRejectChallenge = () => {
    console.log('Challenge rejected from:', incomingChallenge.name);
    setIncomingChallenge(null);
  };

  // When player is clicked, select them for challenge
  const handleSimulateChallenge = (player) => {
    setSelectedPlayerForChallenge(player);
  };

  // Send challenge and wait for response
  const handleSendChallenge = (player) => {
    console.log('Challenge sent to:', player.name);
    setIsWaitingForResponse(true);
    // TODO: Send to backend via API/WebSocket
    // Simulate response after 2 seconds then navigate to game
    setTimeout(() => {
      setIsWaitingForResponse(false);
      setSelectedPlayerForChallenge(null);
      // Navigate to game page with user and opponent info
      navigate('/game', {
        state: {
          currentUser: user,
          opponent: player
        }
      });
    }, 2000);
  };

  // Cancel challenge
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

        {/* Players List */}
        {filteredPlayers.length > 0 ? (
          <Box className="players-list-container">
            <List className="players-list">
              {filteredPlayers.map((player) => (
                <ListItem
                  key={player.id}
                  className={`player-list-item ${player.status !== 'online' ? 'player-disabled' : ''}`}
                  onClick={() => player.status === 'online' && handleSimulateChallenge(player)}
                  sx={{ cursor: player.status === 'online' ? 'pointer' : 'not-allowed' }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color={
                        player.status === 'online'
                          ? 'success'
                          : player.status === 'playing'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      <Avatar className="player-avatar">{player.avatar}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={player.name} secondary={player.rating} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box className="no-results">
            <span>😕 Không tìm thấy người chơi nào</span>
          </Box>
        )}
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