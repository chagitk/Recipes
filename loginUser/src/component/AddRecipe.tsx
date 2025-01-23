
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userReducer';

export default function AddRecipe() {
  const { state: user } = useContext(UserContext);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(()=>{
    if (!user.id) {      
        alert("please login");
        navigate('/');
      }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!user.id) {
    //   alert("please login")
    //   console.log("Current User:", user);
    //   return;
    // }
    //TODO: add here check if user did login else alert("please login")
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    postRecipe(formJson);
    handleClose();  
  }

  const postRecipe = (data: any) => {
    axios.post('http://localhost:3000/api/recipes/add', data).then((res)=>{
      console.log(res)
      //TODO: recipe dispach 

    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            handleSubmit(event);
          },
        }}
      >
          <DialogTitle>הוסף מתכון</DialogTitle>
          <DialogContent>
            <DialogContentText>
             הזן את פרטי המתכון:
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="שם מתכון"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="products"
              name="products"
              label="תאור"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="פרטים נוספים"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ביטול</Button>
            <Button type="submit">הוסף</Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}