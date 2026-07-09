import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Alert
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { fetchWeatherByCity, WeatherApiError } from "../services/weatherApi";
import { getItem, setItem } from "../utils/storage";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import SearchHistory from "./SearchHistory";

const MAX_HISTORY = 10;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const historyKey = `weather_app_history_${user.username}`;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => getItem(historyKey, []));

  useEffect(() => {
    setItem(historyKey, history);
  }, [history, historyKey]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      setHistory((prev) => {
        const withoutDupe = prev.filter(
          (h) => h.city.toLowerCase() !== data.city.toLowerCase()
        );
        const next = [
          { id: crypto.randomUUID(), city: data.city, searchedAt: data.fetchedAt },
          ...withoutDupe
        ];
        return next.slice(0, MAX_HISTORY);
      });
    } catch (err) {
      setWeather(null);
      setError(err instanceof WeatherApiError ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => setHistory((prev) => prev.filter((h) => h.id !== id));
  const handleClear = () => setHistory([]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <WbSunnyIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Hi, {user.username}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <WeatherCard weather={weather} />

        <SearchHistory
          history={history}
          onSelect={handleSearch}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </Container>
    </Box>
  );
}
