import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

const CameraComponent = () => {
  const [pictures, setPictures] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else if (permission === 'denied') {
          console.log('Notification permission denied.');
        }
      });
    }
  };

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoURL = canvas.toDataURL('image/png');
        const uniqueKey = generateUniqueKey('photo');
        localStorage.setItem(uniqueKey, JSON.stringify(photoURL));
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
        }
        showNativeNotification('Votre photo a été prise !');

        if (isOnline) {
          setPictures((photo) => [...photo, photoURL]);
        }
      }
    }
  };

  const generateUniqueKey = (type) => {
    let counter = localStorage.getItem('counter');
    if (!counter) {
      counter = '0';
    }
    const newCounter = (parseInt(counter) + 1).toString();
    localStorage.setItem('counter', newCounter);
    return `${type}_${newCounter}`;
  };

  const showNativeNotification = async (message) => {
  const registration = await navigator.serviceWorker.getRegistration();
  const title = 'Photo';
  const payload = {
    body: message
  };
  if (registration && 'showNotification' in registration) {
    registration.showNotification(title, payload);
  } else {
    new Notification(title, payload);
  }
};

  const loadPhotosFromStorage = () => {
    const storedPhotos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('photo_')) {
        const photo = localStorage.getItem(key);
        if (photo) {
          storedPhotos.push(JSON.parse(photo));
        }
      }
    }
    setPictures(storedPhotos);
  };

  useEffect(() => {
    requestNotificationPermission();

    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error('Camera permission denied:', error);
      }
    };

    requestCameraPermission();
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });

    const handleOnline = () => {
      setIsOnline(true);
      loadPhotosFromStorage();
      showNativeNotification(' Vos photos ont été synchronisées !');
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isOnline) {
      loadPhotosFromStorage();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <Button variant="outlined" onClick={takePhoto} style={{ margin: '1em' }}>
          prendre une photo
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <video ref={videoRef} style={{ maxWidth: '100%', maxHeight: '80vh' }} autoPlay></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>

      <div style={{ textAlign: 'center' }}>
        {pictures.map((photo, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <img src={photo} alt="captured" style={{ width: '300px', height: 'auto' }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CameraComponent;