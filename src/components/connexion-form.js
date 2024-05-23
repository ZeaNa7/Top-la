// src/components/UsernameForm.js
import React, { useState } from 'react';

const UsernameForm = ({ setUsername }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', name);
    setUsername(name);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-2xl">Pseudo</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Pseudo"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Let's go
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
