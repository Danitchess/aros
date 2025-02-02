"use client"
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link'

export default function PersoMontre() {
    const { setCart } = useCart();
    const [currentCategory, setCurrentCategory] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedThumbnails, setSelectedThumbnails] = useState({});
    const [cartState, setCartState] = useState([]);
    const [showMovementCheckbox, setShowMovementCheckbox] = useState(false);
    const [movementSelected, setMovementSelected] = useState(false);


    const [mainImages, setMainImages] = useState([
        { id: 1, src: '/img-bracelet/bracelet-seiko-argent-20mm.png' },
        { id: 2, src: '/img-boitier/boitier-seiko-argent-39mm.1.png' },
        { id: 3, src: '/img-cadrans/cadran-blanc.png' },
        { id: 4, src: 'vide.png' },
        { id: 5, src: 'vide.png' },
        { id: 6, src: 'vide.png' },
        { id: 7, src: 'vide.png' },
        { id: 8, src: 'vide.png' },
        { id: 9, src: 'vide.png' },
        { id: 10, src: 'vide.png' },

    ]);

    const products = [

        /* ---------------------Hommes-------------------------*/

        { id: 10, type: 'Bracelet', name: 'Bracelet argent mailles serrées', price: 20, imageUrl: '/img-bracelet/bracelet-seiko-argent-20mm.png' },
        { id: 11, type: 'Bracelet', name: 'Bracelet argent et or mailles serrées', price: 25, imageUrl: '/img-bracelet/bracelet-seiko-argent-or-20mm.png' },
        { id: 12, type: 'Bracelet', name: 'Bracelet argent et or', price: 25, imageUrl: '/img-bracelet/bracelet-argent-or-20mm.png' },
        { id: 0o12, type: 'Bracelet', name: 'Bracelet argent et or', price: 25, imageUrl: '/img-bracelet/bracelet-argent-or-20mm-12.1.png' },
        { id: 13, type: 'Bracelet', name: 'Bracelet argent et rose mailles serrées', price: 25, imageUrl: '/img-bracelet/bracelet-seiko-argent-rose-20mm.png' },
        { id: 14, type: 'Bracelet', name: 'Bracelet argent', price: 20, imageUrl: '/img-bracelet/bracelet-argent-20mm.png' },
        { id: 0o14, type: 'Bracelet', name: 'Bracelet argent', price: 20, imageUrl: '/img-bracelet/bracelet-argent-20mm-14.1.png' },
        { id: 17, type: 'Bracelet', name: 'Bracelet argent Royal Oak', price: 30, imageUrl: '/img-bracelet/bracelet-argent-ap.png' },
        { id: 18, type: 'Bracelet', name: 'Bracelet argent', price: 30, imageUrl: '/img-bracelet/bracelet-argent-president.png' },
        { id: 19, type: 'Bracelet', name: 'Bracelet cuir noir alligator', price: 30, imageUrl: '/img-bracelet/bracelet-cuir-noir-alligator.png' },
        { id: 101, type: 'Bracelet', name: 'Bracelet cuir noir lisse', price: 30, imageUrl: '/img-bracelet/bracelet-cuir-noir-lisse.png' },
        { id: 102, type: 'Bracelet', name: 'Bracelet cuir brun clair lisse', price: 30, imageUrl: '/img-bracelet/bracelet-cuir-brun-clair-lisse.png' },


        { id: 20, type: 'Boitier', name: 'Boitier argent, lunette entaillée', price: 30, imageUrl: '/img-boitier/boitier-seiko-argent-39mm.1.png' },
        { id: 21, type: 'Boitier', name: 'Boitier argent 40mm, avec lunette', price: 35, imageUrl: '/img-boitier/boitier-argent-bezel.png' },
        { id: 22, type: 'Boitier', name: 'Boitier argent et or, lunette entaillée ', price: 40, imageUrl: '/img-boitier/boitier-seiko-argent-or-39mm.png' },
        { id: 23, type: 'Boitier', name: 'Boitier argent et or, lunette lisse ', price: 40, imageUrl: '/img-boitier/boitier-lisse-argent-or-39mm.png' },
        { id: 24, type: 'Boitier', name: 'Boitier argent et rose, lunette entaillée ', price: 40, imageUrl: '/img-boitier/boitier-seiko-argent-rose-39mm.png' },
        { id: 25, type: 'Boitier', name: 'Boitier argent Royal Oak', price: 45, imageUrl: '/img-boitier/boitier-argent-ap.png' },
        { id: 26, type: 'Boitier', name: 'Boitier argent, lunette lisse', price: 30, imageUrl: '/img-boitier/boitier-argent-president.png' },

        { id: 30, type: 'Cadran', name: 'Cadran noir', price: 31, imageUrl: '/img-cadrans/cadran-noir.png' },
        { id: 31, type: 'Cadran', name: 'Cadran blanc', price: 31, imageUrl: '/img-cadrans/cadran-blanc.png' },
        { id: 32, type: 'Cadran', name: 'Cadran bleu', price: 31, imageUrl: '/img-cadrans/cadran-bleu.png' },
        { id: 391, type: 'Cadran', name: 'Cadran vert touches d\'or', price: 31, imageUrl: '/img-cadrans/cadran-vert-or.png' },
        { id: 33, type: 'Cadran', name: 'Cadran nautilus vert', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-vert.png' },
        { id: 34, type: 'Cadran', name: 'Cadran nautilus blanc', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-blanc.png' },
        { id: 35, type: 'Cadran', name: 'Cadran nautilus bleu', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-bleu.png' },
        { id: 36, type: 'Cadran', name: 'Cadran nautilus dégradé noir bleu', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-bleu-noir.png' },
        { id: 37, type: 'Cadran', name: 'Cadran nautilus brun', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-brun.png' },
        { id: 38, type: 'Cadran', name: 'Cadran nautilus noir', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-noir.png' },
        { id: 39, type: 'Cadran', name: 'Cadran nautilus turquoise', price: 31, imageUrl: '/img-cadrans/cadran-nautilus-turquoise.png' },
        { id: 301, type: 'Cadran', name: 'Cadran noir chiffres arabes', price: 31, imageUrl: '/img-cadrans/cadran-arabic-noir.png' },
        { id: 311, type: 'Cadran', name: 'Cadran turquoise chiffres arabes', price: 31, imageUrl: '/img-cadrans/cadran-arabic-turquoise.png' },
        { id: 321, type: 'Cadran', name: 'Cadran rose chiffres arabes', price: 31, imageUrl: '/img-cadrans/cadran-arabic-rose.png' },
        { id: 331, type: 'Cadran', name: 'Cadran rose clair chiffres arabes', price: 31, imageUrl: '/img-cadrans/cadran-arabic-rose-clair.png' },
        { id: 341, type: 'Cadran', name: 'Cadran vert chiffres arabes', price: 31, imageUrl: '/img-cadrans/cadran-arabic-vert.png' },
        { id: 351, type: 'Cadran', name: 'Cadran orange', price: 31, imageUrl: '/img-cadrans/cadran-orange.png' },
        { id: 361, type: 'Cadran', name: 'Cadran rose pâle mat', price: 31, imageUrl: '/img-cadrans/cadran-rose-pale.png' },
        { id: 371, type: 'Cadran', name: 'Cadran rouge mat', price: 31, imageUrl: '/img-cadrans/cadran-rouge.png' },
        { id: 381, type: 'Cadran', name: 'Cadran turquoise mat', price: 31, imageUrl: '/img-cadrans/cadran-turquoise.png' },

        { id: 40, type: 'Couleur Logo', name: 'Logo noir', price: 0, imageUrl: '/img-logos/logo-noir.png' },
        { id: 41, type: 'Couleur Logo', name: 'Logo blanc', price: 0, imageUrl: '/img-logos/logo-blanc.png' },
        { id: 42, type: 'Couleur Logo', name: 'Logo doré', price: 0, imageUrl: '/img-logos/logo-or.png' },

        { id: 50, type: 'Aiguille', name: 'Aiguilles argent rectangulaires', price: 6, imageUrl: '/img-aiguilles/aiguilles-argent-rectangle.png' },
        { id: 51, type: 'Aiguille', name: 'Aiguilles or rectangulaires', price: 6, imageUrl: '/img-aiguilles/aiguilles-or-rectangle.png' },
        { id: 511, type: 'Aiguille', name: 'Aiguilles or rose rectangulaires', price: 6, imageUrl: '/img-aiguilles/aiguilles-or-rose-rectangle.png' },
        { id: 52, type: 'Aiguille', name: 'Aiguilles or bout rond', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-or.png' },
        { id: 53, type: 'Aiguille', name: 'Aiguilles argent bout rond', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-argent.png' },
        { id: 54, type: 'Aiguille', name: 'Aiguilles noires et blanches bout rond', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-noir-blanc.png' },
        { id: 55, type: 'Aiguille', name: 'Aiguilles rondes argent', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-long-argent.png' },
        { id: 56, type: 'Aiguille', name: 'Aiguilles rondes or rose', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-long-or-rose.png' },
        { id: 57, type: 'Aiguille', name: 'Aiguilles rondes or', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-long-or.png' },
        { id: 58, type: 'Aiguille', name: 'Aiguilles rondes noires', price: 6, imageUrl: '/img-aiguilles/aiguilles-rond-long-noir.png' },
        { id: 59, type: 'Aiguille', name: 'Aiguilles noires bout carré', price: 6, imageUrl: '/img-aiguilles/aiguilles-carre-noir.png' },
        { id: 501, type: 'Aiguille', name: 'Aiguilles argent bout carré', price: 6, imageUrl: '/img-aiguilles/aiguilles-carre-argent.png' },
        { id: 521, type: 'Aiguille', name: 'Aiguilles noires bout carré', price: 6, imageUrl: '/img-aiguilles/aiguilles-carre-noir.png' },
        { id: 531, type: 'Aiguille', name: 'Aiguilles noires bout carré', price: 6, imageUrl: '/img-aiguilles/aiguilles-carre-noir.png' },
        { id: 541, type: 'Aiguille', name: 'Aiguilles noires bout carré', price: 6, imageUrl: '/img-aiguilles/aiguilles-carre-noir.png' },


        { id: 60, type: 'Trotteuse', name: 'Trotteuse argent', price: 4, imageUrl: '/img-trotteuses/trotteuse-argent.png' },
        { id: 61, type: 'Trotteuse', name: 'Trotteuse argent très fine', price: 4, imageUrl: '/img-trotteuses/trotteuse-argent-fine.png' },
        { id: 62, type: 'Trotteuse', name: 'Trotteuse or très fine avec rond', price: 4, imageUrl: '/img-trotteuses/trotteuse-rond-or.png' },
        { id: 63, type: 'Trotteuse', name: 'Trotteuse argent très fine avec rond', price: 4, imageUrl: '/img-trotteuses/trotteuse-rond-argent.png' },
        { id: 64, type: 'Trotteuse', name: 'Trotteuse noire très fine avec rond', price: 4, imageUrl: '/img-trotteuses/trotteuse-rond-noir.png' },
        { id: 65, type: 'Trotteuse', name: 'Trotteuse or très fine', price: 4, imageUrl: '/img-trotteuses/trotteuse-rond-or-rose.png' },
        { id: 67, type: 'Trotteuse', name: 'Trotteuse éclair argent', price: 4, imageUrl: '/img-trotteuses/trotteuse-eclair-argent.png' },
        { id: 68, type: 'Trotteuse', name: 'Trotteuse éclair or rose', price: 4, imageUrl: '/img-trotteuses/trotteuse-eclair-or-rose.png' },
        { id: 69, type: 'Trotteuse', name: 'Trotteuse éclair or', price: 4, imageUrl: '/img-trotteuses/trotteuse-eclair-or.png' },

        { id: 70, type: 'Couleur Date', name: 'Mouvement NH35 blanc', price: 60, imageUrl: 'date-blanc.png' },
        { id: 71, type: 'Couleur Date', name: 'Mouvement NH35 noir', price: 60, imageUrl: 'date-noir.png' },
        { id: 72, type: 'Mouvement', name: 'Mouvement NH35', price: 60, imageUrl: 'vide.png' },

        { id: 80, type: 'Loupe', name: 'Sans loupe', price: 0, imageUrl: 'vide.png' },
        { id: 81, type: 'Loupe', name: 'Loupe', price: 0, imageUrl: 'loupe.png' },

        { id: 90, type: 'Lunette', name: 'Lunette blanche chiffres en relief', price: 6, imageUrl: '/img-lunettes/lunette-blanc-relief.png' },
        { id: 91, type: 'Lunette', name: 'Lunette noire chiffres blancs', price: 6, imageUrl: '/img-lunettes/lunette-noir-blanc.png' },
        { id: 92, type: 'Lunette', name: 'Lunette rouge et bleue', price: 6, imageUrl: '/img-lunettes/lunette-rouge-bleu.png' },
        { id: 93, type: 'Lunette', name: 'Lunette rouge et noire', price: 6, imageUrl: '/img-lunettes/lunette-rouge-noir.png' },
        { id: 94, type: 'Lunette', name: 'Lunette bleue et noire', price: 6, imageUrl: '/img-lunettes/lunette-bleu-noir.png' },
        { id: 95, type: 'Lunette', name: 'Lunette verte et noire', price: 6, imageUrl: '/img-lunettes/lunette-vert-noir.png' },
        { id: 96, type: 'Lunette', name: 'Lunette noire chiffres noirs', price: 6, imageUrl: '/img-lunettes/lunette-noir.png' },

        { id: 1001, type: 'Taille du boitier', name: '26mm', price: 0, imageUrl: 'vide.png' },
        { id: 1002, type: 'Taille du boitier', name: '36mm', price: 0, imageUrl: 'vide.png' },
        { id: 1003, type: 'Taille du boitier', name: '39mm', price: 0, imageUrl: 'vide.png' },

        /* ---------------------Femmes-------------------------*/

        { id: 15, type: 'Bracelet', name: 'Bracelet argent et rose 13mm', price: 35, imageUrl: '/img-bracelet/bracelet-seiko-argent-rose-13mm.png' },
        { id: 16, type: 'Bracelet', name: 'Bracelet argent 13mm', price: 35, imageUrl: '/img-bracelet/bracelet-argent-13mm.png' },

    ];

    const categories = [
        {
            name: 'Boîtiers', options: [
                { id: 20, src: "/img-boitier/boitier-seiko-argent-39mm.2.png" },
                { id: 21, src: "/img-boitier/boitier-argent-bezel.2.png" },
                { id: 22, src: "/img-boitier/boitier-seiko-argent-or-39mm.2.png" },
                { id: 23, src: "/img-boitier/boitier-lisse-argent-or-39mm.2.png" },
                { id: 24, src: "/img-boitier/boitier-seiko-argent-rose-39mm.2.png" },
                { id: 25, src: "/img-boitier/boitier-argent-ap.2.png" },
                { id: 26, src: "/img-boitier/boitier-argent-president.2.png" },
            ]
        },

        {
            name: 'Taille du boitier', options: [
                { id: 1001, src: "26mm.png" },
                { id: 1002, src: "36mm.png" },
                { id: 1003, src: "39mm.png" },
            ]
        },

        {
            name: 'Bracelets', options: [
                { id: 10, src: "/img-bracelet/bracelet-seiko-argent-20mm.png" },
                { id: 11, src: "/img-bracelet/bracelet-seiko-argent-or-20mm.2.png" },
                { id: 12, src: "/img-bracelet/bracelet-argent-or-20mm.2.png" },
                { id: 13, src: "/img-bracelet/bracelet-seiko-argent-rose-20mm.png" },
                { id: 14, src: "/img-bracelet/bracelet-argent-20mm.2.png" },
                { id: 17, src: "/img-bracelet/bracelet-argent-ap.png" },
                { id: 18, src: "/img-bracelet/bracelet-argent-president.2.png" },
                { id: 19, src: "/img-bracelet/bracelet-cuir-noir-alligator.2.png" },
                { id: 101, src: "/img-bracelet/bracelet-cuir-noir-lisse.2.png" },
                { id: 102, src: "/img-bracelet/bracelet-cuir-brun-clair-lisse.2.png" },

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
                { id: 391, src: "/img-cadrans/cadran-vert-or.2.png" },
                { id: 33, src: "/img-cadrans/cadran-nautilus-vert.2.png" },
                { id: 34, src: "/img-cadrans/cadran-nautilus-blanc.2.png" },
                { id: 35, src: "/img-cadrans/cadran-nautilus-bleu.2.png" },
                { id: 36, src: "/img-cadrans/cadran-nautilus-bleu-noir.2.png" },
                { id: 37, src: "/img-cadrans/cadran-nautilus-brun.2.png" },
                { id: 38, src: "/img-cadrans/cadran-nautilus-noir.2.png" },
                { id: 39, src: "/img-cadrans/cadran-nautilus-turquoise.2.png" },
                { id: 301, src: "/img-cadrans/cadran-arabic-noir.2.png" },
                { id: 311, src: "/img-cadrans/cadran-arabic-turquoise.2.png" },
                { id: 321, src: "/img-cadrans/cadran-arabic-rose.2.png" },
                { id: 331, src: "/img-cadrans/cadran-arabic-rose-clair.2.png" },
                { id: 341, src: "/img-cadrans/cadran-arabic-vert.2.png" },
                { id: 351, src: "/img-cadrans/cadran-orange.2.png" },
                { id: 361, src: "/img-cadrans/cadran-rose-pale.2.png" },
                { id: 371, src: "/img-cadrans/cadran-rouge.2.png" },
                { id: 381, src: "/img-cadrans/cadran-turquoise.2.png" },

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
                { id: 50, src: "/img-aiguilles/aiguilles-argent-rectangle.2.png" },
                { id: 51, src: "/img-aiguilles/aiguilles-or-rectangle.2.png" },
                { id: 511, src: '/img-aiguilles/aiguilles-or-rose-rectangle.2.png' },
                { id: 52, src: "/img-aiguilles/aiguilles-rond-or.2.png" },
                { id: 53, src: "/img-aiguilles/aiguilles-rond-argent.2.png" },
                { id: 54, src: "/img-aiguilles/aiguilles-rond-noir-blanc.2.png" },
                { id: 55, src: '/img-aiguilles/aiguilles-rond-long-argent.2.png' },
                { id: 56, src: '/img-aiguilles/aiguilles-rond-long-or-rose.2.png' },
                { id: 57, src: '/img-aiguilles/aiguilles-rond-long-or.2.png' },
                { id: 58, src: '/img-aiguilles/aiguilles-rond-long-noir.2.png' },
                { id: 59, src: '/img-aiguilles/aiguilles-carre-noir.2.png' },
                { id: 501, src: '/img-aiguilles/aiguilles-carre-argent.2.png' },

            ]
        },
        {
            name: 'Trotteuses', options: [
                { id: 60, src: "/img-trotteuses/trotteuse-argent.2.png" },
                { id: 61, src: "/img-trotteuses/trotteuse-argent-fine.2.png" },
                { id: 62, src: "/img-trotteuses/trotteuse-rond-or.2.png" },
                { id: 63, src: "/img-trotteuses/trotteuse-rond-argent.2.png" },
                { id: 64, src: "/img-trotteuses/trotteuse-rond-noir.2.png" },
                { id: 65, src: "/img-trotteuses/trotteuse-rond-or-rose.2.png" },
                { id: 67, src: "/img-trotteuses/trotteuse-eclair-argent.2.png" },
                { id: 68, src: "/img-trotteuses/trotteuse-eclair-or-rose.2.png" },
                { id: 69, src: "/img-trotteuses/trotteuse-eclair-or.2.png" },
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

    const generateRules = (id) => {
        const rules = {
            'taille du boitier': [1002, 1003],
            bracelets: [10, 11, 12, 13, 14, 18, 19, 101, 102],
            ...(id === 21 ? { lunettes: [90, 91, 92, 93, 94, 95, 96] } : {}),
            cadrans: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 301, 311, 321, 331, 341, 351, 361, 371, 381, 391],
            'couleur logo': [40, 41, 42],
            aiguilles: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 501, 511, 521, 531, 541],
            trotteuses: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 601, 611, 621, 631, 641],
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
        20: generateRules(),
        21: {
            'taille du boitier': [1002, 1003],
            bracelets: [10, 12.1, 14, 18, 19, 101, 102],
            lunettes: [90, 91, 92, 93, 94, 95, 96],
            cadrans: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 301, 311, 321, 331, 341, 351, 361, 371, 381, 391],
            'couleur logo': [40, 41, 42],
            aiguilles: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 501, 511, 521, 531, 541],
            trotteuses: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 601, 611, 621, 631, 641],
            'couleur date': [70, 71],
            loupe: [81]
        },
        22: generateRules(),
        23: generateRules(),
        24: {
            'taille du boitier': [1001, 1002, 1003],
            bracelets: [10, 11, 12, 13, 14, 18, 19, 101, 102],
            lunettes: [],
            cadrans: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 301, 311, 321, 331, 341, 351, 361, 371, 381, 391],
            'couleur logo': [40, 41, 42],
            aiguilles: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 501, 511, 521, 531, 541],
            trotteuses: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 601, 611, 621, 631, 641],
            'couleur date': [70, 71],
            loupe: [80, 81]
        },
        25: {
            'taille du boitier': [],
            bracelets: [17],
            lunettes: [],
            cadrans: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 301, 311, 321, 331, 341, 351, 361, 371, 381, 391],
            'couleur logo': [40, 41, 42],
            aiguilles: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 501, 511, 521, 531, 541],
            trotteuses: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 601, 611, 621, 631, 641],
            'couleur date': [70, 71],
            loupe: []
        },
        26: generateRules(),
        1001: { bracelets: [15, 16], cadrans: [], 'couleur logo': [], aiguilles: [], trotteuses: [], 'couleur date': [], loupe: [] },

    };


    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            console.log('Parsed cart from localStorage:', parsedCart); 
            setCartState(parsedCart);
            setCart(parsedCart);
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
        }
        else {
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

        if (selectedPart === 'cadrans') {
            handleCadranChange(thumbnailId);
        }
    };


    const getFilteredOptions = () => {
        const firstCategoryName = categories[0].name.toLowerCase();
        const fifthCategoryName = categories[4].name.toLowerCase();
        const currentCategoryName = categories[currentCategory].name.toLowerCase();

        const firstSelection = selectedOptions[firstCategoryName];
        const fifthSelection = selectedOptions[fifthCategoryName];

        const boitiersToSkip = [20, 22, 23, 24, 25, 26];
        const sizeToSkip = [21, 25]
        const logoToSkip = [391]

        if (firstSelection && boitiersToSkip.includes(parseInt(firstSelection, 10)) && currentCategoryName === "lunettes") {
            const nextCategory = categories.findIndex(category => category.name.toLowerCase() === currentCategoryName) + 1;
            setCurrentCategory(nextCategory);
            return [];
        }

        if (firstSelection && sizeToSkip.includes(parseInt(firstSelection, 10)) && currentCategoryName === "taille du boitier") {
            const nextCategory = categories.findIndex(category => category.name.toLowerCase() === currentCategoryName) + 1;
            setCurrentCategory(nextCategory);
            return [];
        }

        if (fifthSelection && logoToSkip.includes(parseInt(fifthSelection, 10)) && currentCategoryName === "couleur logo") {
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

    useEffect(() => {
        const selectedCadranId = selectedOptions['cadrans'];
        const cadransToShowMovement = [351, 361, 371, 381];

        if (cadransToShowMovement.includes(parseInt(selectedCadranId, 10))) {
            setShowMovementCheckbox(true);
            setMovementSelected(true);
        } else {
            setShowMovementCheckbox(false);
            setMovementSelected(false);
        }
    }, [selectedOptions['cadrans']]);


    const handleNextCategory = () => {
        const currentCategoryName = categories[currentCategory]?.name.toLowerCase();

        const dateToSkip = [351];
        const loupeToSkip = [25]

        if (currentCategoryName === "trotteuses") {
            const fifthSelection = selectedOptions[categories[4].name.toLowerCase()];

            if (fifthSelection && dateToSkip.includes(parseInt(fifthSelection, 10))) {
                console.log("Trotteuse sélectionnée, ne pas avancer.");
                return;
            }
        }

        if (currentCategoryName === "couleur date") {
            const fifthSelection = selectedOptions[categories[8].name.toLowerCase()];

            if (fifthSelection && loupeToSkip.includes(parseInt(fifthSelection, 10))) {
                console.log("Trotteuse sélectionnée, ne pas avancer.");
                return;
            }
        }

        let nextCategory = currentCategory + 1;
        if (nextCategory < categories.length) {
            setCurrentCategory(nextCategory);
        }
    };


    const handlePreviousCategory = () => {
        let prevCategory = currentCategory - 1;

        if (prevCategory < 0) {
            return;
        }

        if (categories[prevCategory]?.name.toLowerCase() === 'lunettes' && isCategoryInvisible(prevCategory)) {
            prevCategory = 2;
        }

        if (categories[prevCategory]?.name.toLowerCase() === 'taille du boitier' && isCategoryInvisible(prevCategory)) {
            prevCategory = 0;
        }

        if (categories[prevCategory]?.name.toLowerCase() === 'couleur logo' && isCategoryInvisible(prevCategory)) {
            prevCategory = 4;
        }

        if (prevCategory >= 0) {
            setCurrentCategory(prevCategory);
        }
    };

    const isCategoryInvisible = (categoryIndex) => {
        if (categoryIndex < 0 || categoryIndex >= categories.length) {
            return false;
        }
        const categoryName = categories[categoryIndex]?.name.toLowerCase();
        const boitiersToSkip = [20, 22, 23, 24, 25, 26];
        const sizeToSkip = [21, 25]
        const loupeToSkip = [25]
        const logoToSkip = [391]

        if (categoryName === "lunettes") {
            const firstSelection = selectedOptions[categories[0].name.toLowerCase()];
            return firstSelection && boitiersToSkip.includes(parseInt(firstSelection, 10));
        }

        if (categoryName === "taille du boitier") {
            const firstSelection = selectedOptions[categories[0].name.toLowerCase()];
            return firstSelection && sizeToSkip.includes(parseInt(firstSelection, 10));
        }

        if (categoryName === "couleur logo") {
            const fifthSelection = selectedOptions[categories[4].name.toLowerCase()];
            return fifthSelection && logoToSkip.includes(parseInt(fifthSelection, 10));
        }

        if (categoryName === "loupe") {
            const firstSelection = selectedOptions[categories[0].name.toLowerCase()];
            return firstSelection && loupeToSkip.includes(parseInt(firstSelection, 10));
        }

        return false;
    };

    const handleMovementCheckboxChange = () => {
        setMovementSelected(!movementSelected);
    };

    const handleCadranChange = (selectedCadranId) => {
        const cadransToShowMovement = [351, 361, 371, 381];

        if (cadransToShowMovement.includes(selectedCadranId)) {
            setShowMovementCheckbox(true);
            setMovementSelected(true);
        } else {
            setShowMovementCheckbox(false);
            setMovementSelected(false);
        }
    };


    const addToCart = () => {
        const selectedProducts = Object.entries(selectedThumbnails).map(([part, id]) => {
            return products.find(product => product.id === id);
        }).filter(Boolean);

        if (movementSelected) {
            const movement = products.find(product => product.type === 'Mouvement' && product.name.includes('Mouvement NH35'));
            if (movement) {
                selectedProducts.push(movement);
            }
        }

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

            if (selectedPart === 'lunettes' && [20, 22, 23, 24, 25, 26].includes(selectedThumbnails['boîtiers'])) {
                return true;
            }

            if (selectedPart === 'taille du boitier' && [21, 25].includes(selectedThumbnails['boîtiers'])) {
                return true;
            }

            if (selectedPart === 'couleur date' && [351, 361, 371, 381].includes(selectedThumbnails['cadrans'])) {
                return true;
            }

            if (selectedPart === 'couleur logo' && [391].includes(selectedThumbnails['cadrans'])) {
                return true;
            }

            if (selectedPart === 'loupe' && [351, 361, 371, 381].includes(selectedThumbnails['cadrans'])) {
                return true;
            }

            if (selectedPart === 'trotteuses' && [351, 361, 371, 381].includes(selectedThumbnails['cadrans']) && !movementSelected) {
                return false;
            }

            if (selectedPart === 'loupe' && [25].includes(selectedThumbnails['boîtiers'])) {
                return true;
            }


            return selectedThumbnails[selectedPart] !== undefined;
        });
    };

    return (
        <div>
        <div className="main-custom">
            <div>
                <h2 className='h2-persoMontre'>Montre Personnalisée</h2>
                <div className='img-watch-custom'>
                    {mainImages.map((image) => (
                        <img key={image.id} src={image.src} alt="Montre personnalisée" className="img-watch-ex" />
                    ))}
                </div>
                <div className="customization-panel">
                    <p>𝐏𝐨𝐮𝐫 𝐮𝐧𝐞 𝐦𝐞𝐢𝐥𝐥𝐞𝐮𝐫𝐞 𝐞𝐱𝐩𝐞́𝐫𝐢𝐞𝐧𝐜𝐞, 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐚𝐥𝐢𝐬𝐞𝐳 𝐬𝐮𝐫 𝐮𝐧 𝐞́𝐜𝐫𝐚𝐧 𝐝𝐞 𝐠𝐫𝐚𝐧𝐝𝐞 𝐭𝐚𝐢𝐥𝐥𝐞</p>
                    <p>Les dimensions des composants ne sont pas toutes identiques à la réalité</p>
                    <h3>{categories[currentCategory].name}</h3>
                    <div className="nav-btn-perso">
                        <button onClick={handlePreviousCategory} disabled={currentCategory === 0}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button
                            onClick={handleNextCategory}
                            disabled={
                                currentCategory === categories.length - 1 ||
                                (categories[currentCategory]?.name.toLowerCase() === "trotteuses" &&
                                    selectedOptions[categories[4].name.toLowerCase()] &&
                                    [351, 361, 371, 381].includes(parseInt(selectedOptions[categories[4].name.toLowerCase()], 10))
                                ) ||
                                (categories[currentCategory]?.name.toLowerCase() === "couleur date" &&
                                    selectedOptions[categories[0].name.toLowerCase()] &&
                                    [25].includes(parseInt(selectedOptions[categories[0].name.toLowerCase()], 10))
                                )
                            }
                        >
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>

                    </div>
                    <button
                        onClick={addToCart}
                        disabled={!isCartReady()}
                        style={{
                            padding: '10px 20px',
                            marginBottom: '20px',
                            backgroundColor: isCartReady() ? '#bda208' : '#cacaca',
                            border: 'solid 1px #bda208',
                            color: '#fff',
                            cursor: isCartReady() ? 'pointer' : 'not-allowed',
                        }}
                    >
                        Ajouter au panier
                    </button>
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
                {showMovementCheckbox && (
                    <div className="movement-checkbox">
                        <input
                            type="checkbox"
                            id="movement"
                            checked={movementSelected}
                            onChange={handleMovementCheckboxChange}
                        />
                        <label htmlFor="movement">Ajouter le mouvement à ma montre</label>
                    </div>
                )}
            </div>
        </div>
        <section className="model">
        <h3 className="h3-model">Modèles</h3>
        <ul className="ul-home">

          <li>
          <Link href="/aros-nautilus-one">
              <div className="image-container">
                <img
                  className="imgMontre1"
                  id="imgMontre1"
                  src="/img-modeles/modele-nautilus1.png"
                  alt=""
                  height={500}
                  width={400}
                />

              </div>
            </Link>

            <p className="model-name">Aros Nautilus One</p>
            <p className="model-desc">Automatique mécanique, 45.5mm</p>
            <p className="prix-model-home">160 €</p>
            
          </li>

          <li>
            <Link href="/aros-white-glow">
              <div className="image-container">
                <img
                  className="imgMontre1"
                  id="imgMontre2"
                  src="/img-modeles/modele2.png"
                  alt=""
                  height={500}
                  width={400}
                />

              </div>
            </Link>

            <p className="model-name">Aros White Glow</p>
            <p className="model-desc">Automatique mécanique, 36/39mm</p>
            <p className="prix-model-home">151 €</p>
          </li>

          <li>
            <Link href="/aros-emerald-gold">
              <div className="image-container">
                <img
                  className="imgMontre1"
                  id="imgMontre3"
                  src="/img-modeles/modele3.png"
                  alt=""
                  height={500}
                  width={400}
                />
              </div>
            </Link>
            <p className="model-name">Aros Emerald Gold</p>
            <p className="model-desc">Automatique mécanique, 36/39mm</p>
            <p className="prix-model-home">151 €</p>
          </li>

        </ul>
      </section>
    </div>
    );
};
