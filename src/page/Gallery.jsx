import { lazy, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaPlay, FaTimes, FaArrowLeft, FaArrowRight,
  FaImage, FaVideo, FaCalendar, FaUser, FaHeart, FaRegHeart
} from 'react-icons/fa';
import { getAllCourses } from '../data/coursesData';

const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const Gallery = memo(() => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedItems, setLikedItems] = useState([]);

  const allCourses = getAllCourses();
  
  // গ্যালারি আইটেম তৈরি (প্রতিটি কোর্সের জন্য)
  const galleryItems = allCourses.map((course, index) => ({
    id: course.id,
    title: course.title,
    category: course.category,
    image: course.image || `https://picsum.photos/seed/gallery${index}/600/400`,
    type: index % 3 === 0 ? 'video' : 'image',
    date: `2026-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    instructor: course.instructor || 'Expert Instructor',
    likes: Math.floor(Math.random() * 100) + 20
  }));

  // ফিল্টার ও সার্চ
  const filteredItems = galleryItems.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === 'all' || item.category === filter;
    return matchSearch && matchFilter;
  });

  // ক্যাটাগরি লিস্ট
  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];

  // লাইক টগল
  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-black">Gallery 🖼️</h1>
          <p className="text-slate-300 text-lg mt-2">Explore our events, workshops, and student activities</p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-white/80">{item.category}</p>
                  </div>
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    item.type === 'video' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {item.type === 'video' ? <FaPlay className="inline mr-1 w-3 h-3" /> : <FaImage className="inline mr-1 w-3 h-3" />}
                    {item.type}
                  </span>
                </div>
                
                {/* Like Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                >
                  {likedItems.includes(item.id) ? (
                    <FaHeart className="text-red-500 w-4 h-4" />
                  ) : (
                    <FaRegHeart className="text-slate-600 w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h4>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <FaUser className="w-3 h-3" />
                    {item.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <FaImage className="text-6xl text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No items found</h3>
            <p className="text-slate-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-[60vh] object-contain bg-slate-900"
            />
            
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-slate-900">{selectedImage.title}</h3>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <FaUser className="w-4 h-4" />
                  {selectedImage.instructor}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendar className="w-4 h-4" />
                  {selectedImage.date}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {selectedImage.category}
                </span>
                <button
                  onClick={() => toggleLike(selectedImage.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  {likedItems.includes(selectedImage.id) ? (
                    <FaHeart className="w-4 h-4" />
                  ) : (
                    <FaRegHeart className="w-4 h-4" />
                  )}
                  {selectedImage.likes + (likedItems.includes(selectedImage.id) ? 1 : 0)}
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

export default Gallery;