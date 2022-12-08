import { useState, useContext, useEffect } from 'react';
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
import { ViewTypes, SortTypes } from '../store';

export default function NavigationBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [popupMenuAnchor, setPopupMenuAnchor] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setSearchText(store.currentQuery)
    }, [store])

    const handleMenuOpen = (event) => {
        setPopupMenuAnchor(event.target)
    }

    const handleMenuClose = () => {
        setPopupMenuAnchor(null);
    }

    const handleHomeButton = () => {
        store.goToHomeView();
        setSearchText('');
    }

    const handleAllButton = () => {
        store.goToAllView();
        setSearchText('');
    }

    const handleUserButton = () => {
        store.goToUserView();
        setSearchText('');
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            store.searchLists(searchText);
        }
    }

    const handleNameSort = () => {
        store.setNameSort();
        setPopupMenuAnchor(null);
    }

    const handleDateSort = () => {
        store.setDateSort();
        setPopupMenuAnchor(null);
    }

    const handleListenSort = () => {
        store.setListenSort();
        setPopupMenuAnchor(null);
    }

    const handleLikeSort = () => {
        store.setLikeSort();
        setPopupMenuAnchor(null);
    }

    const handleDislikeSort = () => {
        store.setDislikeSort();
        setPopupMenuAnchor(null);
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
                <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
                <MenuItem onClick={handleDateSort}>Publish Date (Newest-Oldest)</MenuItem>
                <MenuItem onClick={handleListenSort}>Listens (High-Low)</MenuItem>
                <MenuItem onClick={handleLikeSort}>Likes (High-Low)</MenuItem>
                <MenuItem onClick={handleDislikeSort}>Dislikes (High-Low)</MenuItem>
            </Menu>
        </div>
    )
}