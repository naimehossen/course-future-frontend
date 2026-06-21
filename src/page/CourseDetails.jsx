import { lazy, memo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  IoCheckmarkCircleOutline, 
  IoTimeOutline, 
  IoWalletOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoPlayCircleOutline,
  IoDownloadOutline,
  IoChatbubbleOutline,
  IoCloseOutline,
  IoArrowForward,
  IoArrowBack
} from 'react-icons/io5';
import { 
  FaStar, FaStarHalfAlt, FaUserGraduate, FaCreditCard, 
  FaImages, FaHeart, FaRegHeart, FaShareAlt, 
  FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp,
  FaShoppingCart, FaCheckCircle, FaAward, FaClock,
  FaCertificate, FaInfinity, FaUserTie, FaVideo
} from 'react-icons/fa';
import { GoVideo } from "react-icons/go";
import { RxVideo } from "react-icons/rx";
import { getCourseBySlug, getAllCourses } from '../data/coursesData';
import { useCart } from '../context/CartContext';

const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const CourseDetails = memo(() => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  // স্লাগ থেকে কোর্স খুঁজে বের করা
  const course = getCourseBySlug(courseName);

  // গ্যালারি ইমেজ
  const galleryImages = [
    { 
      id: 1, 
      url: course?.image || 'https://picsum.photos/seed/course1/800/500', 
      title: `${course?.title || 'Course'} - Class Session`,
      description: 'Interactive classroom session with expert instructor'
    },
    { 
      id: 2, 
      url: 'https://picsum.photos/seed/course2/800/500', 
      title: `${course?.title || 'Course'} - Lab Practice`,
      description: 'Hands-on lab practice with real-world scenarios'
    },
    { 
      id: 3, 
      url: 'https://picsum.photos/seed/course3/800/500', 
      title: `${course?.title || 'Course'} - Student Workshop`,
      description: 'Collaborative workshop with industry professionals'
    },
    { 
      id: 4, 
      url: 'https://picsum.photos/seed/course4/800/500', 
      title: `${course?.title || 'Course'} - Certification Ceremony`,
      description: 'Celebrating student achievements and certifications'
    },
    { 
      id: 5, 
      url: 'https://picsum.photos/seed/course5/800/500', 
      title: `${course?.title || 'Course'} - Industry Visit`,
      description: 'Industry exposure and networking opportunities'
    },
    { 
      id: 6, 
      url: 'https://picsum.photos/seed/course6/800/500', 
      title: `${course?.title || 'Course'} - Group Discussion`,
      description: 'Interactive group discussions and problem-solving'
    }
  ];

  // অটো-প্লে স্লাইডার
  useEffect(() => {
    let interval;
    if (isAutoPlay && !selectedImage) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, selectedImage, galleryImages.length]);

  // যদি কোর্স না পাওয়া যায়
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-12 max-w-lg mx-auto">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold text-slate-900">Course Not Found</h2>
            <p className="text-slate-500 mt-4">The course you're looking for doesn't exist.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                Browse All Courses
              </Link>
              <Link to="/" className="border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition">
                Go Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // চেক করা আইটেম কার্টে আছে কিনা
  const inCart = isInCart(course.id);
  const existingQuantity = getItemQuantity(course.id);

  // সিলেবাস ডেটা
  const syllabus = [
    { module: "Module 1", title: "Introduction & Architecture", duration: "4 hours", topics: ["Overview", "Core Concepts", "Architecture Design"], video: true },
    { module: "Module 2", title: "Core Configurations", duration: "6 hours", topics: ["Setup", "Configuration", "Integration"], video: true },
    { module: "Module 3", title: "Advanced Concepts & Lab Practice", duration: "8 hours", topics: ["Advanced Topics", "Hands-on Labs", "Best Practices"], video: false },
    { module: "Module 4", title: "Real-world Project Implementation", duration: "6 hours", topics: ["Project Planning", "Implementation", "Deployment"], video: false }
  ];

  // কোর্স ফিচার
  const features = [
    { icon: <FaVideo className="w-4 h-4" />, text: `${course.duration} of Video Content` },
    { icon: <FaInfinity className="w-4 h-4" />, text: "Lifetime Access" },
    { icon: <FaCertificate className="w-4 h-4" />, text: "Certificate of Completion" },
    { icon: <FaUserTie className="w-4 h-4" />, text: "Industry Expert Trainers" },
    { icon: <FaClock className="w-4 h-4" />, text: "24/7 Server Lab Access" },
    { icon: <FaAward className="w-4 h-4" />, text: "Job Assistance Program" }
  ];

  // রিভিউ ডেটা
  const reviews = [
    { id: 1, name: "John Doe", rating: 5, comment: "Excellent course! Very practical and well-structured. The instructor explains complex topics in a simple way.", date: "June 10, 2026", avatar: "JD" },
    { id: 2, name: "Jane Smith", rating: 4.5, comment: "Great content, but could use more real-world examples. Overall, very helpful for career growth.", date: "June 8, 2026", avatar: "JS" },
    { id: 3, name: "Mike Johnson", rating: 5, comment: "This course helped me get my dream job! Highly recommended for anyone looking to advance their career.", date: "June 5, 2026", avatar: "MJ" },
    { id: 4, name: "Sarah Williams", rating: 4, comment: "Good course with excellent material. The projects are very practical and industry-relevant.", date: "June 2, 2026", avatar: "SW" }
  ];

  // অন্যান্য কোর্স (রিলেটেড)
  const relatedCourses = getAllCourses().filter(
    c => c.category === course.category && c.id !== course.id
  ).slice(0, 4);

  // গ্যালারি নেভিগেশন
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
    setIsAutoPlay(false);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsAutoPlay(true);
  };

  // কোয়ান্টিটি কন্ট্রোল
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // কার্টে যোগ করা (Context ব্যবহার)
  const handleAddToCart = () => {
    const cartItem = {
      id: course.id,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      category: course.category,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level
    };
    
    addToCart(cartItem, quantity);
    setIsEnrolled(true);
    setCartMessage(`✅ ${course.title} added to cart! (${quantity} item${quantity > 1 ? 's' : ''})`);
    setTimeout(() => setCartMessage(''), 3000);
  };

  // রেটিং রেন্ডার
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-4 h-4 text-amber-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="w-4 h-4 text-amber-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="w-4 h-4 text-slate-300" />);
    }
    return stars;
  };

  // গড় রেটিং
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* Cart Message Toast */}
      {cartMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-4 sm:px-6 py-3 rounded-xl shadow-2xl animate-slide-in-right flex items-center gap-2 text-sm sm:text-base max-w-[90%] sm:max-w-full">
          <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="truncate">{cartMessage}</span>
        </div>
      )}

      {/* Hero Section with Thumbnail Gallery - Mobile Optimized */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Left - Gallery Carousel (Full width on mobile) */}
            <div className="lg:col-span-3">
              <div className="relative">
                {/* Main Image */}
                <div 
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group bg-slate-800"
                  onClick={() => openLightbox(currentImageIndex)}
                >
                  <img
                    src={galleryImages[currentImageIndex].url}
                    alt={galleryImages[currentImageIndex].title}
                    className="w-full h-[200px] xs:h-[250px] sm:h-[320px] lg:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badge - Mobile Adjusted */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-1 sm:gap-2 flex-wrap">
                    <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-green-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  
                  {/* Overlay - Hide on mobile */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{galleryImages[currentImageIndex].title}</p>
                      <p className="text-xs text-white/70">{galleryImages[currentImageIndex].description}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <FaImages className="inline mr-1" /> Click to enlarge
                    </div>
                  </div>

                  {/* Navigation Arrows - Hide on very small screens */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="hidden sm:flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <IoArrowBack className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="hidden sm:flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <IoArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Image Counter - Mobile Adjusted */}
                  <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/60 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>

                  {/* Auto-Play Indicator - Hide on mobile */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsAutoPlay(!isAutoPlay); }}
                    className="hidden sm:block absolute top-4 right-16 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-black/70 transition"
                  >
                    {isAutoPlay ? '⏸ Pause' : '▶ Play'}
                  </button>
                </div>

                {/* Thumbnails - Horizontal scroll on mobile */}
                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-hide">
                  {galleryImages.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-14 h-11 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-blue-500 shadow-lg shadow-blue-500/30' 
                          : 'border-white/20 hover:border-white/50'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Course Info (Full width on mobile) */}
            <div className="lg:col-span-2 text-white flex flex-col justify-between mt-3 lg:mt-0">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight">
                  {course.title}
                </h1>
                
                {/* Rating - Mobile Optimized */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {renderStars(course.rating || 4.5)}
                  </div>
                  <span className="text-sm text-amber-400 font-bold">{course.rating || 4.5}</span>
                  <span className="text-[10px] sm:text-xs text-slate-400">({reviews.length} reviews)</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 hidden xs:inline">|</span>
                  <span className="text-[10px] sm:text-xs text-slate-400">{course.students} students</span>
                </div>

                <p className="text-slate-300 mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {course.description || `Master ${course.title} with expert instruction and hands-on projects.`}
                </p>
                
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-2 sm:mt-4 text-[10px] sm:text-xs text-slate-300">
                  <span className="flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                    <FaUserGraduate className="w-3 h-3" />
                    <span className="hidden xs:inline">{course.instructor || 'Expert Instructor'}</span>
                    <span className="xs:hidden">{course.instructor?.split(' ')[0] || 'Expert'}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                    <IoTimeOutline className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                    <IoCalendarOutline className="w-3 h-3" />
                    <span className="hidden xs:inline">Updated Jun 2026</span>
                    <span className="xs:hidden">Jun 2026</span>
                  </span>
                </div>
              </div>

              {/* Price & Action Buttons - Mobile Optimized */}
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white">${course.price}</span>
                    <span className="text-xs sm:text-sm text-slate-400 line-through ml-1 sm:ml-2">${course.originalPrice || Math.round(course.price * 1.8)}</span>
                    <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-green-400 font-medium bg-green-500/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                      {Math.round(((course.originalPrice || Math.round(course.price * 1.8)) - course.price) / (course.originalPrice || Math.round(course.price * 1.8)) * 100)}% off
                    </span>
                  </div>
                </div>

                {/* Quantity Selector - Mobile Optimized */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <span className="text-[10px] sm:text-xs text-slate-300">Qty:</span>
                  <div className="flex items-center gap-1 sm:gap-2 bg-white/10 rounded-lg border border-white/20">
                    <button 
                      onClick={decreaseQuantity}
                      className="px-2 sm:px-3 py-1 text-white hover:bg-white/10 transition rounded-l-lg text-sm sm:text-base"
                    >
                      −
                    </button>
                    <span className="w-6 sm:w-8 text-center text-white font-bold text-sm sm:text-base">{quantity}</span>
                    <button 
                      onClick={increaseQuantity}
                      className="px-2 sm:px-3 py-1 text-white hover:bg-white/10 transition rounded-r-lg text-sm sm:text-base"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons - Mobile Stack */}
                <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-xs sm:text-sm"
                  >
                    <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    {inCart ? `Update (${existingQuantity})` : 'Add to Cart'}
                  </button>
                  <Link 
                    to="/checkout" 
                    state={{ course: course, quantity: quantity }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-green-600/30 text-xs sm:text-sm"
                  >
                    <FaCreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                    Buy Now
                  </Link>
                </div>

                {/* Wishlist & Share - Mobile Optimized */}
                <div className="flex gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex-1 font-medium py-1.5 sm:py-2 rounded-xl transition-all text-[10px] sm:text-sm flex items-center justify-center gap-1 sm:gap-2 ${
                      isWishlisted 
                        ? 'bg-red-500/20 border border-red-500 text-red-400' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    {isWishlisted ? <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" /> : <FaRegHeart className="w-3 h-3 sm:w-4 sm:h-4" />}
                    <span className="hidden xs:inline">{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all text-[10px] sm:text-sm border border-white/10 text-white hover:bg-white/10 flex items-center gap-1 sm:gap-2"
                  >
                    <FaShareAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation - Mobile Optimized */}
            <div className="flex flex-wrap gap-0.5 sm:gap-1 border-b border-slate-200 mb-4 sm:mb-6 bg-white rounded-t-xl sm:rounded-t-2xl px-1 sm:px-2 overflow-x-auto">
              {['overview', 'curriculum', 'reviews', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-5 py-2 sm:py-3 text-[11px] sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview Tab - Mobile Optimized */}
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                {/* What You'll Learn */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <IoCheckmarkCircleOutline className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
                    What You'll Learn
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 p-1.5 sm:p-2 rounded-lg hover:bg-slate-50 transition">
                        <span className="text-blue-600 text-sm sm:text-base">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Description - Mobile Optimized */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Course Description</h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {course.description || `This comprehensive ${course.title} course is designed to equip you with the skills and knowledge needed to excel in the industry.`}
                  </p>
                  <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-xl">
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">{course.duration}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">Video</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-xl">
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">{course.students}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">Students</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-xl">
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">4.5</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">Rating</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-xl">
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">100%</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">Satisfaction</p>
                    </div>
                  </div>
                </div>

                {/* Requirements - Mobile Optimized */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Requirements</h2>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <IoCheckmarkCircleOutline className="text-blue-500 mt-0.5 shrink-0" size={16} />
                      <span>Basic understanding of {course.category} concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IoCheckmarkCircleOutline className="text-blue-500 mt-0.5 shrink-0" size={16} />
                      <span>Computer with internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IoCheckmarkCircleOutline className="text-blue-500 mt-0.5 shrink-0" size={16} />
                      <span>Willingness to learn and practice</span>
                    </li>
                  </ul>
                </div>

                {/* Instructor Info - Mobile Optimized */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Your Instructor</h2>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {course.instructor?.charAt(0) || 'E'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-lg">{course.instructor || 'Expert Instructor'}</h4>
                      <p className="text-[10px] sm:text-sm text-slate-500">Industry Expert • 10+ Years</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1 text-[10px] sm:text-sm">
                        <span className="flex items-center gap-0.5 sm:gap-1 text-amber-400">
                          <FaStar className="w-3 h-3 sm:w-4 sm:h-4" /> 4.9
                        </span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-600">5,000+ Students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum Tab - Mobile Optimized */}
            {activeTab === 'curriculum' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-xl font-bold">Course Curriculum</h2>
                  <span className="text-[10px] sm:text-sm text-slate-500">4 modules • 24 hours</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {syllabus.map((module, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-3 sm:p-4 hover:border-blue-300 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{module.title}</h4>
                            <p className="text-[10px] sm:text-xs text-slate-500">{module.duration} • {module.topics.length} topics</p>
                          </div>
                        </div>
                        {module.video ? (
                          <GoVideo className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <RxVideo className="text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      <div className="mt-2 sm:mt-3 pl-8 sm:pl-11">
                        {module.topics.map((topic, tIdx) => (
                          <p key={tIdx} className="text-[10px] sm:text-sm text-slate-600 flex items-center gap-2 py-0.5 sm:py-1">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full"></span>
                            {topic}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab - Mobile Optimized */}
            {activeTab === 'reviews' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-xl font-bold">Student Reviews</h2>
                  <span className="text-[10px] sm:text-sm text-slate-500">{reviews.length} reviews</span>
                </div>

                {/* Rating Summary - Mobile Optimized */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-slate-50 rounded-xl mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-black text-blue-600">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-1 justify-center">
                      {renderStars(averageRating)}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Course Rating</div>
                  </div>
                  <div className="flex-1 min-w-[120px] space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter(r => Math.round(r.rating) === star).length;
                      const percentage = (count / reviews.length) * 100;
                      return (
                        <div key={star} className="flex items-center gap-1 sm:gap-2">
                          <span className="text-[10px] sm:text-xs text-slate-500 w-5 sm:w-6">{star}★</span>
                          <div className="flex-1 h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-[10px] sm:text-xs text-slate-500 w-6 sm:w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-100 last:border-0 pb-4 sm:pb-6 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                            {review.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{review.name}</h4>
                            <p className="text-[10px] sm:text-xs text-slate-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Tab - Mobile Optimized */}
            {activeTab === 'faq' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { q: "Is this course suitable for beginners?", a: "Yes! This course is designed for all levels, from beginners to experienced professionals." },
                    { q: "Will I receive a certificate?", a: "Yes, you'll receive a verified certificate of completion." },
                    { q: "How long do I have access?", a: "You'll have lifetime access to all course materials." },
                    { q: "What is the refund policy?", a: "We offer a 30-day money-back guarantee." },
                    { q: "Can I access on mobile?", a: "Yes! The course is fully responsive on all devices." }
                  ].map((faq, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0 pb-3 sm:pb-4 last:pb-0">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-600 font-bold">Q.</span>
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-[10px] sm:text-sm text-slate-600 mt-0.5 sm:mt-1 pl-5 sm:pl-6">
                        <span className="text-blue-600 font-bold">A.</span> {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Mobile Hidden (shows as bottom section) */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Course Stats */}
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                ${course.price} <span className="text-sm font-medium text-slate-400 line-through">${course.originalPrice || Math.round(course.price * 1.8)}</span>
              </div>
              
              <div className="space-y-2 sm:space-y-3 my-4 sm:my-6 text-[10px] sm:text-sm text-slate-600">
                <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <IoTimeOutline size={14} className="text-blue-600" /> 
                    Duration
                  </span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <IoCalendarOutline size={14} className="text-blue-600" /> 
                    Schedule
                  </span>
                  <span className="font-medium">Flexible</span>
                </div>
                <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <IoWalletOutline size={14} className="text-blue-600" /> 
                    Lab Access
                  </span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex items-center justify-between py-1.5 sm:py-2">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <IoPeopleOutline size={14} className="text-blue-600" /> 
                    Students
                  </span>
                  <span className="font-medium">{course.students}</span>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2">
                <Link 
                  to="/checkout" 
                  state={{ course: course, quantity: quantity }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2.5 sm:py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-green-600/30 text-xs sm:text-sm"
                >
                  <FaCreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                  Buy Now
                </Link>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2.5 sm:py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-xs sm:text-sm"
                >
                  <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  Add
                </button>
              </div>

              <div className="mt-3 sm:mt-4 p-2.5 sm:p-4 bg-blue-50 rounded-xl">
                <p className="text-[10px] sm:text-xs text-blue-800 text-center flex items-center justify-center gap-1.5 sm:gap-2">
                  <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Join {course.students} students worldwide
                </p>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <IoChatbubbleOutline className="w-3 h-3 sm:w-4 sm:h-4" />
                  24/7 Support
                </span>
                <span className="hidden xs:inline w-px h-3 sm:h-4 bg-slate-200"></span>
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <IoCheckmarkCircleOutline className="w-3 h-3 sm:w-4 sm:h-4" />
                  Certificate
                </span>
                <span className="hidden xs:inline w-px h-3 sm:h-4 bg-slate-200"></span>
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                  Lifetime
                </span>
              </div>
            </div>

            {/* Related Courses - Mobile Optimized */}
            {relatedCourses.length > 0 && (
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Related Courses</h3>
                <div className="space-y-2 sm:space-y-3">
                  {relatedCourses.map((related) => (
                    <Link 
                      key={related.id}
                      to={`/course/${related.title.toLowerCase().replace(/ /g, '-')}`}
                      className="block p-2 sm:p-3 rounded-xl hover:bg-slate-50 transition border border-slate-100 hover:border-blue-300 group"
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <img 
                          src={related.image || 'https://picsum.photos/seed/related/80/80'} 
                          alt={related.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-[10px] sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                            <span className="text-[8px] sm:text-xs text-slate-500">{related.category}</span>
                            <span className="text-[8px] sm:text-xs text-amber-400">★ {related.rating}</span>
                          </div>
                          <p className="text-[10px] sm:text-xs font-bold text-blue-600 mt-0.5 sm:mt-1">${related.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Course - Mobile Hidden */}
            <div className="hidden sm:block bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Share this Course</h3>
              <div className="flex gap-3">
                <button className="flex-1 py-2 px-3 bg-[#1877f2] text-white text-xs font-medium rounded-lg hover:opacity-80 transition flex items-center justify-center gap-2">
                  <FaFacebook className="w-4 h-4" />
                  Facebook
                </button>
                <button className="flex-1 py-2 px-3 bg-[#1da1f2] text-white text-xs font-medium rounded-lg hover:opacity-80 transition flex items-center justify-center gap-2">
                  <FaTwitter className="w-4 h-4" />
                  Twitter
                </button>
                <button className="flex-1 py-2 px-3 bg-[#0a66c2] text-white text-xs font-medium rounded-lg hover:opacity-80 transition flex items-center justify-center gap-2">
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal - Mobile Optimized */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 text-white hover:text-slate-300 transition p-1.5 sm:p-2"
          >
            <IoCloseOutline className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-1 sm:left-4 z-10 text-white hover:text-slate-300 transition p-1.5 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <IoArrowBack className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-1 sm:right-4 z-10 text-white hover:text-slate-300 transition p-1.5 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <IoArrowForward className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          
          <div 
            className="relative max-w-5xl w-full bg-black/50 rounded-xl sm:rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[60vh] sm:max-h-[80vh] object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <h3 className="text-white text-sm sm:text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-slate-300 text-[10px] sm:text-sm mt-0.5 sm:mt-1">{selectedImage.description}</p>
              <p className="text-slate-400 text-[8px] sm:text-xs mt-1 sm:mt-2">
                {currentImageIndex + 1} of {galleryImages.length} • {course.title}
              </p>
            </div>
          </div>
          
          {/* Thumbnail Navigation - Hide on very small screens */}
          <div className="hidden xs:flex absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 gap-1.5 sm:gap-2 overflow-x-auto max-w-[80%] px-3 sm:px-4 py-1.5 sm:py-2 bg-black/50 rounded-xl backdrop-blur-sm">
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); setSelectedImage(img); }}
                className={`w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition ${
                  index === currentImageIndex ? 'border-blue-500' : 'border-transparent hover:border-white/50'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal - Mobile Optimized */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full mx-2 sm:mx-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-xl font-bold text-slate-900">Share this Course</h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <IoCloseOutline className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button className="p-2 sm:p-3 bg-[#1877f2] text-white rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-80 transition text-xs sm:text-sm">
                <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" /> Facebook
              </button>
              <button className="p-2 sm:p-3 bg-[#1da1f2] text-white rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-80 transition text-xs sm:text-sm">
                <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" /> Twitter
              </button>
              <button className="p-2 sm:p-3 bg-[#0a66c2] text-white rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-80 transition text-xs sm:text-sm">
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" /> LinkedIn
              </button>
              <button className="p-2 sm:p-3 bg-[#25d366] text-white rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-80 transition text-xs sm:text-sm">
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" /> WhatsApp
              </button>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-slate-50 rounded-lg">
                <input 
                  type="text" 
                  value={window.location.href} 
                  className="flex-1 bg-transparent text-[10px] sm:text-sm text-slate-600 outline-none truncate"
                  readOnly
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowShareModal(false);
                  }}
                  className="text-blue-600 font-medium text-[10px] sm:text-sm px-2 sm:px-3 py-1"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
});

export default CourseDetails;