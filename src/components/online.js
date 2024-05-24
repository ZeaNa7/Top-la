import React, { useEffect, useState } from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
const Online = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleNetworkChange() {
      setOnline(navigator.onLine);
    }
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  return (
    <div>
         {online ? <WifiIcon /> : <WifiOffIcon />}
    </div>
  );
}

export default Online;
