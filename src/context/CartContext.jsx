import React, { createContext, useState, useContext, useEffect } from 'react';

// Context তৈরি
const CartContext = createContext();

// Context Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // লোকাল স্টোরেজ থেকে কার্ট ডেটা লোড
  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        setCartItems(items);
        updateCartStats(items);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
        updateCartStats([]);
      }
    }
    setIsLoading(false);
  }, []);

  // কার্ট স্ট্যাটাস আপডেট
  const updateCartStats = (items) => {
    const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCartCount(totalCount);
    setCartTotal(totalPrice);
  };

  // কার্ট সেভ করা
  const saveCart = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    setCartItems(items);
    updateCartStats(items);
    // ইভেন্ট ট্রিগার
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // আইটেম যোগ করা
  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === item.id);
      let newItems;
      
      if (existingIndex > -1) {
        newItems = prevItems.map((i, index) => 
          index === existingIndex 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        newItems = [...prevItems, { ...item, quantity }];
      }
      
      saveCart(newItems);
      return newItems;
    });
  };

  // আইটেম রিমুভ করা
  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      saveCart(newItems);
      return newItems;
    });
  };

  // কোয়ান্টিটি আপডেট
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      saveCart(newItems);
      return newItems;
    });
  };

  // সব আইটেম ক্লিয়ার
  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  // কার্টে আইটেম আছে কিনা চেক
  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  // আইটেমের কোয়ান্টিটি পাওয়া
  const getItemQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Context Value
  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook - ব্যবহার করার জন্য
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;