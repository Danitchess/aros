"use client"
import React, { useState } from 'react';

export default function Montre1 ({ addToCart }) {
  const [mainImage, setMainImage] = useState('/img-modeles/modele-nautilus1.png');
  const [selectedImageName, setSelectedImageName] = useState('Dégradé noir vers bleu'); 
  const [smallImages] = useState([
    { id: 1, name: 'Argent : Dégradé noir bleu', src: '/img-modeles/modele-nautilus1.png' },
    { id: 2, name: 'Argent : Turquoise', src: '/img-modeles/modele-nautilus2.png' },
    { id: 3, name: 'Argent : Blanc', src: '/img-modeles/modele-nautilus3.png' },
    { id: 4, name: 'Argent : Vert', src: '/img-modeles/modele-nautilus4.png' },
    { id: 5, name: 'Argent : Noir', src: '/img-modeles/modele-nautilus5.png' },
    { id: 6, name: 'Argent : Dégradé noir vert', src: '/img-modeles/modele-nautilus6.png' },
    { id: 7, name: 'Rose : Brun', src: '/img-modeles/modele-nautilus7.png' },
    { id: 8, name: 'Rose : Dégradé noir vert', src: '/img-modeles/modele-nautilus8.png' },
    { id: 9, name: 'Rose : Noir', src: '/img-modeles/modele-nautilus9.png' },
    { id: 10, name: 'Rose : Dégradé noir bleu', src: '/img-modeles/modele-nautilus10.png' },

  ]);

  const item = {
    id: 1,
    name: 'Origin',
    price: 150,
    imageUrl: mainImage,
    components: []
  };

  const handleImageClick = (src, name) => {
    setMainImage(src);
    setSelectedImageName(name);
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
              onClick={() => handleImageClick(smallImage.src, smallImage.name)}
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

            <p className='p-prix-modele'>{item.price} €</p>

            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#bda208',
                border: 'none',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => addToCart(item)}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
