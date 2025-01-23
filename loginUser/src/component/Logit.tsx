import { useContext, useRef, useState } from "react";
import { UserContext } from "./userReducer";
import "./styles/loginStyle.css"
import { Button, Box, TextField, Typography, Modal } from "@mui/material";

const Login = () => {
    const { dispatch: userDispatch } = useContext(UserContext)
    const [isLogin, setIsLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        const url = isLogin ? 'http://localhost:3000/api/user/login' : 'http://localhost:3000/api/user/register';
        try {
            console.log(url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*',
                },
                body: JSON.stringify({
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }),
            });
            if (response.status === 401) {
                alert('משתמש לא מוכר נסה להרשם')
            }
            else if (!response.ok) {
                throw new Error(`fetch error ${response.status}`)
            }
            else {
                if (isSignUp) {
                    const { userId } = await response.json();
                    userDispatch({
                        type: "SIGNUP", data: {
                            id: userId,
                            email: emailRef.current?.value || '',
                            password: passwordRef.current?.value || ''
                        }
                    })
                }
                else if (isLogin) {
                    const { user } = await response.json();
                    console.log("user dispatch", user);
                    
                    userDispatch({
                        type: "LOGIN", data: user
                    })
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
            isLogin && setIsLogin(false);
            isSignUp && setIsSignUp(false);
        }
    };

    return (
        <div className="x">
            <button style={{ margin: '10px' }} onClick={() => setIsLogin(true)}>כניסה</button>
            <button onClick={() => setIsSignUp(true)}>הרשמה</button>
            {(isLogin || isSignUp) &&
        <Modal
        open={isLogin || isSignUp}
        onClose={() => {
          setIsLogin(false);
          setIsSignUp(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            direction: "rtl"
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            {isLogin ? "כניסה למערכת" : "הרשמה"}
          </Typography>
          <TextField
            label="כתובת מייל"
            type="email"
            fullWidth
            margin="normal"
            inputRef={emailRef}
          />
          <TextField
            label="סיסמה"
            type="password"
            fullWidth
            margin="normal"
            inputRef={passwordRef}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{backgroundColor: '#ff8c00'}} >
              שליחה
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsLogin(false);
                setIsSignUp(false);
              }}
            >
              מחיקה
            </Button>
          </Box>
        </Box>
      </Modal>}
        </div>
    );
};

export default Login;