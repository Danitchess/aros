"use client"
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function PersoMontre () {
    const { setCart } = useCart();
    const [currentCategory, setCurrentCategory] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedThumbnails, setSelectedThumbnails] = useState({});
    const [cartState, setCartState] = useState([]);

    const [mainImages, setMainImages] = useState([
        { id: 1, src: 'https://www.watchmodcustom.com/img/scenes/ndkcf/737.jpg' },
        { id: 2, src: 'https://www.watchmodcustom.com/img/scenes/ndkcf/755.jpg' },
        { id: 3, src: 'https://www.watchmodcustom.com/img/scenes/ndkcf/725.jpg' },
        { id: 4, src: 'vide.png' },
        { id: 5, src: 'vide.png' },
        { id: 6, src: 'vide.png' },
        { id: 7, src: 'vide.png' },
        { id: 8, src: 'vide.png' },
        { id: 9, src: 'vide.png' },
    ]);

    const products = [

        /* ---------------------Hommes-------------------------*/

        { id: 10, type: 'Bracelet', name: 'Bracelet argent mailles serrées', price: 16, imageUrl: '/img-bracelet/bracelet-seiko-argent-20mm.png' },
        { id: 11, type: 'Bracelet', name: 'Bracelet argent et or mailles serrées', price: 27, imageUrl: '/img-bracelet/bracelet-seiko-argent-or-20mm.png' },
        { id: 12, type: 'Bracelet', name: 'Bracelet argent et or', price: 27, imageUrl: '/img-bracelet/bracelet-argent-or-20mm.png' },
        { id: 12.1, type: 'Bracelet', name: 'Bracelet argent et or', price: 27, imageUrl: '/img-bracelet/bracelet-argent-or-20mm-12.1.png' },
        { id: 13, type: 'Bracelet', name: 'Bracelet argent et rose mailles serrées', price: 27, imageUrl: '/img-bracelet/bracelet-seiko-argent-rose-20mm.png' },
        { id: 14, type: 'Bracelet', name: 'Bracelet argent', price: 16, imageUrl: '/img-bracelet/bracelet-argent-20mm.png' },
        { id: 14.1, type: 'Bracelet', name: 'Bracelet argent', price: 16, imageUrl: '/img-bracelet/bracelet-argent-20mm-14.1.png' },

        { id: 20, type: 'Boitier', name: 'Boitier argent, lunette entaillée', price: 30, imageUrl: '/img-boitier/boitier-seiko-argent-39mm.1.png' },
        { id: 21, type: 'Boitier', name: 'Boitier argent avec lunette', price: 30, imageUrl: '/img-boitier/boitier-argent-bezel.png' },
        { id: 22, type: 'Boitier', name: 'Boitier argent et or, lunette entaillée', price: 45, imageUrl: '/img-boitier/boitier-seiko-argent-or-39mm.png' },
        { id: 23, type: 'Boitier', name: 'Boitier argent et or, lunette lisse', price: 45, imageUrl: '/img-boitier/boitier-lisse-argent-or-39mm.png' },
        { id: 24, type: 'Boitier', name: 'Boitier argent et rose, lunette entaillée 39mm', price: 45, imageUrl: '/img-boitier/boitier-seiko-argent-rose-39mm.png' },

        { id: 30, type: 'Cadran', name: 'Cadran noir', price: 23, imageUrl: '/img-cadrans/cadran-noir.png' },
        { id: 31, type: 'Cadran', name: 'Cadran blanc', price: 23, imageUrl: '/img-cadrans/cadran-blanc.png' },
        { id: 32, type: 'Cadran', name: 'Cadran bleu', price: 23, imageUrl: '/img-cadrans/cadran-bleu.png' },
        { id: 33, type: 'Cadran', name: 'Cadran nautilus vert', price: 23, imageUrl: '/img-cadrans/cadran-nautilus-vert.png' },
        { id: 34, type: 'Cadran', name: 'Cadran minutetime vert', price: 23, imageUrl: '/img-cadrans/cadran-minutetime-vert.png' },

        { id: 40, type: 'Couleur Logo', name: 'Logo noir', price: 0, imageUrl: '/img-logos/logo-noir.png' },
        { id: 41, type: 'Couleur Logo', name: 'Logo blanc', price: 0, imageUrl: '/img-logos/logo-blanc.png' },
        { id: 42, type: 'Couleur Logo', name: 'Logo doré', price: 0, imageUrl: '/img-logos/logo-or.png' },

        { id: 50, type: 'Aiguille', name: 'Aiguilles argent flèchée', price: 4, imageUrl: '/img-aiguilles/aiguilles-argent-fleche.png' },
        { id: 51, type: 'Aiguille', name: 'Aiguilles argent rectangulaire', price: 4, imageUrl: '/img-aiguilles/aiguilles-argent-rectangle.png' },
        { id: 52, type: 'Aiguille', name: 'Aiguilles or bouts ronds', price: 4, imageUrl: '/img-aiguilles/aiguilles-rond-or.png' },

        { id: 60, type: 'Trotteuse', name: 'Trotteuse argent', price: 2, imageUrl: '/img-trotteuses/trotteuse-argent.png' },
        { id: 61, type: 'Trotteuse', name: 'Trotteuse argent très fine', price: 2, imageUrl: '/img-trotteuses/trotteuse-argent-fine.png' },
        { id: 62, type: 'Trotteuse', name: 'Trotteuse or très fine', price: 2, imageUrl: '/img-trotteuses/trotteuse-rond-or.png' },

        { id: 70, type: 'Couleur Date', name: 'Mouvement NH35 blanc', price: 58, imageUrl: 'date-blanc.png' },
        { id: 71, type: 'Couleur Date', name: 'Mouvement NH35 noir', price: 58, imageUrl: 'date-noir.png' },

        { id: 80, type: 'Loupe', name: 'Sans loupe', price: 0, imageUrl: 'vide.png' },
        { id: 81, type: 'Loupe', name: 'Loupe', price: 0, imageUrl: 'loupe.png' },

        { id: 90, type: 'Lunette', name: 'Lunette blanche chiffres en relief', price: 6, imageUrl: '/img-lunettes/lunette-blanc-relief.png'},
        { id: 91, type: 'Lunette', name: 'Lunette noire chiffres blancs', price: 6, imageUrl: '/img-lunettes/lunette-noir-blanc.png'},
        { id: 92, type: 'Lunette', name: 'Lunette rouge et bleue', price: 6, imageUrl: '/img-lunettes/lunette-rouge-bleu.png'},
        { id: 93, type: 'Lunette', name: 'Lunette rouge et noire', price: 6, imageUrl: '/img-lunettes/lunette-rouge-noir.png'},
        { id: 94, type: 'Lunette', name: 'Lunette bleue et noire', price: 6, imageUrl: '/img-lunettes/lunette-bleu-noir.png'},
        { id: 95, type: 'Lunette', name: 'Lunette verte et noire', price: 6, imageUrl: '/img-lunettes/lunette-vert-noir.png'},
        { id: 96, type: 'Lunette', name: 'Lunette noire chiffres noirs', price: 6, imageUrl: '/img-lunettes/lunette-noir.png'},

        /* ---------------------Femmes-------------------------*/

        { id: 15, type: 'Bracelet', name: 'Bracelet argent et rose 13mm', price: 18.15, imageUrl: '/img-bracelet/bracelet-seiko-argent-rose-13mm.png' },
        { id: 16, type: 'Bracelet', name: 'Bracelet argent 13mm', price: 18.15, imageUrl: '/img-bracelet/bracelet-argent-13mm.png' },

        { id: 25, type: 'Boitier', name: 'Boitier argent et rose, lunette entaillée 26mm', price: 27.25, imageUrl: '/img-boitier/boitier-seiko-argent-rose-26mm.png' },

    ];

    const categories = [
        {
            name: 'Boîtiers', options: [
                { id: 20, src: "/img-boitier/boitier-seiko-argent-39mm.2.png" },
                { id: 21, src: "/img-boitier/boitier-argent-bezel.2.png" },
                { id: 22, src: "/img-boitier/boitier-seiko-argent-or-39mm.2.png" },
                { id: 23, src: "/img-boitier/boitier-lisse-argent-or-39mm.2.png" },
                { id: 24, src: "/img-boitier/boitier-seiko-argent-rose-39mm.2.png" },

                { id: 25, src: "/img-boitier/boitier-seiko-argent-rose-26mm.2.png" },
            ]
        },

        {
            name: 'Bracelets', options: [
                { id: 10, src: "/img-bracelet/bracelet-seiko-argent-20mm.png" },
                { id: 11, src: "/img-bracelet/bracelet-seiko-argent-or-20mm.2.png" },
                { id: 12, src: "/img-bracelet/bracelet-argent-or-20mm.2.png" },
                { id: 12.1, src: "/img-bracelet/bracelet-argent-or-20mm.2.png" },
                { id: 13, src: "/img-bracelet/bracelet-seiko-argent-rose-20mm.png" },
                { id: 14, src: "/img-bracelet/bracelet-argent-20mm.2.png" },
                { id: 14.1, src: "/img-bracelet/bracelet-argent-20mm.2.png" },

                { id: 15, src: "/img-bracelet/bracelet-seiko-argent-rose-13mm.png" },
                { id: 16, src: "/img-bracelet/bracelet-argent-13mm.png" },
            ]
        },

        {
            name: 'Lunettes', options: [
                { id: 90, src: "/img-lunettes/lunette-blanc-relief.2.png" },
                { id: 91, src: "/img-lunettes/lunette-noir-blanc.2.png" },
                { id: 92, src: "/img-lunettes/lunette-rouge-bleu.2.png" },
                { id: 93, src: "/img-lunettes/lunette-rouge-noir.2.png" },
                { id: 94, src: "/img-lunettes/lunette-bleu-noir.2.png" },
                { id: 95, src: "/img-lunettes/lunette-vert-noir.2.png" },
                { id: 96, src: "/img-lunettes/lunette-noir.2.png" },

            ]
        },

        {
            name: 'Cadrans', options: [
                { id: 30, src: "/img-cadrans/cadran-noir.2.png" },
                { id: 31, src: "/img-cadrans/cadran-blanc.2.png" },
                { id: 32, src: "/img-cadrans/cadran-bleu.2.png" },
                { id: 33, src: "/img-cadrans/cadran-nautilus-vert.2.png" },
                { id: 34, src: "/img-cadrans/cadran-minutetime-vert.2.png" },
            ]
        },

        {
            name: 'Couleur Logo', options: [
                { id: 40, src: "/img-logos/logo-noir.2.png" },
                { id: 41, src: "/img-logos/logo-blanc.2.png" },
                { id: 42, src: "/img-logos/logo-or.2.png" },
            ]
        },

        {
            name: 'Aiguilles', options: [
                { id: 50, src: "/img-aiguilles/aiguilles-argent-fleche.2.png" },
                { id: 51, src: "/img-aiguilles/aiguilles-argent-rectangle.2.png" },
                { id: 52, src: "/img-aiguilles/aiguilles-rond-or.2.png" },

            ]
        },
        {
            name: 'Trotteuses', options: [
                { id: 60, src: "/img-trotteuses/trotteuse-argent.2.png" },
                { id: 61, src: "/img-trotteuses/trotteuse-argent-fine.2.png" },
                { id: 62, src: "/img-trotteuses/trotteuse-rond-or.2.png" },
            ]
        },

        {
            name: 'Couleur Date', options: [
                { id: 70, src: "date-blanc.2.png" },
                { id: 71, src: "date-noir.2.png" },
            ]
        },

        {
            name: 'Loupe', options: [
                { id: 80, src: "barre-oblique.png" },
                { id: 81, src: "loupe.2.png" },
            ]
        },

    ];

    const generateRules = (isCommon, id) => {
        const rules = {
        bracelets: isCommon ? [10, 11, 12, 13, 14] : [10, 11, 12.1, 13, 14.1],
        ...(id === 21 ? { lunettes: [90, 91, 92, 93] } : {}),
        cadrans: [30, 31, 32, 33, 34],
        'couleur logo': [40, 41, 42], 
        aiguilles: [50, 51, 52],
        trotteuses: [60, 61, 62],
        'couleur date': [70, 71],
        loupe: [80, 81]
    };

     Object.keys(rules).forEach((key) => {
        if (!rules[key].length) {
            delete rules[key]; 
        }
    });

    return rules;
};

    const filteringRules = {
        20: generateRules(false),
        21: {
            bracelets: [10, 12.1, 14],
            lunettes: [90, 91, 92, 93, 94, 95, 96],
            cadrans: [30, 31, 32, 33, 34],
            'couleur logo': [40, 41, 42],
            aiguilles: [50, 51, 52],
            trotteuses: [60, 61, 62],
            'couleur date': [70, 71],
            loupe: [81]
        },
        22: generateRules(true),
        23: generateRules(false),
        24: generateRules(true),
        25: { bracelets: [15, 16], cadrans: [], 'couleur logo': [], aiguilles: [], trotteuses: [], 'couleur date': [], loupe: [] },

    };


    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartState(JSON.parse(savedCart));
            setCart(JSON.parse(savedCart));
        }
    }, [setCart]);

    const handleImageClick = (thumbnailId) => {
        const selectedPart = categories[currentCategory].name.toLowerCase();

        const isFirstCategory = currentCategory === 0;

        if (isFirstCategory) {
            setMainImages((prevImages) =>
                prevImages.map((img) =>
                    img.id === 1
                        ? { ...img, src: products.find((product) => product.id === thumbnailId)?.imageUrl }
                        : { ...img, src: 'vide.png' }
                )
            );
            setSelectedThumbnails({ [selectedPart]: thumbnailId });
            setSelectedOptions({ [selectedPart]: thumbnailId });
        } else {
/*
            setMainImages((prevImages) =>
                prevImages.map((img) =>
                    img.id === 5 ? { ...img, src: 'vide.png' } : img
                )
            );

            if (thumbnailId === 34) {
                setMainImages((prevImages) =>
                    prevImages.map((img) =>
                        img.id === 5
                            ? { ...img, src: products.find((product) => product.id === thumbnailId)?.imageUrl }
                            : img
                    )
                );
            }*/

            setMainImages((prevImages) =>
                prevImages.map((img) =>
                    img.id === currentCategory + 1
                        ? { ...img, src: products.find((product) => product.id === thumbnailId)?.imageUrl }
                        : img
                )
            );

            setSelectedThumbnails((prevThumbnails) => ({
                ...prevThumbnails,
                [selectedPart]: thumbnailId,
            }));
            setSelectedOptions((prevOptions) => ({
                ...prevOptions,
                [selectedPart]: thumbnailId,
            }));
        }
    };


    const getFilteredOptions = () => {
        const firstCategoryName = categories[0].name.toLowerCase();
        const currentCategoryName = categories[currentCategory].name.toLowerCase();
    
        const firstSelection = selectedOptions[firstCategoryName];

        const boitiersToSkip = [20, 22, 23, 24, 25];
    
        if (firstSelection && boitiersToSkip.includes(parseInt(firstSelection, 10)) && currentCategoryName === "lunettes") {
            const nextCategory = categories.findIndex(category => category.name.toLowerCase() === currentCategoryName) + 1;
            setCurrentCategory(nextCategory);
            return [];  
        }
    
        if (!firstSelection) return categories[currentCategory].options;
    
        const rules = filteringRules[firstSelection];
    
        if (!rules || !rules[currentCategoryName]) {
            return categories[currentCategory].options;
        }
    
        return categories[currentCategory].options.filter((option) =>
            rules[currentCategoryName]?.includes(option.id)
        );
    };

    const handleNextCategory = () => {
        if (currentCategory < categories.length - 1) {
            setCurrentCategory(currentCategory + 1);
        }
    };

    const handlePreviousCategory = () => {
        let prevCategory = currentCategory - 1;
    
        if (categories[prevCategory]?.name.toLowerCase() === 'lunettes' && isCategoryInvisible(prevCategory)) {
            prevCategory = 1;  
        }
    
        if (prevCategory >= 0) {
            setCurrentCategory(prevCategory);
        }
    };

    const isCategoryInvisible = (categoryIndex) => {
        const categoryName = categories[categoryIndex]?.name.toLowerCase();
        const boitiersToSkip = [20, 22, 23, 24, 25];
        
        if (categoryName === "lunettes") {
            const firstSelection = selectedOptions[categories[0].name.toLowerCase()];
            return firstSelection && boitiersToSkip.includes(parseInt(firstSelection, 10));
        }
    
        return false;
    };
    


    const addToCart = () => {
        const selectedProducts = Object.entries(selectedThumbnails).map(([part, id]) => {
            return products.find(product => product.id === id);
        }).filter(Boolean);

        if (selectedProducts.length > 0) {

            const sortedSelectedProducts = [...selectedProducts].sort((a, b) => a.id - b.id);

            const existingWatchIndex = cartState.findIndex(item => {
                const sortedComponents = [...item.components].sort((a, b) => a.id - b.id);
                return JSON.stringify(sortedComponents) === JSON.stringify(sortedSelectedProducts);
            });

            const updatedCartState = [...cartState];

            if (existingWatchIndex !== -1) {

                updatedCartState[existingWatchIndex].quantity += 1;
            } else {

                const watchItem = {
                    idMontre: Date.now(),
                    components: selectedProducts,
                    quantity: 1
                };
                updatedCartState.push(watchItem);
            }

            setCartState(updatedCartState);
            setCart(updatedCartState);
            localStorage.setItem('cart', JSON.stringify(updatedCartState));

            setSelectedOptions({});
            setSelectedThumbnails({});
        }
    };

    const isCartReady = () => {
    
        return categories.every(category => {
            const selectedPart = category.name.toLowerCase();
            
            if (selectedPart === 'lunettes' && selectedThumbnails['boîtiers'] === 20) {
                return true; 
            }
    
            return selectedThumbnails[selectedPart] !== undefined;
        });
    };

    return (
        <div className="main-custom">
            <div>
                <h2 className='h2-persoMontre'>Montre Personnalisée</h2>
                <div className='img-watch-custom'>
                    {mainImages.map((image) => (
                        <img key={image.id} src={image.src} alt="Montre personnalisée" className="img-watch-ex" />
                    ))}
                </div>
                <div className="customization-panel">
                <p>Les dimensions des composants ne sont pas toutes identiques à la réalité</p>
                    <h3>{categories[currentCategory].name}</h3>
                    <div className="nav-btn-perso">
                        <button onClick={handlePreviousCategory} disabled={currentCategory === 0}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button onClick={handleNextCategory} disabled={currentCategory === categories.length - 1}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <div className="options-list">
                        {getFilteredOptions().map((smallImage) => {
                            const selectedPart = categories[currentCategory].name.toLowerCase();
                            const isSelected = selectedThumbnails[selectedPart] === smallImage.id;
                            return (
                                <img
                                    key={smallImage.id}
                                    src={smallImage.src}
                                    alt=""
                                    className="img-option"
                                    onClick={() => handleImageClick(smallImage.id)}

                                    style={{
                                        border: isSelected ? '2px solid black' : '1px solid black',
                                        backgroundColor: isSelected ? '#39393f' : '#cacaca',
                                        padding: '5px',
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <button
                    onClick={addToCart}
                    disabled={!isCartReady()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isCartReady() ? '#bda208' : '#cacaca',
                        border: 'solid 1px #bda208',
                        color: '#fff',
                        cursor: isCartReady() ? 'pointer' : 'not-allowed',
                    }}
                >
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
};
