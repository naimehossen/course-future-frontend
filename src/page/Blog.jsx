import { lazy, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendar, FaClock, FaArrowRight, FaTag, 
  FaUser, FaSearch, FaBookOpen,
  FaNewspaper
} from 'react-icons/fa';
import { blogPosts } from '../data/coursesData';

const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const Blog = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured post (first one)
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  // Popular topics
  const topics = [
    { name: "Cloud Computing", count: 12, icon: <FaBookOpen /> },
    
    
    { name: "Career Growth", count: 6, icon: <FaUser /> },
    { name: "DevOps", count: 9, icon: <FaNewspaper /> },
    { name: "Security", count: 7, icon: <FaTag /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Our Blog 📝
            </h1>
            <p className="text-slate-300 text-lg mt-4">
              Insights, updates, and expert perspectives on technology, education, and career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-slate-200 bg-white py-6 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none bg-white min-w-[150px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Post */}
            {featuredPost && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group">
                <div className="h-64 lg:h-80 overflow-hidden relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="w-3 h-3" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaTag className="w-3 h-3" />
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                  >
                    Read Full Article <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Other Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-blue-600 text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <FaBookOpen className="text-6xl text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No Articles Found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Topics */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {topics.map((topic, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <span className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-blue-600">
                      {topic.icon}
                      {topic.name}
                    </span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">
                      {topic.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-2xl text-white">
              <h3 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-blue-100 mb-4">Get the latest articles delivered to your inbox.</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:bg-white/20 outline-none transition"
              />
              <button className="w-full mt-3 bg-white text-blue-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 transition">
                Subscribe Now
              </button>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});

export default Blog;