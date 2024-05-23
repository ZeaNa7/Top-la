import React, { useEffect } from 'react';

const NotificationComponent: React.FC = () => {
  const showNotification = () => {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Photo prise', {
            body: 'Votre photo a été prise avec succès!',
            icon: '/icon.png',
            vibrate: [200, 100, 200],
            tag: 'photo-notification',
          });
        });
      }
    });
  };

  const requestPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    } else {
      showNotification();
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return null;
};

export default NotificationComponent;
