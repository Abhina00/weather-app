import React from "react";
import { Card, CardContent, Typography, Box, Grid, Chip, Avatar } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;

  return (
    <Card elevation={4} sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {weather.city}
              {weather.country ? `, ${weather.country}` : ""}
            </Typography>
            <Chip
              label={weather.description}
              size="small"
              sx={{ mt: 1, textTransform: "capitalize" }}
              color="primary"
              variant="outlined"
            />
          </Box>
          {iconUrl && (
            <Avatar src={iconUrl} alt={weather.description} sx={{ width: 72, height: 72 }} />
          )}
        </Box>

        <Typography variant="h2" fontWeight={300} sx={{ mt: 1 }}>
          {Math.round(weather.temp)}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Feels like {Math.round(weather.feelsLike)}°C · H: {Math.round(weather.tempMax)}° L:{" "}
          {Math.round(weather.tempMin)}°
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WaterDropIcon fontSize="small" color="action" />
              <Typography variant="body2">{weather.humidity}% humidity</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AirIcon fontSize="small" color="action" />
              <Typography variant="body2">{weather.windSpeed} m/s wind</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CompressIcon fontSize="small" color="action" />
              <Typography variant="body2">{weather.pressure} hPa</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThermostatIcon fontSize="small" color="action" />
              <Typography variant="body2">Feels {Math.round(weather.feelsLike)}°C</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
