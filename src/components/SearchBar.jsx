import React, { useState } from "react";
import { Paper, InputBase, IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = value.trim();
    if (city) onSearch(city);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        p: "4px 8px",
        display: "flex",
        alignItems: "center",
        width: "100%"
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a city (e.g. London, Tokyo, Mumbai)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ "aria-label": "search city" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} disabled={loading || !value.trim()}>
        {loading ? <CircularProgress size={22} /> : <SearchIcon />}
      </IconButton>
    </Paper>
  );
}
