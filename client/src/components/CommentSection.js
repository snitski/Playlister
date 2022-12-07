import { useContext, useState } from 'react'
import GlobalStoreContext from "../store";
export default function CommentSection() {
    const { store } = useContext(GlobalStoreContext)

    if(!store.openedPlaylist) return '';
    return (
        <div>
            {store.openedPlaylist.songs.map((song) => {
                return song.title;
            })}
        </div>
    )
}