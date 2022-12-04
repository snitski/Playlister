import { useContext, useEffect, useState } from "react"
import GlobalStoreContext from "../store"
import ListCard from "./ListCard"

export default function ListCardWrapper() {
    const { store } = useContext(GlobalStoreContext);

    let listCards = store.loadedPlaylists.map((playlist) => ( <ListCard playlist={playlist}/> ))

    return(
        <div className='content-card'>
            {listCards}
        </div>
    )
}