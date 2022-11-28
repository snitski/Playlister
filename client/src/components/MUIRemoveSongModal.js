import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
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

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
        open={store.isRemoveSongModalOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h2>Removing {songTitle}</h2>
          <Alert severity='warning'>
            Are you sure you'd like to permanently remove {songTitle} from the playlist?
          </Alert>
          <div id="confirm-cancel-container">
            <button 
                className="modal-button"
                onClick={handleConfirmRemoveSong}>
                Confirm
            </button>
            <button 
                className="modal-button"
                onClick={handleCancelRemoveSong}>
                Cancel
            </button>
          </div>
        </Box>
      </Modal>
    //     <Modal
    //         open={store.isRemoveSongModalOpen()}
    //     >
    //         <Box sx={style}>
    //         <div
    //     id="remove-song-modal"
    //     className={modalClass}
    //     data-animation="slideInOutLeft">
    //     <div className="modal-root" id='verify-remove-song-root'>
    //         <div className="modal-north">
    //             Remove {songTitle}?
    //         </div>
    //         <div className="modal-center">
    //             <div className="modal-center-content">
    //                 Are you sure you wish to permanently remove {songTitle} from the playlist?
    //             </div>
    //         </div>
    //         <div className="modal-south">
    //             <input type="button" 
    //                 id="remove-song-confirm-button" 
    //                 className="modal-button" 
    //                 onClick={handleConfirmRemoveSong} 
    //                 value='Confirm' />
    //             <input 
    //                 type="button" 
    //                 id="remove-song-cancel-button" 
    //                 className="modal-button" 
    //                 onClick={handleCancelRemoveSong} 
    //                 value='Cancel' />
    //         </div>
    //     </div>
    // </div>
    //         </Box>
    //     </Modal>
    );
}