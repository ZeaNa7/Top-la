import React, { useEffect, useState } from 'react';

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
         {online ? "Online" : "Offline"}
    </div>
  );
}

export default Online;
