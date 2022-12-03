import {
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';

export default function TitleBar() {
    const { auth } = useContext(AuthContext);
    const [popupMenuAnchor, setPopupMenuAnchor] = useState(null);
    const [loggedInMenu, setLoggedInMenu] = useState(false);

    if(auth.loggedIn !== loggedInMenu) {
        setLoggedInMenu(auth.loggedIn);
    }

    const handleMenuOpen = (event) => {
        setPopupMenuAnchor(event.target);
    };

    const handleMenuClose = (event) => {
        setPopupMenuAnchor(null);
    };

    const handleLogout = (event) => {
        setPopupMenuAnchor(null);
        auth.logoutUser();
    }

    let menuItems = [
        <Link to={'/register'}><MenuItem onClick={handleMenuClose}>Create New Account</MenuItem></Link>,
        <Link to={'/login'}><MenuItem onClick={handleMenuClose}>Log In</MenuItem></Link>
    ];
    
    let accountIcon = <AccountCircle />;

    if(loggedInMenu) {
        menuItems = <Link to={'/'}><MenuItem onClick={handleLogout}>Logout</MenuItem></Link>
        if(auth.user !== null) {
            accountIcon = auth.user.firstName.charAt(0) + auth.user.lastName.charAt(0)
        }
    }

    return(
        <div id="title-bar">
            <Link to='/'>
                <Typography sx={{margin: '15px', fontWeight: 'bold', fontStyle: 'italic'}}>Playlister</Typography>
            </Link>
            <IconButton sx={{gridColumn: '3/4'}} size='large' onClick={handleMenuOpen}>
                {accountIcon}
            </IconButton>
            <Menu anchorEl={popupMenuAnchor} open={popupMenuAnchor !== null} onClose={handleMenuClose}>
                {menuItems}
            </Menu>
        </div>
    );
}