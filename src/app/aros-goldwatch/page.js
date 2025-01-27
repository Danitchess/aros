"use client"
import React from 'react';

export default function Montre3 () {
  const item = { 
    id: 2, 
    name: 'Aros Emerald Gold', 
    price: 151,
    imageUrl: '/img-modeles/modele3.png',  
    components: [] 
  };

  return (
    <div key={item.id} className="main-montre">
      <h2>{item.name}</h2>
      <img className="modele1" title="151€" id="imgMontre1" src={item.imageUrl} alt={item.name} height={500} width={400} />
      <p>{item.price} €</p>
      
            {/*<button
              style={{
                padding: '10px 20px',
                backgroundColor: '#bda208',
                border: 'none',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer',
              }}
              
            >
              Ajouter au panier
            </button>*/}
    </div>
  );
};
