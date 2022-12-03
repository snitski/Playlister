import { 
    Button,
    Typography
} from '@mui/material';
import {
    Add
} from '@mui/icons-material';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import { ViewTypes } from '../store';

export default function StatusBar() {
    const { store } = useContext(GlobalStoreContext)
    let content = '';
        
    if(store.currentView === ViewTypes.HOME) {
        content = 
            <Button sx={{ textTransform:'capitalize', fontSize:'16pt' }}>
                <Add />
                Create New List
            </Button>;
    }

    if(store.currentView === ViewTypes.ALL) {
        if(store.currentQuery !== ''){
            content = 
                <Typography sx={{ fontSize:'16pt' }}>
                    {store.currentQuery + ' Playlists'}
                </Typography>;
        }
    }

    if(store.currentView === ViewTypes.USER) {
        if(store.currentQuery !== ''){
            content = 
                <Typography sx={{ fontSize:'16pt' }}>
                    {store.currentQuery + '\'s Playlists'}
                </Typography>;
        }
    }

    return(
        <div className='content-card center-children'>
            {content}
        </div>
    )
}