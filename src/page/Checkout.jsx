import { lazy, memo, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCreditCard, FaLock, FaArrowLeft, FaCheckCircle,
  FaPaypal, FaGooglePay, FaApplePay, FaShieldAlt,
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaArrowRight, FaShoppingCart, FaTag, FaGift,
  FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin
} from 'react-icons/fa';
import { 
  IoCardOutline, IoCalendarOutline, IoLockClosedOutline,
  IoWalletOutline, IoCheckmarkCircle, IoCloseOutline
} from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const Checkout = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  
  // লোকেশন থেকে কার্ট ডেটা নেওয়া
  const checkoutData = location.state || {};
  const cartItems = checkoutData.cartItems || [];
  const subtotal = checkoutData.subtotal || 0;
  const discount = checkoutData.discount || 0;
  const tax = checkoutData.tax || 0;
  const shipping = checkoutData.shipping || 0;
  const total = checkoutData.total || 0;

  // যদি সরাসরি কোর্স থেকে আসে
  const singleCourse = location.state?.course || null;
  const quantity = location.state?.quantity || 1;

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Bangladesh',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showOrderSummary, setShowOrderSummary] = useState(true);

  // অর্ডার নম্বর জেনারেট
  useEffect(() => {
    if (isSuccess) {
      const num = 'ORD-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random() * 1000);
      setOrderNumber(num);
    }
  }, [isSuccess]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Error ক্লিয়ার
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zip) newErrors.zip = 'Zip code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (step === 3) {
      setIsProcessing(true);
      
      // পেমেন্ট প্রসেসিং সিমুলেশন
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        // Context থেকে কার্ট ক্লিয়ার করা
        clearCart();
        // লোকাল স্টোরেজ থেকেও রিমুভ
        localStorage.removeItem('cartItems');
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }, 3000);
    }
  };

  // সাফল্য পেজ
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-12 max-w-2xl w-full text-center shadow-2xl mx-3 sm:mx-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FaCheckCircle className="text-green-600 text-3xl sm:text-5xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Payment Successful! 🎉</h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">Your enrollment is confirmed. You'll receive an email with course access details.</p>
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-50 rounded-xl">
              <p className="text-xs sm:text-sm text-slate-500">Order Number</p>
              <p className="text-base sm:text-lg font-bold text-blue-600">{orderNumber}</p>
            </div>
            
            <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/" className="bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-blue-700 transition text-sm sm:text-base">
                Go to Dashboard
              </Link>
              <Link to="/courses" className="border-2 border-slate-200 text-slate-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:border-blue-600 hover:text-blue-600 transition text-sm sm:text-base">
                Browse More Courses
              </Link>
            </div>
            
            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-400">
              <p>📧 A confirmation email has been sent to {formData.email}</p>
              <p className="mt-1">⏳ Redirecting to home in 5 seconds...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // কার্ট খালি থাকলে
  if (cartItems.length === 0 && !singleCourse) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 max-w-lg mx-auto">
            <FaShoppingCart className="text-4xl sm:text-6xl text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">No Items to Checkout</h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">Your cart is empty. Start adding courses!</p>
            <Link to="/courses" className="inline-block mt-4 sm:mt-6 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-blue-700 transition text-sm sm:text-base">
              Browse Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // চেকআউট আইটেম (কার্ট বা সিঙ্গেল কোর্স)
  const checkoutItems = singleCourse ? [singleCourse] : cartItems;
  const checkoutTotal = singleCourse ? singleCourse.price * quantity : total;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header - Mobile Optimized */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-blue-600 transition p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg">
            <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">Checkout</h1>
            <p className="text-[10px] sm:text-sm text-slate-500">Complete your purchase securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left - Checkout Form */}
          <div className="lg:col-span-2">
            {/* Steps Progress - Mobile Optimized */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 px-1 sm:px-2 lg:px-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className={`w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs lg:text-sm transition-all ${
                      s <= step 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {s < step ? <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> : s}
                    </div>
                    <span className={`text-[8px] sm:text-xs lg:text-sm font-medium hidden xs:block ${
                      s <= step ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Confirm'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className={`w-6 sm:w-10 lg:w-16 h-0.5 ${s < step ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
              {/* Step 1: Personal Details - Mobile Optimized */}
              {step === 1 && (
                <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <FaUser className="text-blue-600 text-sm sm:text-base lg:text-lg" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.firstName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.lastName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                        <FaEnvelope className="inline mr-1" /> Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                        <FaPhone className="inline mr-1" /> Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="+880 1234 567890"
                      />
                      {errors.phone && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                    <div className="xs:col-span-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                        <FaMapMarkerAlt className="inline mr-1" /> Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.address ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="123 Main Street, House #45"
                      />
                      {errors.address && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">City <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.city ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="Dhaka"
                      />
                      {errors.city && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">Zip Code <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                          errors.zip ? 'border-red-500 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="1207"
                      />
                      {errors.zip && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="mt-4 sm:mt-6 bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    Proceed to Payment <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Payment - Mobile Optimized */}
              {step === 2 && (
                <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <FaCreditCard className="text-blue-600 text-sm sm:text-base lg:text-lg" />
                    Payment Method
                  </h2>
                  
                  {/* Payment Options - Mobile Optimized */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {[
                      { id: 'card', icon: <FaCreditCard className="text-base sm:text-xl" />, label: 'Credit Card' },
                      { id: 'paypal', icon: <FaPaypal className="text-base sm:text-xl text-blue-600" />, label: 'PayPal' },
                      { id: 'google', icon: <FaGooglePay className="text-base sm:text-xl" />, label: 'Google Pay' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-2 sm:p-3 lg:p-4 rounded-xl border-2 transition flex flex-col items-center gap-1 sm:gap-2 ${
                          paymentMethod === method.id
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {method.icon}
                        <span className="text-[8px] sm:text-xs font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card Details - Mobile Optimized */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                          <IoCardOutline className="inline mr-1" /> Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                            errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-slate-200'
                          }`}
                        />
                        {errors.cardNumber && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                          Cardholder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                            errors.cardName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                          }`}
                        />
                        {errors.cardName && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.cardName}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                            <IoCalendarOutline className="inline mr-1" /> Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                              errors.cardExpiry ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            }`}
                          />
                          {errors.cardExpiry && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.cardExpiry}</p>}
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1">
                            <IoLockClosedOutline className="inline mr-1" /> CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="cardCvv"
                            placeholder="•••"
                            maxLength="4"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:border-blue-500 outline-none transition text-sm ${
                              errors.cardCvv ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            }`}
                          />
                          {errors.cardCvv && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.cardCvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal / Google Pay Info */}
                  {paymentMethod !== 'card' && (
                    <div className="p-4 sm:p-6 bg-slate-50 rounded-xl text-center">
                      <p className="text-xs sm:text-sm text-slate-600">
                        You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Google Pay'} to complete your payment securely.
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2">You won't be charged until you confirm the payment.</p>
                    </div>
                  )}

                  <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="px-4 sm:px-8 py-2.5 sm:py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-blue-600 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      Review Order <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm - Mobile Optimized */}
              {step === 3 && (
                <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <IoCheckmarkCircle className="text-green-500 text-lg sm:text-xl lg:text-2xl" />
                    Confirm Order
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {/* Order Items - Mobile Optimized */}
                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-700">Items in your order</h4>
                      {checkoutItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-xl">
                          <img 
                            src={item.image || 'https://picsum.photos/seed/course/80/80'} 
                            alt={item.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-xs sm:text-sm text-slate-900 truncate">{item.title}</h5>
                            <p className="text-[8px] sm:text-xs text-slate-500">{item.category}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-blue-600 text-xs sm:text-sm">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                            {item.quantity > 1 && <p className="text-[8px] sm:text-xs text-slate-400">Qty: {item.quantity}</p>}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Summary - Mobile Optimized */}
                    <div className="border-t border-slate-200 pt-3 sm:pt-4">
                      {singleCourse ? (
                        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Price</span>
                            <span className="font-medium">${(singleCourse.price * quantity).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Quantity</span>
                            <span className="font-medium">× {quantity}</span>
                          </div>
                          <div className="flex justify-between font-bold text-base sm:text-lg pt-1.5 sm:pt-2 border-t">
                            <span>Total</span>
                            <span className="text-blue-600">${(singleCourse.price * quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                          </div>
                          {discount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-slate-500">Discount</span>
                              <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-slate-500">Tax</span>
                            <span className="font-medium">${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Shipping</span>
                            <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between font-bold text-base sm:text-lg pt-1.5 sm:pt-2 border-t">
                            <span>Total</span>
                            <span className="text-blue-600">${total.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Terms - Mobile Optimized */}
                    <div className="flex items-start gap-1.5 sm:gap-2 p-2.5 sm:p-4 bg-slate-50 rounded-xl">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
                      />
                      <label className="text-[8px] sm:text-xs text-slate-600">
                        I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and 
                        {' '}<Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                      </label>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="px-4 sm:px-8 py-2.5 sm:py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition text-sm sm:text-base"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.agreeTerms || isProcessing}
                        className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
                          !formData.agreeTerms || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaLock className="w-3 h-3 sm:w-4 sm:h-4" />
                            Pay ${singleCourse ? (singleCourse.price * quantity).toFixed(2) : total.toFixed(2)}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right - Order Summary - Mobile Optimized */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 sticky top-20 sm:top-24 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2">
                  <IoWalletOutline className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                  Order Summary
                </h3>
                <button 
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                  className="text-slate-400 hover:text-slate-600 lg:hidden text-xs sm:text-sm"
                >
                  {showOrderSummary ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showOrderSummary && (
                <>
                  {/* Items - Mobile Optimized */}
                  <div className="space-y-1.5 sm:space-y-2 max-h-40 sm:max-h-60 overflow-y-auto mb-3 sm:mb-4">
                    {checkoutItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-slate-50 rounded-lg">
                        <img 
                          src={item.image || 'https://picsum.photos/seed/course/50/50'} 
                          alt={item.title}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] sm:text-xs font-semibold text-slate-900 truncate">{item.title}</p>
                          <p className="text-[8px] sm:text-xs text-slate-500">${item.price} × {item.quantity || 1}</p>
                        </div>
                        <p className="text-[8px] sm:text-xs font-bold text-blue-600 flex-shrink-0">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary - Mobile Optimized */}
                  <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-sm border-t border-slate-200 pt-3 sm:pt-4">
                    {singleCourse ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Price</span>
                          <span>${(singleCourse.price * quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm sm:text-base lg:text-lg pt-1.5 sm:pt-2 border-t">
                          <span>Total</span>
                          <span className="text-blue-600">${(singleCourse.price * quantity).toFixed(2)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Shipping</span>
                          <span className={shipping === 0 ? 'text-green-600' : ''}>
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-sm sm:text-base lg:text-lg pt-1.5 sm:pt-2 border-t">
                          <span>Total</span>
                          <span className="text-blue-600">${total.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Secure Badge - Mobile Optimized */}
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-1.5 sm:gap-2">
                    <FaLock className="text-green-600 w-3 h-3 sm:w-4 sm:h-4" />
                    <p className="text-[8px] sm:text-xs text-green-800">Secure payment • 30-day money-back guarantee</p>
                  </div>

                  {/* Trust Badges - Mobile Optimized */}
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl text-slate-400">
                    <span>💳</span>
                    <span className="text-[8px] sm:text-sm font-bold text-slate-600">PayPal</span>
                    <span className="text-[8px] sm:text-sm font-bold text-slate-600">Google Pay</span>
                    <span className="text-[8px] sm:text-sm font-bold text-slate-600">Apple Pay</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});

export default Checkout;