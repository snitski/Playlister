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
import { PlaylistViews } from '../store';

export default function NavigationBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [popupMenuAnchor, setPopupMenuAnchor] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleMenuOpen = (event) => {
        setPopupMenuAnchor(event.target)
    }

    const handleMenuClose = (event) => {
        setPopupMenuAnchor(null);
    }

    const handleHomeButton = (event) => {
        store.setCurrentPlaylistView(PlaylistViews.HOME);
        setSearchText('');
    }

    const handleAllButton = (event) => {
        store.setCurrentPlaylistView(PlaylistViews.ALL);
        setSearchText('');
    }

    const handleUserButton = (event) => {
        store.setCurrentPlaylistView(PlaylistViews.USER);
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
                color={store.currentPlaylistView === PlaylistViews.HOME ? 'primary' : ''}
                onClick={handleHomeButton}
            ><Home /></IconButton>

            <IconButton 
                size='large' 
                color={store.currentPlaylistView === PlaylistViews.ALL ? 'primary' : ''}
                onClick={handleAllButton}
            ><Groups /></IconButton>

            <IconButton 
                size='large' 
                color={store.currentPlaylistView === PlaylistViews.USER ? 'primary' : ''}
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