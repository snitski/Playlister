import { useContext, useEffect, useState } from 'react';
import {
    Typography,
    IconButton,
    Input,
    OutlinedInput
} from '@mui/material'
import {
    ThumbDown,
    ThumbUp,
    KeyboardDoubleArrowDown,
    KeyboardDoubleArrowUp
} from '@mui/icons-material'
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import SongListWrapper from './SongListWrapper';

export default function ListCard({ playlist, index }) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [liked, setLiked] = useState(auth.loggedIn && playlist.likes.includes(auth.user.username));
    const [disliked, setDisliked] = useState(auth.loggedIn && playlist.dislikes.includes(auth.user.username));
    const [expanded, setExpanded] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [playlistName, setPlaylistName] = useState(playlist.name);
    const ownedPlaylist = auth.loggedIn && playlist.ownerUsername === auth.user.username;

    useEffect(() => {
        setExpanded(store.openedPlaylist && store.openedPlaylist._id === playlist._id);
        setPlaylistName(store.loadedPlaylists[index].name);
    }, [store]);

    const handleLikeButton = () => {
        if(!liked) {
            setLiked(true);
            playlist.likes.push(auth.user.username);
            // store.toggleLikeList(playlist);
        }
        else {
            setLiked(false);
            let index = playlist.likes.indexOf(auth.user.username);
            playlist.likes.splice(index, 1);
            // store.toggleLikeList(playlist);
        }
        if(disliked) {
            setDisliked(false);
            let index = playlist.dislikes.indexOf(auth.user.username);
            playlist.dislikes.splice(index, 1);
            // store.toggleDislikeList(playlist);
        }
        store.toggleLikeList(playlist);
        // store.updateList(playlist);
    }

    const handleDislikeButton = () => {
        if(!disliked) {
            setDisliked(true);
            playlist.dislikes.push(auth.user.username);
            // store.toggleDislikeList(playlist);
        }
        else {
            setDisliked(false);
            let index = playlist.dislikes.indexOf(auth.user.username);
            playlist.dislikes.splice(index, 1);
            // store.toggleDislikeList(playlist);
        }
        if(liked) {
            setLiked(false);
            let index = playlist.likes.indexOf(auth.user.username);
            playlist.likes.splice(index, 1);
            // store.toggleLikeList(playlist);
        }
        store.toggleDislikeList(playlist);
        // store.updateList(playlist);
    }

    const handleExpandButton = () => {
        if(!expanded) {
            store.setOpenedPlaylist(playlist);
        }
        else {
            store.setOpenedPlaylist(null);
            if(ownedPlaylist) {
                store.updateList(playlist);
            }
        }
    }

    const handleClick = (event) => {
        if(ownedPlaylist && event.detail === 2) {
            setEditingName(true);
        }
    }

    const handleUsernameClick = () => {
        store.goToUser(playlist.ownerUsername);
    }

    const handleKeyPress = async (event) => {
        if(event.key === 'Enter' && editingName) {
            setEditingName(false);
            if(playlist.name !== playlistName) {
                const updatedName = await store.renameList(playlist, playlistName);
                setPlaylistName(updatedName);
                playlist.name = updatedName;
            }
        }
    }

    const getLikes = () => {
        let num = '' + playlist.likes.length;
        if(num >= 1000000000) {
            return num.substring(0, num.length - 9) + 'B';
        }
        if(num >= 1000000) {
            return num.substring(0, num.length - 6) + 'M';
        }
        if(num >= 1000) {
            return num.substring(0, num.length-3) + 'K';
        }
        else return num;
    }

    const getDislikes = () => {
        let num = '' + playlist.dislikes.length;
        if(num >= 1000000000) {
            return num.substring(0, num.length - 9) + 'B';
        }
        else if(num >= 1000000) {
            return num.substring(0, num.length - 6) + 'M';
        }
        else if(num >= 1000) {
            return num.substring(0, num.length-3) + 'K';
        }
        else return num;
    }

    return(
        <div className='list-card'>
            <div>
                { editingName ? 
                    <Input 
                        autoFocus 
                        size='small' 
                        value={playlistName} 
                        onChange={(e) => {setPlaylistName(e.target.value)}}
                        onKeyUp={handleKeyPress}
                        sx={{fontWeight: 'bold', fontSize: '15pt'}}
                    ></Input> 
                    : 
                    <Typography 
                        variant='h6' 
                        sx={{fontWeight: 'bold'}}
                        onClick={handleClick}
                    >{playlistName}</Typography>
                }
                <Typography>by: <span className='username-link' onClick={handleUsernameClick}>{playlist.ownerUsername}</span></Typography>
            </div>
            
            { playlist.published ? [
                <div className='ratings'>
                    <IconButton 
                        color={liked ? 'primary' : ''}
                        onClick={handleLikeButton}
                        disabled={!auth.loggedIn}
                    ><ThumbUp/></IconButton>
                    <Typography>{getLikes()}</Typography>
                </div>,
                <div className='ratings'>
                    <IconButton 
                        color={disliked ? 'primary' : ''}
                        onClick={handleDislikeButton}
                        disabled={!auth.loggedIn}
                    ><ThumbDown/></IconButton>
                    <Typography>{getDislikes()}</Typography>
                </div>,
            ]:''}
            { playlist.published && !expanded ? [
                <Typography sx={{display: 'flex', alignItems:'center', gridRow:'3/4'}}> Published: {playlist.publishedDate ? new Date(playlist.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} </Typography>,
                <Typography sx={{display: 'flex', alignItems:'center', gridRow:'3/4'}}> Listens: {playlist.listens} </Typography>
            ]:''}

            { expanded ? 
                    <SongListWrapper playlist={playlist} hidden={!expanded}/>
            :''}
            <div style={{
                gridRow:'3/4', 
                gridColumn:'3/4',
                display:'flex',
                justifyContent:'flex-end'}}>
                <IconButton onClick={handleExpandButton}>
                    {(expanded ? <KeyboardDoubleArrowUp /> :  <KeyboardDoubleArrowDown />)}
                </IconButton>
            </div>
            
        </div>
    )
}