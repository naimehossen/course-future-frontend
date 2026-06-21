import { lazy, memo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrash, FaPlus, FaMinus, FaShoppingCart, 
  FaArrowRight, FaTag, FaCreditCard,
  FaLock, FaTruck, FaClock, FaArrowLeft,
  FaHeart, FaRegHeart, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import { IoCloseOutline, IoCheckmarkCircle, IoWalletOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const Cart = memo(() => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartCount,
    cartTotal
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponMessage, setCouponMessage] = useState('');

  // লোডিং সিমুলেশন
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // প্রমো কোড হ্যান্ডলার
  const handleApplyPromo = () => {
    const code = promoCode.toLowerCase().trim();
    if (code === 'save20') {
      setPromoApplied(true);
      setPromoError('');
      setCouponMessage('🎉 20% discount applied!');
      setTimeout(() => setCouponMessage(''), 3000);
    } else if (code === 'student10') {
      setPromoApplied(true);
      setPromoError('');
      setCouponMessage('🎉 10% student discount applied!');
      setTimeout(() => setCouponMessage(''), 3000);
    } else if (code === 'firstbuy') {
      setPromoApplied(true);
      setPromoError('');
      setCouponMessage('🎉 15% first purchase discount applied!');
      setTimeout(() => setCouponMessage(''), 3000);
    } else if (code === '') {
      setPromoError('Please enter a promo code');
    } else {
      setPromoError('❌ Invalid promo code. Try SAVE20, STUDENT10, or FIRSTBUY');
      setPromoApplied(false);
    }
  };

  // আইটেম রিমুভ (Context ব্যবহার)
  const handleRemoveItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(id);
    }
  };

  // আইটেম সেভ (উইশলিস্ট)
  const toggleSaveItem = (id) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // সব আইটেম রিমুভ (Context ব্যবহার)
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  // সাবটোটাল ক্যালকুলেশন
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * (item.quantity || 1)), 0);
  const savings = originalTotal - subtotal;
  
  // ডিসকাউন্ড ক্যালকুলেশন
  let discount = 0;
  let discountPercentage = 0;
  if (promoApplied) {
    if (promoCode.toLowerCase() === 'save20') {
      discount = subtotal * 0.2;
      discountPercentage = 20;
    } else if (promoCode.toLowerCase() === 'student10') {
      discount = subtotal * 0.1;
      discountPercentage = 10;
    } else if (promoCode.toLowerCase() === 'firstbuy') {
      discount = subtotal * 0.15;
      discountPercentage = 15;
    }
  }
  
  const tax = (subtotal - discount) * 0.1;
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal - discount + tax + shipping;

  // চেকআউট পেজে যাওয়া
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout', { 
      state: { 
        cartItems: cartItems,
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        shipping: shipping,
        total: total
      } 
    });
  };

  // ফ্রি শিপিং থ্রেশহোল্ড
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Loading State */}
      {isLoading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base text-slate-500">Loading your cart...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Header - Mobile Optimized */}
          <div className="bg-white border-b border-slate-200 py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => navigate(-1)}
                    className="text-slate-600 hover:text-blue-600 transition p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 flex items-center gap-2 sm:gap-3">
                      <FaShoppingCart className="text-blue-600 text-lg sm:text-2xl" />
                      <span className="hidden xs:inline">Shopping Cart</span>
                      <span className="xs:hidden">Cart</span>
                    </h1>
                    <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                  </div>
                </div>
                <Link 
                  to="/courses" 
                  className="text-blue-600 font-medium hover:text-blue-700 transition flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto justify-center sm:justify-start"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cartItems.length === 0 ? (
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <FaShoppingCart className="text-3xl sm:text-4xl text-slate-300" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your cart is empty</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2 max-w-sm mx-auto">
                      Looks like you haven't added any courses yet. Start learning today!
                    </p>
                    <Link 
                      to="/courses" 
                      className="inline-block mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List - Mobile Optimized */}
                    {cartItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all group">
                        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                          {/* Image - Mobile Optimized */}
                          <Link 
                            to={`/course/${item.title.toLowerCase().replace(/ /g, '-')}`}
                            className="w-full xs:w-24 sm:w-32 h-32 xs:h-24 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative block"
                          >
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                              <span className="bg-blue-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                                {item.level || 'Beginner'}
                              </span>
                            </div>
                          </Link>
                          
                          {/* Details - Mobile Optimized */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-1 xs:gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                  <span className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-1.5 sm:px-2.5 py-0.5 rounded-full">
                                    {item.category}
                                  </span>
                                  <span className="text-[8px] sm:text-xs text-slate-400">
                                    {item.duration || 'Flexible'}
                                  </span>
                                </div>
                                <Link 
                                  to={`/course/${item.title.toLowerCase().replace(/ /g, '-')}`}
                                  className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 mt-0.5 hover:text-blue-600 transition-colors block truncate"
                                >
                                  {item.title}
                                </Link>
                                <p className="text-[10px] sm:text-sm text-slate-500 truncate">By {item.instructor || 'Expert Instructor'}</p>
                              </div>
                              
                              <div className="flex items-center gap-1 sm:gap-2">
                                <button 
                                  onClick={() => toggleSaveItem(item.id)}
                                  className="text-slate-400 hover:text-red-500 transition p-1.5 sm:p-2 hover:bg-red-50 rounded-lg"
                                  title="Save for later"
                                >
                                  {savedItems.includes(item.id) ? (
                                    <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                                  ) : (
                                    <FaRegHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                                  )}
                                </button>
                                <button 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-slate-400 hover:text-red-600 transition p-1.5 sm:p-2 hover:bg-red-50 rounded-lg"
                                  title="Remove"
                                >
                                  <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Price & Quantity - Mobile Optimized */}
                            <div className="flex flex-wrap items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 gap-1 sm:gap-2">
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                                <span className="text-base sm:text-xl lg:text-2xl font-bold text-blue-600">
                                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-[10px] sm:text-sm text-slate-400 line-through">
                                    ${(item.originalPrice * (item.quantity || 1)).toFixed(2)}
                                  </span>
                                )}
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-[8px] sm:text-xs text-green-600 font-medium bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                                    Save ${((item.originalPrice - item.price) * (item.quantity || 1)).toFixed(2)}
                                  </span>
                                )}
                              </div>
                              
                              {/* Quantity Controls - Mobile Optimized */}
                              <div className="flex items-center gap-1 sm:gap-2">
                                <button 
                                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center justify-center hover:border-blue-300 text-xs sm:text-sm"
                                >
                                  <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                                <span className="w-6 sm:w-7 lg:w-8 text-center font-bold text-slate-900 text-xs sm:text-sm">
                                  {item.quantity || 1}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center justify-center hover:border-blue-300 text-xs sm:text-sm"
                                >
                                  <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Clear Cart - Mobile Optimized */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pt-1 sm:pt-2">
                      <button 
                        onClick={handleClearCart}
                        className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium transition flex items-center gap-1.5 sm:gap-2 hover:bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                      >
                        <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                        Clear Cart
                      </button>
                      <span className="text-[10px] sm:text-xs text-slate-500">
                        {cartItems.length} items in cart
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Order Summary - Mobile Optimized */}
              {cartItems.length > 0 && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 sticky top-20 sm:top-24 shadow-xl shadow-slate-200/50">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
                      <IoWalletOutline className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                      Order Summary
                    </h3>
                    
                    {/* Coupon Message - Mobile Optimized */}
                    {couponMessage && (
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-xl text-xs sm:text-sm text-green-700 flex items-center gap-1.5 sm:gap-2">
                        <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{couponMessage}</span>
                      </div>
                    )}
                    
                    {/* Free Shipping Progress - Mobile Optimized */}
                    {remainingForFreeShipping > 0 && subtotal > 0 && (
                      <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-blue-50 rounded-xl">
                        <div className="flex flex-wrap justify-between text-[10px] sm:text-xs text-blue-800 mb-1 gap-1">
                          <span>Add ${remainingForFreeShipping.toFixed(2)} more for FREE shipping</span>
                          <span>{Math.min(100, (subtotal / freeShippingThreshold) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1.5 sm:h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Promo Code - Mobile Optimized */}
                    <div className="mb-4 sm:mb-6">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1 flex items-center gap-1">
                        <FaTag className="w-3 h-3" />
                        Promo Code
                      </label>
                      <div className="flex gap-1.5 sm:gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 outline-none bg-slate-50"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="bg-blue-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[10px] sm:text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FaTimesCircle className="w-3 h-3" />
                          {promoError}
                        </p>
                      )}
                      {promoApplied && (
                        <p className="text-[10px] sm:text-xs text-green-500 mt-1 flex items-center gap-1">
                          <FaCheckCircle className="w-3 h-3" />
                          Promo code applied! {discountPercentage}% off
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                        <span className="text-[8px] sm:text-[10px] text-slate-400 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-full cursor-pointer hover:bg-slate-200 transition" onClick={() => { setPromoCode('SAVE20'); handleApplyPromo(); }}>SAVE20</span>
                        <span className="text-[8px] sm:text-[10px] text-slate-400 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-full cursor-pointer hover:bg-slate-200 transition" onClick={() => { setPromoCode('STUDENT10'); handleApplyPromo(); }}>STUDENT10</span>
                        <span className="text-[8px] sm:text-[10px] text-slate-400 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-full cursor-pointer hover:bg-slate-200 transition" onClick={() => { setPromoCode('FIRSTBUY'); handleApplyPromo(); }}>FIRSTBUY</span>
                      </div>
                    </div>

                    {/* Price Breakdown - Mobile Optimized */}
                    <div className="space-y-2 sm:space-y-3 text-[10px] sm:text-sm border-b border-slate-200 pb-3 sm:pb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                      </div>
                      {savings > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Savings</span>
                          <span className="font-medium text-green-600">-${savings.toFixed(2)}</span>
                        </div>
                      )}
                      {promoApplied && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Discount ({discountPercentage}%)</span>
                          <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax (10%)</span>
                        <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Shipping</span>
                        <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-slate-900'}`}>
                          {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    {/* Total - Mobile Optimized */}
                    <div className="pt-3 sm:pt-4">
                      <div className="flex justify-between text-base sm:text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">${total.toFixed(2)}</span>
                      </div>
                      <p className="text-[8px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Including tax and fees</p>
                    </div>

                    {/* Checkout Button - Mobile Optimized */}
                    <button 
                      onClick={handleCheckout}
                      className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 sm:py-4 rounded-xl hover:shadow-lg transition-all shadow-blue-600/20 flex items-center justify-center gap-1.5 sm:gap-2 group text-xs sm:text-sm"
                    >
                      <FaCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      Proceed to Checkout
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    {/* Trust Badges - Mobile Optimized */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                        <div>
                          <FaLock className="text-green-600 mx-auto w-4 h-4 sm:w-5 sm:h-5" />
                          <p className="text-[8px] sm:text-[10px] text-slate-500 mt-0.5 sm:mt-1">Secure Checkout</p>
                        </div>
                        <div>
                          <FaTruck className="text-green-600 mx-auto w-4 h-4 sm:w-5 sm:h-5" />
                          <p className="text-[8px] sm:text-[10px] text-slate-500 mt-0.5 sm:mt-1">Lifetime Access</p>
                        </div>
                        <div>
                          <FaClock className="text-green-600 mx-auto w-4 h-4 sm:w-5 sm:h-5" />
                          <p className="text-[8px] sm:text-[10px] text-slate-500 mt-0.5 sm:mt-1">24/7 Support</p>
                        </div>
                      </div>
                    </div>

                    {/* Guarantee - Mobile Optimized */}
                    <div className="mt-3 sm:mt-4 p-2.5 sm:p-4 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-[10px] sm:text-xs text-green-800 text-center flex items-center justify-center gap-1.5 sm:gap-2">
                        <IoCheckmarkCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        30-Day Money-Back Guarantee
                      </p>
                    </div>

                    {/* Payment Methods - Mobile Optimized */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl text-slate-400">
                      <span className="text-[8px] sm:text-xs font-medium text-slate-500 mr-1">We accept:</span>
                      <span>💳</span>
                      <span className="text-[10px] sm:text-sm font-bold text-slate-600">PayPal</span>
                      <span className="text-[10px] sm:text-sm font-bold text-slate-600">Google Pay</span>
                      <span className="text-[10px] sm:text-sm font-bold text-slate-600">Apple Pay</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
});

export default Cart;