import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';

export default function MenuBar() {
    const auth = useContext(AuthContext);
    const [popupMenuAnchor, setPopupMenuAnchor] = useState(null);

    const handleMenuOpen = (event) => {
        setPopupMenuAnchor(event.target);
    };

    const handleMenuClose = (event) => {
        setPopupMenuAnchor(null);
    };

    const handleLogout = (event) => {
        setPopupMenuAnchor(null);
    }

    const menuItems = 
        [
            <Link to={'/register'}><MenuItem onClick={handleMenuClose}>Create New Account</MenuItem></Link>,
            <Link to={'/login'}><MenuItem onClick={handleMenuClose}>Log In</MenuItem></Link>
        ];

    if(auth.loggedIn)
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
            <Menu anchorEl={popupMenuAnchor} open={popupMenuAnchor !== null} onClose={handleMenuClose}>
                {menuItems}
            </Menu>
        </div>
    );
}