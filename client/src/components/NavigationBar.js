import { useState, useContext } from 'react';
import {
    IconButton,
    Input,
    Menu,
    MenuItem
} from '@mui/material'

import {
    Home,
    Person,
    Groups,
    Search,
    Sort
} from '@mui/icons-material'
import AuthContext from '../auth';
import GlobalStoreContext from '../store';
import { ViewTypes } from '../store';

export default function NavigationBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [popupMenuAnchor, setPopupMenuAnchor] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleMenuOpen = (event) => {
        setPopupMenuAnchor(event.target)
    }

    const handleMenuClose = () => {
        setPopupMenuAnchor(null);
    }

    const handleHomeButton = () => {
        store.setCurrentView(ViewTypes.HOME);
        setSearchText('');
    }

    const handleAllButton = () => {
        store.setCurrentView(ViewTypes.ALL);
        setSearchText('');
    }

    const handleUserButton = () => {
        store.setCurrentView(ViewTypes.USER);
        setSearchText('');
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            store.setCurrentQuery(searchText);
        }
    }

    return (
        <div id='nav-bar' className='content-card'>
            <IconButton 
                size='large' 
                disabled={!auth.loggedIn} 
                color={store.currentView === ViewTypes.HOME ? 'primary' : ''}
                onClick={handleHomeButton}
            ><Home /></IconButton>

            <IconButton 
                size='large' 
                color={store.currentView === ViewTypes.ALL ? 'primary' : ''}
                onClick={handleAllButton}
            ><Groups /></IconButton>

            <IconButton 
                size='large' 
                color={store.currentView === ViewTypes.USER ? 'primary' : ''}
                onClick={handleUserButton}
            ><Person /></IconButton>

            <div id='search-bar'>
                <Search />
                <Input 
                    placeholder="Search" 
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyUp={handleKeyPress}
                    fullWidth 
                />
            </div>

            <IconButton size='large' onClick={handleMenuOpen}><Sort /></IconButton>
            <Menu anchorEl={popupMenuAnchor} open={popupMenuAnchor !== null} onClose={handleMenuClose}>
                <MenuItem>Name (A-Z)</MenuItem>
                <MenuItem>Publish Date (Newest-Oldest)</MenuItem>
                <MenuItem>Listens (High-Low)</MenuItem>
                <MenuItem>Likes (High-Low)</MenuItem>
                <MenuItem>Dislikes (High-Low)</MenuItem>
            </Menu>
        </div>
    )
}