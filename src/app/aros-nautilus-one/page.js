"use client";
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Montre1() {
  const [mainImage, setMainImage] = useState('/img-modeles/modele-nautilus1.png');
  const [selectedImageName, setSelectedImageName] = useState('Dégradé noir vers bleu'); 
  const [selectedPrice, setSelectedPrice] = useState(160); 
  const { setCart } = useCart();
  const [cartState, setCartState] = useState([]);
  const [, setSelectedOptions] = useState({});

  const [smallImages] = useState([
    { id: 1, price: 160, name: 'Argent : Dégradé noir bleu', src: '/img-modeles/modele-nautilus1.png' },
    { id: 2, price: 160, name: 'Argent : Turquoise', src: '/img-modeles/modele-nautilus2.png' },
    { id: 3, price: 160, name: 'Argent : Blanc', src: '/img-modeles/modele-nautilus3.png' },
    { id: 4, price: 160, name: 'Argent : Vert', src: '/img-modeles/modele-nautilus4.png' },
    { id: 5, price: 160, name: 'Argent : Noir', src: '/img-modeles/modele-nautilus5.png' },
    { id: 6, price: 160, name: 'Argent : Dégradé noir vert', src: '/img-modeles/modele-nautilus6.png' },
    { id: 7, price: 165, name: 'Rose : Brun', src: '/img-modeles/modele-nautilus7.png' },
    { id: 8, price: 165, name: 'Rose : Dégradé noir vert', src: '/img-modeles/modele-nautilus8.png' },
    { id: 9, price: 165, name: 'Rose : Noir', src: '/img-modeles/modele-nautilus9.png' },
    { id: 10, price: 165, name: 'Rose : Dégradé noir bleu', src: '/img-modeles/modele-nautilus10.png' },
  ]);

  const item = {
    id: 1,
    name: 'Aros Nautilus One',
    imageUrl: mainImage,
    components: []
  };

  const handleImageClick = (src, name, price) => {
    setMainImage(src); 
    setSelectedImageName(name); 
    setSelectedPrice(price); 
  };

  
  const addToCart = () => {
    const existingWatchIndex = cartState.findIndex(item => item.name === selectedImageName);
  
    const updatedCartState = [...cartState];
  
    if (existingWatchIndex !== -1) {

      updatedCartState[existingWatchIndex].quantity += 1;
    } else {

      const newWatch = {
        id: Date.now(), 
        name: selectedImageName, 
        price: selectedPrice, 
        image: mainImage, 
        quantity: 1 
      };
  
      updatedCartState.push(newWatch);
    }

    setCartState(updatedCartState);
    setCart(updatedCartState);
    localStorage.setItem('cart', JSON.stringify(updatedCartState));
  
    setSelectedOptions({});
  };
  

  return (
    <div key={item.id} className="main-montre">
      <h2>{item.name}</h2>

      <div className='modele'>
        <div className='img-modele'>
          <img
            src={mainImage}
            alt=""
            className=""
            height={500}
            width={400}
            style={{
              paddingTop: '100px',
            }}
          />
        </div>

        <div className='options'>
          {smallImages.map((smallImage) => (
            <img
              key={smallImage.id}
              src={smallImage.src}
              alt={smallImage.name}
              className="img-options"
              onClick={() => handleImageClick(smallImage.src, smallImage.name, smallImage.price)}
              style={{
                border: mainImage === smallImage.src ? '2px solid black' : '1px solid gray',
                backgroundColor: '#cacaca',
                paddingTop: '15px',
                marginLeft: '5px',
                cursor: 'pointer',
                width: 100,
                height: 120,
              }}
            />
          ))}

          <div className='infos-modele'>
            <p>{selectedImageName}</p>
            <p className="p-prix-modele">{selectedPrice} €</p>

             {/*<button
              style={{
                padding: '10px 20px',
                backgroundColor: '#bda208',
                border: 'none',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={addToCart}
              
            >
              Ajouter au panier
            </button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
