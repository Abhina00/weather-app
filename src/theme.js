import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565c0"
    },
    secondary: {
      main: "#00acc1"
    },
    background: {
      default: "#f4f7fb"
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  }
});

export default theme;
