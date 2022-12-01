import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MenuBar() {
    let [menuAnchor, setMenuAnchor] = useState(null);
    let [loggedIn, setLoggedIn] = useState(false);

    let handleMenuOpen = (event) => {
        setMenuAnchor(event.target);
    };

    let handleMenuClose = (event) => {
        setMenuAnchor(null);
    };

    let handleLogout = (event) => {
        setMenuAnchor(null);
    }

    let menuItems = 
        [
            <Link to={'/register'}><MenuItem onClick={handleMenuClose}>Create New Account</MenuItem></Link>,
            <Link to={'/login'}><MenuItem onClick={handleMenuClose}>Login</MenuItem></Link>
        ];

    if(loggedIn)
    {
        menuItems = <Link to={'/'}><MenuItem onClick={handleLogout}>Logout</MenuItem></Link>;
    }

    return(
        <div id="menu-bar">
            <Link to='/'>
                <Typography sx={{margin: '15px', fontWeight: 'bold', fontStyle: 'italic'}}>Playlister</Typography>
            </Link>
            <IconButton sx={{gridColumn: '3/4'}} size='large' onClick={handleMenuOpen}>
                <AccountCircle />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={menuAnchor !== null} onClose={handleMenuClose}>
                {menuItems}
            </Menu>
        </div>
    );
}