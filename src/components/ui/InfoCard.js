import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const InfoCard = ({ count, title, Icon, color }) => {
  return (
    <Card sx={{ minWidth: 200, textAlign: 'center', padding: 1, margin: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={1}>
          <Icon size={30} color={color} />
        </Box>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
