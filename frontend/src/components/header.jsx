import {
  AppBar,
  Box,
  Toolbar,
  Button,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styling from "./header.module.css";
const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    primary: {
      main: "#4bb966", // green
      contrastText: "#080357", // dark blue
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          textTransform: "none",
          fontFamily: '"Segoe UI"',
          borderColor: "#080357", // custom outline color
          borderWidth: "2px",
          color: "#080357",
          "&:hover": {
            borderColor: "#080357", // hover color
            backgroundColor: "#080357",
            color: "#ffffff",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          justifyContent: "space-between",
        },
      },
    },
  },
});
const Header = ({ isLoggedIn, handleLogout }) => {
  if (isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <NavLink className={styling.link} to="/">
              <img className={styling.logo} src={logo} />
            </NavLink>
            <Toolbar>
              <Button onClick={handleLogout} variant="outlined">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <NavLink className={styling.link} to="/">
              <img className={styling.logo} src={logo} />
            </NavLink>
            <Toolbar>
              <Button style={{ margin: "5px" }} variant="outlined">
                <NavLink to="/register" className={styling.link}>
                  Register
                </NavLink>
              </Button>
              <Button variant="outlined">
                <NavLink to="/login" className={styling.link}>
                  Login
                </NavLink>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    );
  }
};
export default Header;
