"use client"
import React from 'react';

export default function Montre2 ({ addToCart }) {
  const item = { 
    id: 2, 
    name: 'Épure', 
    price: 150,
    imageUrl: '/img-modeles/modele2.png',  
    components: [] 
  };

  return (
    <div key={item.id} className="main-montre">
      <h2>{item.name}</h2>
      <img className="modele1" title="150€" id="imgMontre1" src={item.imageUrl} alt={item.name} height={500} width={400} />
      <p>{item.price} €</p>
      <button onClick={() => addToCart(item)}>Ajouter au panier</button>
    </div>
  );
};
