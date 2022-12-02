import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginScreen() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [modalMessage, setModalMessage] = useState('');

    const handleRegisterRedirect = () => {
        navigate('/register')
    }

    const handleEmailChange = (event) => {
        setFormData({
            email: event.target.value,
            password: formData.password
        })
    }

    const handlePasswordChange = (event) => {
        setFormData({
            email: formData.email,
            password: event.target.value
        })
    }

    const handleSubmit = () => {
        if(formData.email === '' || formData.password.length < 8)
            setModalMessage('Please enter a valid email address and password.');
        else
            console.log(formData);
    }

    const handleModalClose = () => {
        setModalMessage('');
    }

    return(
        <div className='center-children'>
            <Modal
                open={modalMessage !== ''}
                className='center-children'
                sx={{position: 'absolute', height: '100vh', width: '100vw'}}
            >
                <div className='modal'>
                    <Alert 
                        severity='error' 
                        variant='filled'
                    >
                        <AlertTitle>Unable to login</AlertTitle>
                        {modalMessage}
                    </Alert>
                    <Button 
                        variant='contained' 
                        onClick={handleModalClose}
                        sx={{float: 'right', marginTop: '10px'}}
                    >Close</Button>
                </div>
            </Modal>

            <div id='login-form'>
                <TextField
                    required
                    label='Email'
                    variant='outlined'
                    value={formData.email}
                    onChange={handleEmailChange}
                ></TextField>
                <TextField
                    required
                    label='Password'
                    type='password'
                    variant='outlined'
                    value={formData.password}
                    onChange={handlePasswordChange}
                ></TextField>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                >Log in</Button>
                <Button 
                    variant='text'
                    onClick={handleRegisterRedirect}
                >Create new account</Button>
            </div>
        </div>
    );
}