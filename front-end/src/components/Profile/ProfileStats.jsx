import { Container, Card, CardContent, Typography, Stack } from '@mui/material';
import {
  EmojiEventsOutlined,
  HandshakeOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';

export default function ProfileStats({ userData, winRate }) {
  const stats = [
    {
      icon: <HandshakeOutlined sx={{ fontSize: '2rem', color: '#4b2edc' }} />,
      value: userData.totalMatches || 0,
      label: 'Tổng trận',
    },
    {
      icon: <EmojiEventsOutlined sx={{ fontSize: '2rem', color: '#10b981' }} />,
      value: userData.totalWins || 0,
      label: 'Chiến thắng',
    },
    {
      icon: <TrendingUpOutlined sx={{ fontSize: '2rem', color: '#059669' }} />,
      value: `${winRate}%`,
      label: 'Tỷ lệ thắng',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
      <Stack
        direction="row"
        spacing={2}
        className="stats-grid"
        sx={{ justifyContent: 'space-between' }}
      >
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card" sx={{ flex: 1 }}>
            <CardContent className="stat-content">
              {stat.icon}
              <Typography className="stat-value">{stat.value}</Typography>
              <Typography className="stat-label">{stat.label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}