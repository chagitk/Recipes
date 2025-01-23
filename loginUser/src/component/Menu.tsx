import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open); // פותח או סוגר את התפריט
    };

    const list = () => (
        <Box 
            sx={{ width: 250, direction: "rtl" }}
            role="presentation"
            onClick={toggleDrawer} // סוגר את התפריט כשעושים קליק
        >
            <List>
                {[{ text: 'כל המתכונים', onClick: () => navigate("/recipes"), icon: <FoodBankIcon /> }, 
                  { text: 'הוסף מתכון', onClick: () => navigate("/add"), icon: <AddCircleIcon/> }]
                  .map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton sx={{gap:'70px'}} onClick={item.onClick}>
                        <ListItemText primary={item.text} />
                            <ListItemIcon>{item.icon}</ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer} sx={{color:'black' ,backgroundColor: 'grey' ,'&:hover': { backgroundColor: '#ff8c00' } }}>תפריט <MenuIcon/></Button> {/* הכפתור שפותח את התפריט */}
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer} // סוגר את התפריט כשעושים קליק מחוץ לתפריט
            >
                {list()}
            </Drawer>
        </div>
    );
}
