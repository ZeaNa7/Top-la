import React, { useEffect, useState } from 'react';

const Picture = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const allMediaItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('photo_') || key.startsWith('video_'))) {
        const url = localStorage.getItem(key);
        if (url) {
          const type = key.startsWith('photo_') ? 'photo' : 'video';
          allMediaItems.push({ id: key, url: JSON.parse(url), type });
        }
      }
    }
    setMediaItems(allMediaItems);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {mediaItems.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {mediaItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {item.type === 'photo' ? (
                <img src={item.url} alt={`Photo ${item.id}`} style={{ width: '300px', height: 'auto' }} />
              ) : (
                <video src={item.url} controls style={{ width: '300px', height: 'auto' }} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No media saved</p>
      )}
    </div>
  );
};

export default Picture;
