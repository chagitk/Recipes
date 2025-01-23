import { ChangeEvent, FormEvent, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./userReducer";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";

const UpdateUser = () => {
  const [open, setOpen] = useState(false);
  const { state: user, dispatch: userDispatch } = useContext(UserContext);
  console.log('Current User update:', user);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    userDispatch({ type: "UPDATE", data: { [id]: value } });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/api/user`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": `${user.id}`,
            "access-control-allow-origin": "*",
          },
        }
      );
      userDispatch({ type: "UPDATE", data: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: '#8c8c8c' } }}
        color="primary"
        onClick={() => setOpen(true)}
      >
        לעדכון נתונים
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "rtl"
        }} >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 2,
            width: 400,
          }}
        >
          <Typography component="label">שם פרטי:</Typography>
          <TextField
            value={user.firstName}
            onChange={handleChange}
            id="firstName"  />

          <Typography component="label">שם משפחה:</Typography>
          <TextField
            value={user.lastName}
            onChange={handleChange}
            id="lastName"  />

          <Typography component="label">כתובת מייל:</Typography>
          <TextField
            value={user.email}
            onChange={handleChange}
            id="email" />

          <Typography component="label">כתובת מגורים:</Typography>
          <TextField
            value={user.address}
            onChange={handleChange}
            id="address" />

          <Typography component="label">מספר טלפון:</Typography>
          <TextField
            value={user.phone}
            onChange={handleChange}
            id="phone"  />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ gridColumn: "span 2" ,backgroundColor: '#ff8c00', '&:hover': { backgroundColor: '#8c8c8c' }}} >
            שליחה
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
