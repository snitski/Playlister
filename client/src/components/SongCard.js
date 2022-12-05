import { useState, useContext } from 'react'
import {
    IconButton,
    Modal,
    Alert,
    AlertTitle,
    Button,
    TextField,
    Typography
} from '@mui/material'
import {
    Clear
} from '@mui/icons-material'
import GlobalStoreContext from '../store';

export default function SongCard({ song, index, published }) {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState(song.title);
    const [artist, setArtist] = useState(song.artist);
    const [youTubeId, setYouTubeId] = useState(song.youTubeId);

    const [removeSongModalOpen, setRemoveSongModalOpen] = useState(false);
    const [editSongModalOpen, setEditSongModalOpen] = useState(false);
    const [draggedTo, setDraggedTo] = useState(false);

    const handleRemoveSongButton = () => {
        setRemoveSongModalOpen(true);
    }

    const handleRemoveSong = () => {
        setRemoveSongModalOpen(false);
        store.addRemoveSongTransaction(index, song);
    }

    const handleRemoveSongModalClose = () => {
        setRemoveSongModalOpen(false);
    }

    const removeSongModal = 
        <Modal
            open={removeSongModalOpen}
            className='center-children'
            sx={{position: 'absolute', height: '100vh', width: '100vw'}}
        >
            <div className='modal'>
                <Alert 
                    severity='warning' 
                >
                    <AlertTitle>Remove song?</AlertTitle>
                    {`Are you sure you'd like to remove "${song.title} by ${song.artist}" from the playlist?`}
                </Alert>
                <Button 
                    variant='contained' 
                    onClick={handleRemoveSong}
                    sx={{float: 'right', marginTop: '10px'}}
                    color='success'
                >Confirm</Button>
                <Button 
                    variant='contained' 
                    onClick={handleRemoveSongModalClose}
                    sx={{float: 'right', marginTop: '10px', marginRight: '10px'}}
                    color='error'
                >Cancel</Button>
            </div>
        </Modal>;

    const handleClick = (event) => {
        event.preventDefault();
        if(event.detail === 2) {
            setEditSongModalOpen(true);
        }
    }

    const handleEditSong = () => {
        setEditSongModalOpen(false);
        store.addUpdateSongTransaction(index, song, {title: title, artist: artist, youTubeId: youTubeId});
    }

    const handleEditSongModalClose = () => {
        setTitle(song.title);
        setArtist(song.artist);
        setYouTubeId(song.youTubeId);
        setEditSongModalOpen(false);
    }

    const editSongModal = 
        <Modal
            open={editSongModalOpen}
            className='center-children'
            sx={{position: 'absolute', height: '100vh', width: '100vw'}}
        >
            <div className='modal'>
                <Typography variant='h5' sx={{fontWeight:'bold', marginBottom:'5px'}}>Edit Song:</Typography>
                <div style={{display: 'flex', flexDirection:'column', gap:'10px'}}>
                    <Typography variant='h6'>Title: </Typography>
                    <TextField 
                        label='Title' 
                        fullWidth
                        value={title}
                        onChange={(event) => {setTitle(event.target.value)}}
                    ></TextField>
                    <Typography variant='h6'>Artist: </Typography>
                    <TextField 
                        label='Artist' 
                        fullWidth
                        value={artist}
                        onChange={(event) => {setArtist(event.target.value)}}
                    ></TextField>
                    <Typography variant='h6'>YouTube ID: </Typography>
                    <TextField 
                        label='YouTube ID' 
                        fullWidth
                        value={youTubeId}
                        onChange={(event) => {setYouTubeId(event.target.value)}}
                    ></TextField>
                </div>
                <div>
                <Button 
                        variant='contained' 
                        onClick={handleEditSong}
                        sx={{float: 'right', marginTop: '10px'}}
                        color='success'
                    >Confirm</Button>
                    <Button 
                        variant='contained' 
                        onClick={handleEditSongModalClose}
                        sx={{float: 'right', marginTop: '10px', marginRight: '10px'}}
                        color='error'
                    >Cancel</Button>
                </div>
            </div>
        </Modal>;

    const handleDragStart = (event) => {
        event.dataTransfer.setData("song", index);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDraggedTo(true);
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDraggedTo(false);
    }

    const handleDrop = (event) => {
        console.log(event);
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        store.addMoveSongTransaction(sourceIndex, targetIndex);
}

    if(published) {
        return (
            <div className='song-card'>
                <Typography>{`${index+1}. ${song.title} by ${song.artist}`}</Typography>
            </div>
        );
    }
    else {
        return (
            <div 
                className='song-card song-card-unpublished' 
                onClick={handleClick}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                draggable="true"
            >
                {removeSongModal}
                {editSongModal}
                <Typography>{`${index+1}. ${song.title} by ${song.artist}`}</Typography>
                <IconButton onClick={handleRemoveSongButton}><Clear /></IconButton>
            </div>
        );
    }
    
}