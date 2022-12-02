import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function SplashScreen() {
    const description = 'Where you can create, play, and share YouTube playlists all in one place. Playlister comes with its own standalone features for the best experience!';

    const handleGuestClick = () => {

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
                    <Link to='/login'>
                        <Button
                            variant='contained'
                            sx={{gridColumn: '1/2', width: '100%'}}
                        >Login</Button>
                    </Link>
                    <Link to='/register'>
                        <Button
                            variant='contained'
                            sx={{gridColumn: '2/3', width: '100%'}}
                        >Register</Button>
                    </Link>
                    <Button
                        variant='contained'
                        sx={{gridColumn: '1/3'}}
                        onClick={handleGuestClick}
                    >Continue as Guest</Button>
                </div>
            </div>
        </div>
    );
}