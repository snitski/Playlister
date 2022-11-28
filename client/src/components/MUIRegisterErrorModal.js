import { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};

export default function MUIRegisterErrorModal() {
    const { auth } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    
    let errorMessage = "";
    if(auth.registerError !== null && !open) {
        errorMessage = auth.registerError;
        setOpen(true);
    }
    if(auth.registerError !== null && errorMessage === "") {
        errorMessage = auth.registerError;
    }

    let handleClose = () => {
        auth.clearErrors();
        setOpen(false);
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h2>Unable to register account</h2>
          <Alert severity='error'>
            {errorMessage}
          </Alert>
          <div id="confirm-cancel-container">
            <button 
                className="modal-button"
                onClick={handleClose}>
                Close
            </button>
          </div>
        </Box>
      </Modal>
    );
}