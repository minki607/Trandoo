import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const confirmDialog = (handleClickOpen, handleClose, history, open) => {


    return (
        <div>
            <div className='back-icon' onClick={handleClickOpen}> 
                <i className="material-icons">arrow_back</i>Back to Dashboard
            </div>

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle style={{textAlign: 'center'}} id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
                Changes you made may not be saved
            </DialogContentText>
            </DialogContent>
            <DialogActions style={{margin: '0 auto'}}>
            <Button onClick={handleClose} color="primary" autoFocus>
                Stay
            </Button>
            <Button onClick={()=>  history.push('/translate')} color="secondary" >
                Leave
            </Button>
            </DialogActions>
        </Dialog>
      </div>
    )
}

export default confirmDialog