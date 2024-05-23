import React, { useEffect, useRef } from 'react';

const ReceiveCodeComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      const input = inputRef.current;

      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }).then(otp => {
        if (input) {
          input.value = otp.code;
        }
      }).catch(err => {
        console.log('Error receiving OTP:', err);
      });

      return () => {
        ac.abort();
      };
    }
  }, []);

  return (
    <form>
      <input ref={inputRef} type="text" autoComplete="one-time-code" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReceiveCodeComponent;
