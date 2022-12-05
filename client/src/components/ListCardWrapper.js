import { useContext, useEffect, useState } from "react"
import GlobalStoreContext from "../store"
import ListCard from "./ListCard"

export default function ListCardWrapper() {
    const { store } = useContext(GlobalStoreContext);
    let listCards = store.loadedPlaylists.map((playlist, index) => ( <ListCard index={index} playlist={playlist}/> ))

    return(
        <div className='content-card'>
            <div id='list-card-wrapper'>
                {listCards}
            </div>
        </div>
    )
}