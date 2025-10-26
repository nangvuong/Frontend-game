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
  Avatar,
  Chip,
} from '@mui/material';
import {
  EmojiEventsOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import './Rank.css';

export default function Rank() {
  // Demo ranking data sorted by rating
  const rankingData = [
    {
      id: 1,
      rank: 1,
      name: 'Nguyễn Văn A',
      avatar: '👨',
      rating: 2500,
      wins: 150,
      losses: 45,
      status: 'online',
    },
    {
      id: 2,
      rank: 2,
      name: 'Trần Thị B',
      avatar: '👩',
      rating: 2300,
      wins: 142,
      losses: 58,
      status: 'online',
    },
    {
      id: 3,
      rank: 3,
      name: 'Đặng Thị F',
      avatar: '👨‍💼',
      rating: 2200,
      wins: 135,
      losses: 62,
      status: 'online',
    },
    {
      id: 4,
      rank: 4,
      name: 'Phạm Văn C',
      avatar: '🧔',
      rating: 2100,
      wins: 128,
      losses: 72,
      status: 'playing',
    },
    {
      id: 5,
      rank: 5,
      name: 'Vũ Văn G',
      avatar: '🧔',
      rating: 2050,
      wins: 120,
      losses: 80,
      status: 'online',
    },
    {
      id: 6,
      rank: 6,
      name: 'Lê Thị D',
      avatar: '👨‍💼',
      rating: 1950,
      wins: 115,
      losses: 90,
      status: 'online',
    },
    {
      id: 7,
      rank: 7,
      name: 'Bùi Thị H',
      avatar: '👨‍💼',
      rating: 1900,
      wins: 108,
      losses: 98,
      status: 'offline',
    },
    {
      id: 8,
      rank: 8,
      name: 'Hoàng Văn E',
      avatar: '🧔',
      rating: 1800,
      wins: 95,
      losses: 105,
      status: 'offline',
    },
    {
      id: 9,
      rank: 9,
      name: 'Cao Văn I',
      avatar: '👨‍💼',
      rating: 1750,
      wins: 85,
      losses: 115,
      status: 'offline',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'playing':
        return '#f59e0b';
      case 'offline':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'playing':
        return 'Đang chơi';
      case 'offline':
        return 'Offline';
      default:
        return '-';
    }
  };

  const getRankMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#4b2edc';
    }
  };

  const winRate = (wins, losses) => {
    const total = wins + losses;
    return total > 0 ? ((wins / total) * 100).toFixed(1) : 0;
  };

  return (
    <Box className="rank-container">
      {/* Header Section */}
      <Box className="rank-header">
        <Container maxWidth="lg">
          <Card className="rank-card-header">
            <CardContent className="rank-header-content">
              <Box className="rank-title-section">
                <EmojiEventsOutlined sx={{ fontSize: '2.5rem', color: '#FFD700' }} />
                <Box>
                  <Typography className="rank-title">Bảng xếp hạng</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Ranking Table Section */}
      <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
        <Card className="rank-table-card">
          <TableContainer>
            <Table className="rank-table">
              <TableHead>
                <TableRow className="rank-table-head">
                  <TableCell align="center" className="rank-table-cell">
                    Hạng
                  </TableCell>
                  <TableCell align="left" className="rank-table-cell">
                    Người chơi
                  </TableCell>
                  <TableCell align="center" className="rank-table-cell">
                    Rating
                  </TableCell>
                  <TableCell align="center" className="rank-table-cell">
                    Thắng
                  </TableCell>
                  <TableCell align="center" className="rank-table-cell">
                    Thua
                  </TableCell>
                  <TableCell align="center" className="rank-table-cell">
                    Win Rate
                  </TableCell>
                  <TableCell align="center" className="rank-table-cell">
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankingData.map((player) => (
                  <TableRow key={player.id} className="rank-table-row">
                    <TableCell align="center" className="rank-table-cell">
                      <Box className="rank-badge">
                        <Typography
                          className="rank-number"
                          sx={{ color: getRankMedalColor(player.rank) }}
                        >
                          #{player.rank}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left" className="rank-table-cell">
                      <Box className="player-info">
                        <Avatar
                          sx={{
                            width: 44,
                            height: 44,
                            fontSize: '1.6rem',
                            background: 'linear-gradient(135deg, #4b2edc 0%, #6a4cf3 100%)',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(75, 46, 220, 0.2)',
                          }}
                        >
                          {player.avatar}
                        </Avatar>
                        <Typography className="player-name">{player.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" className="rank-table-cell">
                      <Typography className="rating-value">
                        {player.rating}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className="rank-table-cell">
                      <Typography className="stat-wins">{player.wins}</Typography>
                    </TableCell>
                    <TableCell align="center" className="rank-table-cell">
                      <Typography className="stat-losses">{player.losses}</Typography>
                    </TableCell>
                    <TableCell align="center" className="rank-table-cell">
                      <Typography className="win-rate">
                        {winRate(player.wins, player.losses)}%
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className="rank-table-cell">
                      <Chip
                        label={getStatusLabel(player.status)}
                        size="small"
                        sx={{
                          backgroundColor: `${getStatusColor(player.status)}20`,
                          color: getStatusColor(player.status),
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          border: `1.5px solid ${getStatusColor(player.status)}40`,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  );
}
