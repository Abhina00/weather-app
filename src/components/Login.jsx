import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Tabs,
  Tab,
  InputAdornment,
  IconButton
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(0); // 0 = login, 1 = register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const result =
      mode === 0 ? login(username.trim(), password) : register(username.trim(), password);

    if (!result.ok) setError(result.error);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1565c0 0%, #00acc1 100%)",
        p: 2
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
          <WbSunnyIcon color="warning" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h5" fontWeight={600}>
            Weather App
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Sign in to search cities and save your history
        </Typography>

        <Tabs
          value={mode}
          onChange={(_, v) => {
            setMode(v);
            setError("");
          }}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            {mode === 0 ? "Login" : "Create account"}
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          Demo auth only — accounts are stored in your browser's local storage,
          not a real server.
        </Typography>
      </Paper>
    </Box>
  );
}
