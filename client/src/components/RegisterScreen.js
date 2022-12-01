import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function RegisterScreen() {
    let navigate = useNavigate();

    let handleLoginRedirect = () => {
        navigate('/login');
    }

    let handleSubmit = () => {

    }

    return (
        <div id='register-screen'>
            <div id='register-form'>
                <TextField
                    label='First Name'
                    required
                    sx={{gridColumn: '1/2'}}
                ></TextField>
                <TextField
                    label='Last Name'
                    required
                    sx={{gridColumn: '2/3'}}
                ></TextField>
                <TextField
                    label='E-mail'
                    required
                    sx={{gridColumn: '1/3'}}
                ></TextField>
                <TextField
                    label='Password'
                    required
                    type='password'
                    sx={{gridColumn: '1/3'}}
                ></TextField>
                <TextField
                    label='Confirm Password'
                    required
                    type='password'
                    sx={{gridColumn: '1/3'}}
                ></TextField>
                <Button 
                    variant='contained' 
                    sx={{gridColumn: '1/3'}}
                    onClick={handleSubmit}
                >Create Account</Button>
                <Button 
                        variant='text'
                        sx={{gridColumn: '1/3'}}
                        onClick={handleLoginRedirect}
                >Login with existing account</Button>
            </div>
        </div>
    );
}