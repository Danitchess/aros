"use client"
import React from 'react';

export default function Montre3 () {
  const item = { id: 3, name: 'Cadran', price: 0 }; 

  return (
    <div key={item.id} className="main-montre">
      <h2>Bientôt</h2>
    </div>
  );
};
