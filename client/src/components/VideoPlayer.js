import YouTube from 'react-youtube';
import { useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';

export default function VideoPlayer( ) {
    const { store } = useContext(GlobalStoreContext);
    const [ playerReference, setPlayerReference ] = useState(null);
    let currentSong = 0;

    useEffect(() => {
        try {
            currentSong = 0;
            if(playerReference && store.openedPlaylist) {
                loadSong(playerReference);
            }
        }
        catch(error) {
            console.log(error);
        }
    }, [store])

    if(!store.openedPlaylist) return '';
    let playlist = []
    try {
        playlist = store.openedPlaylist.songs.map((song) => {return song.youTubeId});
    }
    catch(error) {
        return '';
    }

    const playerOptions = {
        height: '240',
        width: '426',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            controls: 1
        }
    };

    const loadSong = (player) => {
        let song = playlist[currentSong];
        player.cueVideoById(song);
    }

    const loadAndPlaySong = (player) => {
        let song = playlist[currentSong];
        player.loadVideoById(song);
    }

    const incSong = () => {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    const onPlayerReady = (event) => {
        setPlayerReference(event.target);
        loadSong(event.target);
    }

    const onPlayerStateChange = (event) => {
        let playerStatus = event.data;
        if (playerStatus === -1) {
            console.log("-1 Video not started yet")
        } 
        else if (playerStatus === 0) {
            incSong();
            loadAndPlaySong(event.target);
        } 
        else if (playerStatus === 1) {
            console.log("1 Video played");
        } 
        else if (playerStatus === 2) {
            console.log("2 Video paused");
        } 
        else if (playerStatus === 3) {
            console.log("3 Video buffering");
        } 
        else if (playerStatus === 5) {
            console.log("5 Video cued");
        }
    }

    return (
        <YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} 
        />
    );
}