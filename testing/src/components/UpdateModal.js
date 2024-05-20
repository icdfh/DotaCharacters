import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

function UpdateModal({ open, user, handleClose, handleUpdate }) {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {

    setEditedUser(user);
  }, [user]);

  if (!editedUser) return null;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSave = () => {
    handleUpdate(editedUser); 
    handleClose(); 
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Box sx={style}>
        <TextField
          label="Name"
          fullWidth
          value={editedUser.name || ''}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={editedUser.phonenumber || ''}
          onChange={(e) => setEditedUser({ ...editedUser, phonenumber: e.target.value })}
        />
        <Button onClick={() => handleClose()} style={{ marginTop: '10px' }}>Close</Button>
        <Button onClick={handleSave} style={{ marginTop: '10px', marginLeft: '10px' }} variant="contained">Save</Button>
      </Box>
    </Modal>
  );
}

export default UpdateModal;
