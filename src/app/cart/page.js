"use client"

import { React, useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

export default function Panier() {
  const { setCart } = useCart();
  const [cartState, setCartState] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartState(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartState.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartState));
    }
    setCart(cartState);
  }, [cartState, setCart]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) return;

    setCartState(prevCartState => {
      const updatedCart = prevCartState.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.location.reload();
      return updatedCart;
    });

    const updatedCart = cartState.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartState([]);
    localStorage.removeItem('cart');
  };

  const removeWatch = (watchIndex) => {
    const updatedCartState = cartState.filter((_, index) => index !== watchIndex);
    setCartState(updatedCartState);
    localStorage.setItem('cart', JSON.stringify(updatedCartState));
    window.location.reload();
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCartState(savedCart);
    }
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);


  const mouvementQuantity = cartState.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  

  /*const fixedProducts = {
    id: 'mouvement',
    name: 'Mouvement de montre',
    unit_amount: {
      currency_code: 'EUR',
      value: '58',  
    },
    quantity: mouvementQuantity.toString(),
    breakdown: {
      item_total: {
        currency_code: 'EUR',
        value: (30 * mouvementQuantity).toFixed(2), 
      },
    },
  };

  console.log("Quantité de mouvment ", mouvementQuantity)*/

  const totalCart = cartState.reduce((sum, item) => {
    const watchTotal = item.components.reduce((watchSum, component) => watchSum + component.price, 0);
    return sum + watchTotal * item.quantity;
  }, 0);

  /*const fixedProductPrice = parseFloat(fixedProducts.unit_amount.value) * parseInt(fixedProducts.quantity);*/

  const finalTotalCart = (totalCart /*fixedProductPrice*/).toFixed(2);

  const formatPrice = (price) => {
    return `${parseFloat(price).toFixed(0)}`; 
  };

  const watchWithFixedPrice = (item) => {
    const watchTotal = item.components.reduce((watchSum, component) => watchSum + component.price, 0);
    const totalPrice = watchTotal; /*fixedProductPrice*/ 
    return formatPrice(totalPrice);
  };

  console.log('Prix total du panier avec produits fixes:', finalTotalCart);

 
  const makePayement = async () => {
    const stripe = await loadStripe("pk_test_51QYWwSI8jwbkhMMf4yGeeII7SvQMfG7Vs3Ivlp8DhusQahI3nDJJaIzMe1y2MtqMu1V64cF6kdq9itG66kICfPqW00274ZM7WX");
    if (!isLoggedIn) {
      router.push('/login-to-order');
      return;
    }

    const userEmail = localStorage.getItem('userEmail');

    const products = cartState.flatMap(item =>
      item.components.map(component => ({
        id: component.id,
        name: component.name,
        unit_amount: {
          currency_code: 'EUR',
          value: component.price.toFixed(2),
        },
        quantity: item.quantity.toString(),
        breakdown: {
          item_total: {
            currency_code: 'EUR',
            value: (parseFloat(component.price) * item.quantity).toFixed(2)
          }
        }
      }))
    );

    const allProducts = [...products] /*fixedProducts*/  

    console.log(allProducts);

    const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.breakdown.item_total.value), 0).toFixed(2);

    const orderData = {
      userEmail,
      allProducts,
      totalAmount,
    };

    console.log('Montant total envoyé au serveur:', totalAmount);

    const response = await fetch('/api/stripe/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Erreur de l\'API:', errorMessage);
      throw new Error('Erreur lors de la communication avec le serveur Stripe.');
    }
    

    const { sessionId } = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className='main-panier'>
      <h2>Mon Panier</h2>
      <p className='p-panier'>
        Pour passer une commande, il faut choisir tous les composants de la montre nécessaires.
        <br />
        Vous ne pouvez donc pas retirer un seul composant du panier, veuillez tout retirer. Ensuite personnalisez votre montre à nouveau.
      </p>

      {cartState && cartState.length > 0 ? (
        <div className='main-panier-item'>
          {cartState.map((item, index) => {
            return (
              <section key={index} className='panier-container'>
                <div className='watch-container'>
                  <div>
                    <h3 className='h3-perso-panier'>Personnalisation {index + 1}</h3>
                  </div>

                  <div className='images-container'>
                    {item.components.map((component) => (
                      <div className='img-watch' key={component.id}>
                        <img
                          className="img-watch-panier"
                          src={component.imageUrl}
                          alt={component.name}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="panier-quantity" key={item.id}>
                    <button className="btn-quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button className="btn-quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className='component-panier'>
                  {item.components.map((component) => (
                    <div className='item-panier' key={component.id}>
                      <h3 className='h3-item-name-panier'>{component.name}</h3>
                      <p className='p-item-price-panier'>{component.price} €</p>
                    </div>
                  ))}

                  {/*<div className='item-panier' key={fixedProducts.id}>
                    <h3 className='h3-item-name-panier'>{fixedProducts.name}</h3>
                    <p className='p-item-price-panier'>{fixedProducts.unit_amount.value} €</p>
                  </div>*/}

                  <div className='perso-total'>
                    <h3 className='h3-total'>Total</h3>
                    <p className='p-item-price-panier'>{watchWithFixedPrice(item)} €</p>
                  </div>
                  <div className='total-panier'>
                    <button className="btn-remove-watch" onClick={() => removeWatch(index)}>Supprimer</button>
                  </div>
                </div>
              </section>
            );
          })}

          <div className='panier-container'>
            <h3 className='h3-sous-total'>Sous total : {formatPrice(finalTotalCart)} €</h3>
            <Link className="navlink-continu-achat" href="/shop"><i className="fa-solid fa-caret-left"></i> Poursuivre mes achats</Link>

            <div className='btns-remove-comm'>
              <button className="btn-remove-all" onClick={clearCart}>Tout supprimer</button>

              <button
                className='btn-commander'
                onClick={makePayement}>
                <i className="fa-solid fa-truck-fast"></i>
                <span className="text">Commander</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>
          Vous n'avez rien ajouté au panier
          <br />
          <Link href="/shop">
            <button className='btn-fillpanier'>Remplissez votre panier</button>
          </Link>
        </p>
      )}
    </div>
  );
};
