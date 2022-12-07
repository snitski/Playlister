import {
    Typography,
    Button
} from '@mui/material'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';

export default function SplashScreen() {
    const description = 'Where you can create, play, and share YouTube playlists all in one place. Playlister comes with its own standalone features for the best experience!';
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();

    let buttons = [
        <Link to='/login'>
            <Button
                variant='contained'
                sx={{width: '100%'}}
            >Log in</Button>
        </Link>,
        <Link to='/register'>
            <Button
                variant='contained'
                sx={{width: '100%'}}
            >Register</Button>
        </Link>,
        <Link to='/home' style={{gridColumn: '1/3'}}>
            <Button
                variant='contained'
                sx={{width: '100%'}}
            >Continue as Guest</Button>
        </Link>
    ];

    if(auth.loggedIn) {
        // buttons = [
        //     <Link to='/login' style={{gridColumn: '1/3'}}>
        //         <Button
        //             variant='contained'
        //             sx={{width: '100%'}}
        //             onClick={() => {auth.logoutUser()}}
        //         >Switch Account</Button>
        //     </Link>,
        //     <Link to='/home' style={{gridColumn: '1/3'}}>
        //         <Button
        //             variant='contained'
        //             sx={{width: '100%'}}
        //         >View Playlists</Button>
        //     </Link>
        // ];
        buttons = [
            <Button
                variant='contained'
                sx={{gridColumn: '1/3'}}
                onClick={async () => {await auth.logoutUser(); navigate('/login'); store.goToAllView()}}
            >Switch Account</Button>,
            <Button
                variant='contained'
                sx={{gridColumn: '1/3'}}
            >View Playlists</Button>
        ]
    }

    return (
        <div className='center-children' style={{display: 'grid', color: 'white'}}>
            <span>
                <Typography 
                    variant='h1'
                    sx={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        width: '430px'
                    }}
                >Playlister</Typography>
                <Typography
                    variant='h6'
                    sx={{
                        fontStyle: 'italic',
                        width: '400px',
                        textAlign: 'center'
                    }}
                >{description}</Typography>
            </span>

            <div className='center-children'>
                <div id='splashscreen-buttons'>
                    {buttons}
                </div>
            </div>
        </div>
    );
}