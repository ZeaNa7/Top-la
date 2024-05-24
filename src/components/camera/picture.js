import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Picture = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="p-4">
      {mediaItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mediaItems.map(item => (
            <div
              key={item.id}
              className="flex justify-center items-center cursor-pointer"
              onClick={() => openModal(item)}
            >
              {item.type === 'photo' ? (
                <img src={item.url} alt={selectedItem.id} className="w-full h-auto" />
              ) : (
                <video src={item.url} controls className="w-full h-auto" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Pas de photos enregistrées</p>
      )}

      <Modal
        isOpen={!!selectedItem}
        onRequestClose={closeModal}
        contentLabel="Media Viewer"
        className="flex justify-center items-center p-0 border-none rounded-lg overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
      >
        {selectedItem && (
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
            >
              Close
            </button>
            {selectedItem.type === 'photo' ? (
              <img src={selectedItem.url} alt={selectedItem.id} className="w-full h-auto" />
            ) : (
              <video src={selectedItem.url} controls className="w-full h-auto" />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Picture;
