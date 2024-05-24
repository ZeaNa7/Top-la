import React, { useState } from 'react';

const PhoneDialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleButtonClick = (value) => {
    setPhoneNumber(phoneNumber + value);
  };

  const handleClear = () => {
    setPhoneNumber('');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <input
        type="tel"
        value={phoneNumber}
        readOnly
        placeholder="Numéro de téléphone"
        className="px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handleButtonClick((i + 1).toString())}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded col-span-1"
        >
          Supprimer
        </button>
        <button
          onClick={() => handleButtonClick('0')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded col-span-1"
        >
          0
        </button>
        <button
          onClick={handleCall}
          className="px-4 py-2 bg-green-500 text-white rounded col-span-1"
        >
          Appeller
        </button>
      </div>
    </div>
  );
};

export default PhoneDialer;
