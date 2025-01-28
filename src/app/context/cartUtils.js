// utils/cartUtils.js

/**
 * Calcule le total des articles dans le panier
 * @param {Array} cartState - Le tableau des articles dans le panier
 * @returns {number} - Le total des articles dans le panier
 */
export const calculateTotalItemsInCart = (cartState) => {
    return (Array.isArray(cartState) ? cartState : []).reduce(
      (total, item) => total + item.quantity, 
      0
    );
  };
  