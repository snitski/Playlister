import {
    IconButton,
    Modal,
    Alert,
    AlertTitle,
    Typography,
    Button
} from '@mui/material'
import {
    Add,
    Undo,
    Redo,
    Publish,
    ContentCopy,
    DeleteForever
} from '@mui/icons-material'
import SongCard from "./SongCard";
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import { useContext, useEffect, useState } from 'react';

export default function SongListWrapper({ playlist }) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [deleteListModalOpen , setDeleteListModalOpen] = useState(false);
    const [published, setPublished] = useState(playlist.published);
    const ownedPlaylist = auth.loggedIn && playlist.ownerUsername === auth.user.username;

    if(!store.openedPlaylist) return '';

    const handleAddSong = () => {
        store.addCreateSongTransaction()
    }

    const handleUndo = () => {
        if(store.canUndo()) {
            store.undo();
        }
    }

    const handleRedo = () => {
        if(store.canRedo()) {
            store.redo();
        }
    }

    const handlePublishPlaylist = () => {
        playlist.published = true;
        setPublished(true);
        store.updateList(playlist);
    }

    const handleDuplicatePlaylist = () => {
        store.cloneList(playlist);
    }

    const handleDeleteList = () => {
        setDeleteListModalOpen(false);
        store.deleteList(playlist._id)
    }

    const deleteListModal = 
        <Modal
            open={deleteListModalOpen}
            className='center-children'
            sx={{position: 'absolute', height: '100vh', width: '100vw'}}
        >
            <div className='modal'>
                <Alert 
                    severity='warning' 
                >
                    <AlertTitle>Delete Playlist?</AlertTitle>
                    {`Are you sure you'd like to delete the "${playlist.name}" playlist?`}
                </Alert>
                <Button 
                    variant='contained' 
                    onClick={handleDeleteList}
                    sx={{float: 'right', marginTop: '10px'}}
                    color='success'
                >Confirm</Button>
                <Button 
                    variant='contained' 
                    onClick={() => {setDeleteListModalOpen(false)}}
                    sx={{float: 'right', marginTop: '10px', marginRight: '10px'}}
                    color='error'
                >Cancel</Button>
            </div>
        </Modal>;

    return (
        <div className='song-list-wrapper'>
            {deleteListModal}
            <div className='song-list'>
                {store.openedPlaylist.songs.map((song, index) => (<SongCard published={store.openedPlaylist.published} song={song} index={index}/>))}
            </div>
            {!published ?
                <div className='song-list-wrapper-buttons'>
                    <div>
                        <IconButton onClick={handleAddSong}><Add /></IconButton>
                        <IconButton onClick={handleUndo} disabled={!store.canUndo()}><Undo /></IconButton>
                        <IconButton onClick={handleRedo} disabled={!store.canRedo()}><Redo /></IconButton>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <IconButton onClick={handlePublishPlaylist}><Publish /></IconButton>
                        <IconButton onClick={handleDuplicatePlaylist}><ContentCopy /></IconButton>
                        <IconButton onClick={() => {setDeleteListModalOpen(true)}}><DeleteForever /></IconButton>
                    </div>
                </div>
            : 
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    {auth.loggedIn ? <IconButton onClick={handleDuplicatePlaylist}><ContentCopy /></IconButton> : ''}
                    {ownedPlaylist ? <IconButton onClick={() => {setDeleteListModalOpen(true)}}><DeleteForever /></IconButton> : ''}
                </div>
            }
        </div>
        
    )
}