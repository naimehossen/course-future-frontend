import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { megaMenuData } from '../../data/coursesData';
import { HiMiniChevronDown } from "react-icons/hi2";
import { LiaSearchSolid } from "react-icons/lia";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineMenuOpen, MdClose } from "react-icons/md";
import { LuLightbulb } from "react-icons/lu";
import { CiSearch, CiDark } from 'react-icons/ci';
// আপনার ইমপোর্ট সেকশনে এগুলো যোগ করুন:
import coursesData, { blogPosts } from '../../data/coursesData';


const Navbar = () => {
  const [activeTab, setActiveTab] = useState(megaMenuData[0]?.category || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartCount } = useCart(); // Context থেকে cartCount নেওয়া
  
  const navigate = useNavigate();
  const location = useLocation();
// Navbar কম্পোনেন্টের ভেতরে এগুলো বসান:
const [filteredCourses, setFilteredCourses] = useState([]);
const [filteredBlogs, setFilteredBlogs] = useState([]);

// ইনপুটে টাইপ করলে যা ঘটবে
const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim() === "") {
    setFilteredCourses([]);
    setFilteredBlogs([]);
    return;
  }

  // কোর্সের নাম, ক্যাটাগরি বা সাব-ক্যাটাগরি ম্যাচ করছে কিনা চেক করা
  const matchedCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase()) ||
    course.category.toLowerCase().includes(query.toLowerCase()) ||
    course.subCategory.toLowerCase().includes(query.toLowerCase())
  );

  // ব্লগের টাইটেল ম্যাচ করছে কিনা চেক করা
  const matchedBlogs = blogPosts.filter(blog =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  setFilteredCourses(matchedCourses);
  setFilteredBlogs(matchedBlogs);
};

// কোনো কোর্সে ক্লিক করলে মোডাল বন্ধ হবে এবং সেই ইউআরএল-এ নিয়ে যাবে
const handleItemClick = (slug) => {
  setIsSearchOpen(false); // মোডাল বন্ধ হবে
  setSearchQuery("");    // সার্চ ইনপুট খালি হবে
  setFilteredCourses([]);
  setFilteredBlogs([]);
  navigate(`/course/${slug}`); // আপনার রাউট স্ট্রাকচার অনুযায়ী
};

  
  

  // লোকেশন পরিবর্তন হলে মোবাইল মেনু বন্ধ করুন
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  // মোডাল ওপেন থাকলে কিবোর্ড লিসেনার অ্যাড হবে
  if (isSearchOpen) {
    window.addEventListener('keydown', handleKeyDown);
  }

  // কম্পোনেন্ট আনমাউন্ট বা বন্ধ হলে লিসেনার রিমুভ হবে
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [isSearchOpen]);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // অথ বাটন হ্যান্ডলার
  const handleAuthToggle = () => {
    if (location.pathname === "/login") {
      navigate("/signup");
    } else if (location.pathname === "/signup") {
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  // অথ বাটনের টেক্সট ডায়নামিক
  const getAuthButtonText = () => {
    if (location.pathname === "/login") {
      return "Sign Up";
    } else if (location.pathname === "/signup") {
      return "Login";
    } else {
      return "Login";
    }
  };

  // মোবাইল অথ বাটনের টেক্সট
  const getMobileAuthButtonText = () => {
    if (location.pathname === "/login" || location.pathname === "/") {
      return "Sign Up";
    } else if (location.pathname === "/signup") {
      return "Login";
    } else {
      return "Login";
    }
  };

  // সার্চ হ্যান্ডলার
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* বাম অংশ: লোগো ও অল কোর্সেস ডেক্সটপ মেনু */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight hover:text-blue-700 transition-colors"
          >
            CloudFoundation
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {/* ডাইনামিক ড্রপডাউন মেগা মেনু */}
            <div className="relative group py-5">
              <button className="flex items-center gap-1.5 hover:text-blue-600 transition outline-none">
                <LuLightbulb size={16} className="text-blue-500" /> All Courses 
                <HiMiniChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full left-0 hidden group-hover:flex w-[720px] bg-white border border-slate-200 shadow-2xl rounded-xl mt-1 overflow-hidden transition-all duration-300">
                <div className="w-1/3 bg-slate-50 border-r border-slate-200 p-2">
                  {megaMenuData.map((item) => (
                    <button
                      key={item.category}
                      onMouseEnter={() => setActiveTab(item.category)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                        activeTab === item.category 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {item.category}
                    </button>
                  ))}
                </div>
                <div className="w-2/3 p-6 grid grid-cols-2 gap-6 max-h-[400px] overflow-y-auto bg-white">
                  {megaMenuData.find(item => item.category === activeTab)?.subCategories.map((sub, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-xs text-blue-600 uppercase tracking-wider mb-2">{sub.name}</h4>
                      <ul className="space-y-1.5">
                        {sub.courses.map((course, cIdx) => (
                          <li key={cIdx}>
                            <Link 
                              to={`/course/${course.toLowerCase().replace(/ /g, '-')}`}
                              className="text-slate-600 hover:text-blue-600 text-sm font-normal block transition truncate"
                            >
                              {course}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/courses" className="hover:text-blue-600 transition">
              Browse All
            </Link>
            <Link to="/corporate-training" className="hover:text-blue-600 transition">
              Corporate Training
            </Link>
            <Link to="/blog" className="hover:text-blue-600 transition">
              Blog
            </Link>
            <Link to="/gallery" className="hover:text-blue-600 transition">
              Gallery
            </Link>
          </nav>
        </div>

        {/* মাঝের অংশ: সার্চ বার */}

      {/* Search Modal Overlay */}
{/* Search Modal Overlay */}
{isSearchOpen && (
  <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 px-4 bg-slate-900/40 backdrop-blur-sm transition-all">
    
    {/* বাইরে ক্লিক করলে বন্ধ হবে */}
    <div className="absolute inset-0" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); setFilteredCourses([]); }} ></div>

    {/* মূল সার্চ বক্স */}
    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all flex flex-col max-h-[80vh]">
      
      {/* ইনপুট সেকশন */}
      <div className="flex items-center px-4 py-3 border-b border-slate-100 shrink-0">
        <CiSearch size={22} className="text-slate-400 mr-3" />
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange} // টাইপ ট্র্যাকিং ফাংশন
          autoFocus
          placeholder="What do you want to learn?"
          className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 outline-none"
        />

        {/* ক্লোজ বাটন */}
        <button 
          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); setFilteredCourses([]); }}
          className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
        >
          <span className="text-xl font-light px-1">✕</span>
        </button>
      </div>

      {/* সার্চ রেজাল্ট এরিয়া (Dynamic) */}
      <div className="p-4 overflow-y-auto text-sm text-slate-500 flex-1 custom-scrollbar">
        
        {/* কন্ডিশন ১: ইউজার এখনো কিছু টাইপ করেনি */}
        {searchQuery.trim() === "" && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <p className="text-base font-medium text-slate-600 mb-1">Search CloudFoundation</p>
            <p className="text-xs">Type to search courses, blogs, and topics...</p>
          </div>
        )}

        {/* কন্ডিশন ২: টাইপ করেছে কিন্তু কোনো ম্যাচিং ডেটা পাওয়া যায়নি */}
        {searchQuery.trim() !== "" && filteredCourses.length === 0 && filteredBlogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-400 mb-3"></div> {/* ছোট স্পিনার */}
            <p className="text-slate-500 font-medium">No relevant results found for "{searchQuery}"</p>
          </div>
        )}

        {/* কন্ডিশন ৩: কোর্স পাওয়া গেছে */}
        {filteredCourses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Courses ({filteredCourses.length})</h3>
            <div className="space-y-1">
              {filteredCourses.map((course) => {
                // স্লাগ জেনারেট করা (যেমন: Fusion SCM -> fusion-scm)
                const courseSlug = course.title.toLowerCase().replace(/ /g, '-');
                return (
                  <button
                    key={course.id}
                    onClick={() => handleItemClick(courseSlug)}
                    className="w-full text-left flex items-center justify-between p-2.5 hover:bg-blue-50/60 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={course.image} alt={course.title} className="w-10 h-8 rounded-md object-cover bg-slate-100" />
                      <div>
                        <p className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{course.title}</p>
                        <p className="text-xs text-slate-400">{course.category} • {course.subCategory}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                      {course.level}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* কন্ডিশন ৪: ব্লগ পাওয়া গেছে */}
        {filteredBlogs.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Blogs ({filteredBlogs.length})</h3>
            <div className="space-y-1">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog`} // আপনার ব্লগ পেজের রাউট অনুযায়ী
                  onClick={() => setIsSearchOpen(false)}
                  className="block p-2.5 hover:bg-emerald-50/60 rounded-xl transition-all group"
                >
                  <p className="font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">{blog.title}</p>
                  <p className="text-xs text-slate-400">{blog.category} • {blog.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  </div>
)}
        {/* ডান অংশ: শপিং কার্ট ও অ্যাকশন বাটন */}
        <div className="flex items-center gap-3 sm:gap-4">

          <button 
  onClick={() => setIsSearchOpen(true)}
  className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-600"
  aria-label="Open Search"
>
  <CiSearch size={22} />
</button>
          {/* Cart Link with Counter */}
          <Link 
            to="/cart" 
            className="text-slate-600 hover:text-blue-600 relative p-1.5 transition group"
          >
            <CiShoppingCart size={22} />
            
            {/* Cart Counter Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg shadow-blue-600/30 animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
            
            {/* Tooltip on Hover */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
              {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''} in cart` : 'Cart is empty'}
            </span>
          </Link>
          
          {/* ডেস্কটপ অথ বাটন */}
          <div className="hidden sm:flex items-center gap-2">
            {location.pathname !== "/login" && location.pathname !== "/signup" && (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                >
                  Sign Up
                </Link>
              </>
            )}
            
            {location.pathname === "/login" && (
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
              >
                Create Account
              </Link>
            )}
            
            {location.pathname === "/signup" && (
              <Link 
                to="/login" 
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Back to Login
              </Link>
            )}
          </div>

          {/* মোবাইল অথ বাটন */}
          <button 
            className="sm:hidden bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-600/10" 
            onClick={handleAuthToggle}
          >
            {getMobileAuthButtonText()}
          </button>

          {/* মোবাইল স্ক্রিন মেনু টগল বাটন */}
          <button 
            className="lg:hidden text-slate-600 hover:text-blue-600 transition p-1"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MdOutlineMenuOpen size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div className={`absolute top-0 right-0 w-80 sm:w-96 bg-white h-full shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <span className="text-xl font-black text-blue-600">Menu</span>
              <button 
                className="text-slate-500 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="relative mb-6 md:hidden">
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                className="w-full bg-slate-100 border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <LiaSearchSolid className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Categories</span>
                
                <div className="space-y-2">
                  {megaMenuData.map((item, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <button 
                        className="w-full flex items-center justify-between py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 text-left"
                        onClick={() => setOpenMobileSubMenu(openMobileSubMenu === index ? null : index)}
                      >
                        {item.category}
                        <HiMiniChevronDown 
                          size={14} 
                          className={`transition-transform duration-200 ${openMobileSubMenu === index ? "rotate-180" : ""}`} 
                        />
                      </button>
                      
                      <div className={`pl-4 bg-slate-50 space-y-2 transition-all duration-300 overflow-hidden ${openMobileSubMenu === index ? "max-h-96 py-2" : "max-h-0"}`}>
                        {item.subCategories.map((sub, sIdx) => (
                          <div key={sIdx}>
                            <p className="text-xs font-bold text-slate-400 uppercase mt-1">{sub.name}</p>
                            {sub.courses.map((course, cIdx) => (
                              <Link 
                                key={cIdx} 
                                to={`/course/${course.toLowerCase().replace(/ /g, '-')}`}
                                className="block py-1 text-xs text-slate-600 hover:text-blue-600"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {course}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                to="/courses" 
                className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse All Courses
              </Link>
              
              <Link 
                to="/corporate-training" 
                className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Corporate Training
              </Link>
              
              <Link 
                to="/blog" 
                className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link 
                to="/gallery" 
                className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
            </nav>
          </div>

          {/* Mobile Auth Actions */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            {location.pathname !== "/login" && location.pathname !== "/signup" && (
              <>
                <Link 
                  to="/login" 
                  className="w-full block text-center py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full block text-center py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            
            {location.pathname === "/login" && (
              <Link 
                to="/signup" 
                className="w-full block text-center py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create New Account
              </Link>
            )}
            
            {location.pathname === "/signup" && (
              <Link 
                to="/login" 
                className="w-full block text-center py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Back to Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;