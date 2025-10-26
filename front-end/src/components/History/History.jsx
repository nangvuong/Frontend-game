import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import {
  EmojiEventsOutlined,
  CloseOutlined,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import './History.css';

export default function History() {
  const [expandedRow, setExpandedRow] = useState(null);

  // Demo game history data
  const gameHistory = [
    {
      id: 1,
      date: '26/10/2025',
      time: '14:30',
      opponent: 'Tý',
      opponentAvatar: '👨',
      myScore: 450,
      opponentScore: 320,
      result: 'win',
    },
    {
      id: 2,
      date: '26/10/2025',
      time: '13:45',
      opponent: 'Tân',
      opponentAvatar: '👩',
      myScore: 380,
      opponentScore: 410,
      result: 'lose',
    },
    {
      id: 3,
      date: '25/10/2025',
      time: '16:20',
      opponent: 'Sơn',
      opponentAvatar: '🧔',
      myScore: 520,
      opponentScore: 480,
      result: 'win',
    },
    {
      id: 4,
      date: '25/10/2025',
      time: '15:00',
      opponent: 'Đức',
      opponentAvatar: '👨‍💼',
      myScore: 400,
      opponentScore: 400,
      result: 'draw',
    },
    {
      id: 5,
      date: '24/10/2025',
      time: '11:30',
      opponent: 'Hòa',
      opponentAvatar: '👨‍💼',
      myScore: 350,
      opponentScore: 390,
      result: 'lose',
    },
  ];

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'win':
        return '#10b981';
      case 'lose':
        return '#ef4444';
      case 'draw':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getResultLabel = (result) => {
    switch (result) {
      case 'win':
        return 'Thắng';
      case 'lose':
        return 'Thua';
      case 'draw':
        return 'Hoà';
      default:
        return '-';
    }
  };

  return (
    <Box className="history-container">
      {/* Header Section */}
      <Box className="history-header">
        <Container maxWidth="lg">
          <Card className="history-card-header">
            <CardContent className="history-header-content">
              <Box className="history-title-section">
                <EmojiEventsOutlined sx={{ fontSize: '2rem', color: '#4b2edc' }} />
                <Typography className="history-title">Lịch sử trận đấu</Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* History Table Section */}
      <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
        <Card className="history-table-card">
          <TableContainer>
            <Table className="history-table">
              <TableHead>
                <TableRow className="history-table-head">
                  <TableCell align="center" className="history-table-cell">
                    Ngày giờ
                  </TableCell>
                  <TableCell align="left" className="history-table-cell">
                    Đối thủ
                  </TableCell>
                  <TableCell align="center" className="history-table-cell">
                    Kết quả
                  </TableCell>
                  <TableCell align="center" className="history-table-cell">
                    Tỉ số
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gameHistory.map((game, index) => (
                  <React.Fragment key={game.id}>
                    <TableRow className="history-table-row">
                      <TableCell align="center" className="history-table-cell">
                        <Typography className="history-date-time">
                          {game.date}
                        </Typography>
                        <Typography className="history-time">
                          {game.time}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" className="history-table-cell">
                        <Box className="opponent-info">
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              fontSize: '1.5rem',
                              background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
                              border: '2px solid white',
                              boxShadow: '0 2px 8px rgba(75, 46, 220, 0.2)',
                            }}
                          >
                            {game.opponentAvatar}
                          </Avatar>
                          <Typography className="history-opponent">
                            {game.opponent}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" className="history-table-cell">
                        <Chip
                          label={getResultLabel(game.result)}
                          sx={{
                            backgroundColor: `${getResultColor(game.result)}20`,
                            color: getResultColor(game.result),
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            border: `2px solid ${getResultColor(game.result)}40`,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" className="history-table-cell">
                        <Typography className="history-score-text">
                          <span className="my-score">{game.myScore}</span>
                          <span className="vs-score"> vs </span>
                          <span className="opponent-score">{game.opponentScore}</span>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {gameHistory.length === 0 && (
          <Card className="history-empty-card">
            <Box className="history-empty">
              <Typography className="history-empty-text">
                Chưa có lịch sử trận đấu
              </Typography>
            </Box>
          </Card>
        )}
      </Container>
    </Box>
  );
}
