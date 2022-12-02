import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from '../auth';

export default function RegisterScreen() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [modalMessage, setModalMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLoginRedirect = () => {
        navigate('/login');
    }

    const handleFirstNameChange = (event) => {
        setFormData({
            firstName: event.target.value,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });
    }
    
    const handleLastNameChange = (event) => {
        setFormData({
            firstName: formData.firstName,
            lastName: event.target.value,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });
    }

    const handleEmailChange = (event) => {
        setFormData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: event.target.value,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });
    }

    const handlePasswordChange = (event) => {
        setFormData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: event.target.value,
            confirmPassword: formData.confirmPassword
        });
    }

    const handleConfirmPasswordChange = (event) => {
        setFormData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            confirmPassword: event.target.value
        });
    }

    const handleSubmit = () => {
        let emptyField = false;
        for(const field in formData) {
            if(formData[field] === '') {
                emptyField = true;
                break;
            }
        }

        if(emptyField)
            setModalMessage('Please enter all required fields.');
        
        else if(formData.password.length < 8)
            setModalMessage('Please enter a password at least 8 characters in length.')

        else if(formData.password !== formData.confirmPassword)
            setModalMessage('The passwords do not match.');

        else 
            console.log(formData)
    }

    const handleModalClose = () => {
        setModalMessage('');
    }

    return (
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
                        <AlertTitle>Unable to register account</AlertTitle>
                        {modalMessage}
                    </Alert>
                    <Button 
                        variant='contained' 
                        onClick={handleModalClose}
                        sx={{float: 'right', marginTop: '10px'}}
                    >Close</Button>
                </div>
            </Modal>

            <div id='register-form'>
                <TextField
                    label='First Name'
                    required
                    sx={{gridColumn: '1/2'}}
                    value={formData.firstName}
                    onChange={handleFirstNameChange}
                ></TextField>
                <TextField
                    label='Last Name'
                    required
                    sx={{gridColumn: '2/3'}}
                    value={formData.lastName}
                    onChange={handleLastNameChange}
                ></TextField>
                <TextField
                    label='Email'
                    required
                    sx={{gridColumn: '1/3'}}
                    value={formData.email}
                    onChange={handleEmailChange}
                ></TextField>
                <TextField
                    label='Password'
                    required
                    type='password'
                    sx={{gridColumn: '1/3'}}
                    value={formData.password}
                    onChange={handlePasswordChange}
                ></TextField>
                <TextField
                    label='Confirm Password'
                    required
                    type='password'
                    sx={{gridColumn: '1/3'}}
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
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
                >Log in with existing account</Button>
            </div>
        </div>
    );
}