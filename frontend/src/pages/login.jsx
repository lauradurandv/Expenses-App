import {
  TextField,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    primary: {
      main: "#ffbd59", // orange
      contrastText: "#080357", // dark blue
    },
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          alignItems: "center",
          padding: "1em",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          textTransform: "none",
          fontFamily: '"Segoe UI"',
          borderColor: "#080357", // custom outline color
          borderWidth: "2px",
          color: "#080357",
          "&:hover": {
            borderColor: "#ffbd59", // hover color
            backgroundColor: "#ffbd59",
            color: "#ffffff",
          },
        },
      },
    },
  },
});

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmail = (e) => {
    const input = e.target.value;
    setUser((user) => ({
      ...user,
      email: input,
    }));
  };

  const handlePassword = (e) => {
    const input = e.target.value;
    setUser((user) => ({
      ...user,
      password: input,
    }));
  };

  const handleLogin = async () => {
     setLoading(true);
    try {
      const response = await loginUser(user);
      if (response.success === false) {
        setError(!error);
        setDisplayMessage(response.message);
        setLoading(false);
      }
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("user", JSON.stringify(response.user.name));
      setLoading(false);
      setIsLoggedIn(!isLoggedIn);
      setDisplayMessage("Login succesful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack component="form" spacing={2} noValidate autoComplete="off">
        <Typography>Welcome Back</Typography>
        <TextField
          id="outlined-basic"
          defaultValue={user.email}
          label="Email"
          variant="outlined"
          onChange={handleEmail}
        />
        <TextField
          id="outlined-basic"
          defaultValue={user.password}
          label="Password"
          variant="outlined"
          type="password"
          onChange={handlePassword}
        />
        {loading && <CircularProgress />}
        <Button onClick={handleLogin} variant="outlined">
          Login
        </Button>
        {error ? displayMessage : displayMessage}
      </Stack>
    </ThemeProvider>
  );
};
export default Login;
