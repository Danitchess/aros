"use client"
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Montre3() {

  const { setCart } = useCart();
  const [cartState, setCartState] = useState([]);

  const item = {
    id: 3,
    name: 'Aros Emerald Gold',
    price: 151,
    imageUrl: '/img-modeles/modele3.png',
    components: []
  };

  const addModelToCart = () => {
    const watchItem = {
      idMontre: Date.now(),
      name: item.name,
      imageUrl: item.imageUrl,
      components: [],
      price: item.price,
      quantity: 1,
    };

    const currentCart = JSON.parse(localStorage.getItem('cart')) || cartState;

    const existingWatchIndex = currentCart.findIndex(
      (cartItem) =>
        cartItem.name === watchItem.name &&
        cartItem.imageUrl === watchItem.imageUrl &&
        cartItem.price === watchItem.price
    );

    const updatedCartState = [...currentCart];

    if (existingWatchIndex !== -1) {
      updatedCartState[existingWatchIndex].quantity += 1;
    } else {
      updatedCartState.push(watchItem);
    }

    setCartState(updatedCartState);
    setCart(updatedCartState);
    localStorage.setItem('cart', JSON.stringify(updatedCartState));
  };

  return (
    <div key={item.id} className="main-montre">
      <h2>{item.name}</h2>
      <img className="modele1" title="151€" id="imgMontre1" src={item.imageUrl} alt={item.name} height={500} width={400} />
      <p>{item.price} €</p>

      <button
        className='btn-add-cart'
        onClick={addModelToCart}

      >
        Ajouter au panier
      </button>
    </div>
  );
};
