import {
    Typography,
    Button
} from '@mui/material'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';

export default function SplashScreen() {
    const description = 'Where you can create, play, and share YouTube playlists all in one place. Playlister comes with its own standalone features for the best experience!';
    const { auth } = useContext(AuthContext);

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
        buttons = [
            <Link to='/login' style={{gridColumn: '1/3'}}>
                <Button
                    variant='contained'
                    sx={{width: '100%'}}
                >Change Account</Button>
            </Link>,
            <Link to='/home' style={{gridColumn: '1/3'}}>
                <Button
                    variant='contained'
                    sx={{width: '100%'}}
                >Continue Home</Button>
            </Link>
        ];
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