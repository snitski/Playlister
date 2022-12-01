import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
    let navigate = useNavigate();

    let handleRegisterRedirect = () => {
        navigate('/register')
    }

    let handleSubmit = () => {

    }

    return(
        <div id='login-screen'>
            <div id='login-form'>
                <TextField
                    required
                    label='E-mail'
                    variant='outlined'
                ></TextField>
                <TextField
                    required
                    label='Password'
                    type='password'
                    variant='outlined'
                ></TextField>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                >Login</Button>
                <Button 
                    variant='text'
                    onClick={handleRegisterRedirect}
                >Create new account</Button>
            </div>
        </div>
    );
}