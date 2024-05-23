import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const CameraComponent = () => {
  const [pictures, setPictures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const canvasRef = useRef(null); 

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
        setPictures((prevPhotos) => [...prevPhotos, photoURL]);
        const uniqueKey = generateUniqueKey('photo');
        localStorage.setItem(uniqueKey, JSON.stringify(photoURL));
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
        showNotification("Photo Taken", "Your photo has been taken successfully.");
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

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        setVideos((prevVideos) => [...prevVideos, videoURL]);
        const uniqueKey = generateUniqueKey('video');
        localStorage.setItem(uniqueKey, JSON.stringify(videoURL));
        chunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, {
              body,
            });
          });
        }
      });
    }
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const storedPhotos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('photo_')) {
        const photo = localStorage.getItem(key);
        if (photo) {
          storedPhotos.push(photo);
        }
      }
    }
    setPictures(storedPhotos);
  }, []);

  useEffect(() => {
    const storedVideos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('video_')) {
        const video = localStorage.getItem(key);
        if (video) {
          storedVideos.push(video);
        }
      }
    }
    setVideos(storedVideos);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <Button variant="outlined" onClick={takePhoto} style={{ margin: '1em' }}>
          Take Photo
        </Button>
        {!isRecording ? (
          <Button variant="outlined" onClick={startRecording} style={{ margin: '1em' }}>
            Start Recording
          </Button>
        ) : (
          <Button variant="outlined" onClick={stopRecording} style={{ margin: '1em' }}>
            Stop Recording
          </Button>
        )}
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

        {videos.map((videoURL, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <video src={videoURL} controls style={{ width: '300px', height: 'auto' }}></video>
          </div>
        ))}
      </div>
    </>
  );
};

export default CameraComponent;
