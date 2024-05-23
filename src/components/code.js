import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const SendCodeComponent = () => {
  const [code, setCode] = useState('123456');
  const phoneNumber = '+0781214870'; // Hardcoded phone number

  const handleSendCode = () => {
    // Normally, you'd send the code via an SMS API here.
    // For this example, simulate sending by just logging the action.
    alert(`Send code ${code} to ${phoneNumber}`);
  };

  return (
    <div>
      <TextField
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleSendCode}>
        Send Code
      </Button>
    </div>
  );
};

export default SendCodeComponent;
