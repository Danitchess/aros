"use server";

let cart = [];
const products = [

    /* ---------------------Hommes-------------------------*/

    { id: 10, type: 'Bracelet', name: 'Bracelet argent mailles serrées', price: 18.15, imageUrl: '/img-bracelet/bracelet-seiko-argent-20mm.png' },
    { id: 11, type: 'Bracelet', name: 'Bracelet argent et or mailles serrées', price: 18.15, imageUrl: '/img-bracelet/bracelet-seiko-argent-or-20mm.png' },
    { id: 12, type: 'Bracelet', name: 'Bracelet argent et or', price: 18.15, imageUrl: '/img-bracelet/bracelet-argent-or-20mm.png' },
    { id: 12.1, type: 'Bracelet', name: 'Bracelet argent et or', price: 18.15, imageUrl: '/img-bracelet/bracelet-argent-or-20mm-12.1.png' },
    { id: 13, type: 'Bracelet', name: 'Bracelet argent et rose mailles serrées', price: 18.15, imageUrl: '/img-bracelet/bracelet-seiko-argent-rose-20mm.png' },
    { id: 14, type: 'Bracelet', name: 'Bracelet argent', price: 18.15, imageUrl: '/img-bracelet/bracelet-argent-20mm.png' },
    { id: 14.1, type: 'Bracelet', name: 'Bracelet argent', price: 18.15, imageUrl: '/img-bracelet/bracelet-argent-20mm-14.1.png' },

    { id: 20, type: 'Boitier', name: 'Boitier argent, lunette entaillée', price: 27.25, imageUrl: '/img-boitier/boitier-seiko-argent-39mm.1.png' },
    { id: 21, type: 'Boitier', name: 'Boitier argent avec lunette', price: 27.25, imageUrl: '/img-boitier/boitier-argent-bezel.png' },
    { id: 22, type: 'Boitier', name: 'Boitier argent et or, lunette entaillée', price: 27.25, imageUrl: '/img-boitier/boitier-seiko-argent-or-39mm.png' },
    { id: 23, type: 'Boitier', name: 'Boitier argent et or, lunette lisse', price: 27.25, imageUrl: '/img-boitier/boitier-lisse-argent-or-39mm.png' },
    { id: 24, type: 'Boitier', name: 'Boitier argent et rose, lunette entaillée 39mm', price: 27.25, imageUrl: '/img-boitier/boitier-seiko-argent-rose-39mm.png' },

    { id: 30, type: 'Cadran', name: 'Cadran noir', price: 27.25, imageUrl: '/img-cadrans/cadran-noir.png' },
    { id: 31, type: 'Cadran', name: 'Cadran blanc', price: 27.25, imageUrl: '/img-cadrans/cadran-blanc.png' },
    { id: 32, type: 'Cadran', name: 'Cadran bleu', price: 27.25, imageUrl: '/img-cadrans/cadran-bleu.png' },
    { id: 33, type: 'Cadran', name: 'Cadran nautilus vert', price: 27.25, imageUrl: '/img-cadrans/cadran-nautilus-vert.png' },
    { id: 34, type: 'Cadran', name: 'Cadran minutetime vert', price: 27.25, imageUrl: '/img-cadrans/cadran-minutetime-vert.png' },

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

    { id: 80, type: 'Loupe', name: 'Loupe', price: 2, imageUrl: 'vide.png' },
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

export async function POST(req) {
  const { productId, quantity } = await req.json();

  if (quantity < 1) {
    return new Response(
      JSON.stringify({ message: 'Quantité non valide' }),
      { status: 400 }
    );
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return new Response(
      JSON.stringify({ message: 'Produit non trouvé' }),
      { status: 404 }
    );
  }

  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  return new Response(
    JSON.stringify(cart),
    { status: 200 }
  );
}

export async function GET(req) {
  return new Response(
    JSON.stringify(cart),
    { status: 200 }
  );
}