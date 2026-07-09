import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Divider
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function SearchHistory({ history, onSelect, onRemove, onClear }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HistoryIcon fontSize="small" color="action" />
          <Typography variant="subtitle1" fontWeight={600}>
            Search History
          </Typography>
        </Box>
        {history.length > 0 && (
          <IconButton size="small" onClick={onClear} title="Clear all">
            <ClearAllIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ my: 1 }} />

      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No searches yet. Try looking up a city above.
        </Typography>
      ) : (
        <List dense disablePadding>
          {history.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => onSelect(item.city)}
              sx={{ borderRadius: 1 }}
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.city}
                secondary={new Date(item.searchedAt).toLocaleString()}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}
