import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../utils/api";
import { useNavigate } from "react-router";
import { ERROR_TYPE } from "../../utils/constant.js";
import Toast from "../../utils/toast";
import { useUser } from "../../context/userContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const { saveToken } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    api
      .post("/api/v1/auth/login", Object.freeze({ email, password }))
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (!data.success) {
          return;
        }
        const { token } = data.data;
        saveToken(token);
        setErrorMessage([]);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err.response.data.data);
        //handle validation error
        if (
          err?.response?.data?.data?.errorType == ERROR_TYPE.VALIDATION_ERROR
        ) {
          const errorObject = err?.response?.data?.data?.error;
          const errorMessages = [];
          for (const key in errorObject) {
            errorMessages.push(errorObject[key][0]);
          }
          setErrorMessage(errorMessages);
        } else {
          Toast.error("Something Went Wrong");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 4,
          width: "100%",
          borderRadius: "8px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 5,
            fontWeight: "bold",
            color: "var(--primaryColor)",
          }}
        >
          <div style={{ display: "flex" }}>
            {/* <a href="/">
              <span>
                <img
                  src={Logo}
                  alt="LOGO"
                  style={{ width: "60px", height: "60px" }}
                />
              </span>
            </a> */}
            <span>Please Login To Continue</span>
          </div>
        </Typography>
        {errorMessage.length ? (
          <Box
            sx={{
              backgroundColor: "#ffeaea",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            {errorMessage.map((msg, i) => (
              <p
                key={i}
                style={{
                  color: "red",
                  marginBottom: "5px",
                  fontSize: "14px",
                }}
              >
                {msg}
              </p>
            ))}
          </Box>
        ) : (
          ""
        )}
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <div>
            <InputLabel className="base-input-label" htmlFor="login-email">
              Email<span className="is-required">*</span>
            </InputLabel>
            <TextField
              type="email"
              id="login-email"
              variant="outlined"
              className="base-input"
              placeholder="john@hotmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div id="login-password-wrap">
            <InputLabel className="base-input-label" htmlFor="login-pwd">
              Password<span className="is-required">*</span>
            </InputLabel>
            <TextField
              type={showPassword ? "text" : "password"}
              id="login-pwd"
              variant="outlined"
              className="base-input"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityIcon
                className="eye-position"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <VisibilityOff
                className="eye-position"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            onClick={(e) => {
              handleLogin(e);
            }}
            size="large"
            disabled={isSubmitting}
          >
            Login
          </Button>

          {/* <div style={{ textAlign: "left" }}>
            <a href="#" className="clr-text" onClick={() => setOpen(true)}>
              Forgot Password ?
            </a>
          </div> */}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
