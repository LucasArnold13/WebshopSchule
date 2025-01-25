export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  export const addItemToCart = (product) => {
    // 1. Aktuellen Warenkorb aus dem LocalStorage laden
    const cart = getCartFromLocalStorage();
  
        console.log("davor", cart);
      cart.push( product.id);
      console.log("danach", cart);
    
  
    // 3. Aktualisierten Warenkorb im LocalStorage speichern
    saveCartToLocalStorage(cart);
  };

  export const removeItemFromCart = (productId) => {
    // 1. Warenkorb aus dem LocalStorage laden
    const cart = getCartFromLocalStorage();
  
    // 2. Das Item mit der angegebenen productId entfernen
    const updatedCart = cart.filter((item) => item.id !== productId);
  
    // 3. Aktualisierten Warenkorb im LocalStorage speichern
    saveCartToLocalStorage(updatedCart);
  };

  export const clearCartFromLocalStorage = () => {
    localStorage.removeItem('cart');
  };