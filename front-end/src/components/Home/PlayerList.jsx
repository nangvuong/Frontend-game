import {
  Box,
  List,
  ListItemAvatar,
  ListItem,
  Badge,
  Avatar,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function PlayerList({ players, loading, error, onPlayerClick, onErrorClose }) {
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

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error" onClose={onErrorClose}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (players.length === 0) {
    return (
      <Box className="no-results">
        <span>😕 Không tìm thấy người chơi nào</span>
      </Box>
    );
  }

  return (
    <Box className="players-list-container">
      <List className="players-list">
        {players.map((player) => (
          <ListItem
            key={player.id}
            className={`player-list-item ${!canChallenge(player) ? 'player-disabled' : ''}`}
            onClick={() => onPlayerClick(player)}
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
  );
}