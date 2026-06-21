import { lazy, memo, useState } from "react";
import { Link } from 'react-router-dom';
import { popularCourses, instructors, blogPosts, testimonials } from '../data/coursesData';
import { FaArrowRight, FaCheckCircle, FaAward, FaUsers, FaBookOpen, FaGraduationCap } from "react-icons/fa";
import CourseCard from '../components/ui/CourseCard';
import InstructorCard from '../components/ui/InstructorCard';
import BlogCard from '../components/ui/BlogCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import Newsletter from '../components/common/Newsletter';
import LiveChat from '../components/common/LiveChat';
import heroBg from "./../assets/ai_img.jpg";

const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const Home = memo(() => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(popularCourses.map(c => c.category))];
  
  const filteredCourses = filter === 'All' 
    ? popularCourses 
    : popularCourses.filter(c => c.category === filter);

  // Stats
  const stats = [
    { icon: <FaUsers className="w-6 h-6" />, value: "15,000+", label: "Students Trained" },
    { icon: <FaAward className="w-6 h-6" />, value: "98%", label: "Pass Rate" },
    { icon: <FaGraduationCap className="w-6 h-6" />, value: "50+", label: "Expert Trainers" },
    { icon: <FaBookOpen className="w-6 h-6" />, value: "100+", label: "Courses Offered" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-28 lg:py-40 text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-indigo-950/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              🚀 100% Online Training
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mt-6 leading-tight">
              Get Ready for the Jobs of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Today and Tomorrow!
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-6 max-w-xl font-medium leading-relaxed">
              Empowering minds with AI, Robotics, Data Intelligence and Smart Systems for a smarter tomorrow. Master global on-demand IT skills.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 group">
                Explore Courses <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl font-medium transition-all backdrop-blur-sm">
                View All Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Popular Courses 🎓</h2>
            <p className="text-slate-500 mt-1">Explore our most trending masterclasses</p>
          </div>
          
          {/* Filter Buttons */}
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
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
            View All Courses
          </button>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Meet Our Expert Instructors 👨‍🏫</h2>
            <p className="text-slate-500 mt-2">Learn from industry leaders with years of experience</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">What Our Students Say 👨‍🎓</h2>
            <p className="text-slate-500 mt-2">Real stories from real learners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Latest from Blog 📝</h2>
              <p className="text-slate-500 mt-1">Insights and updates from industry experts</p>
            </div>
            <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <FaArrowRight />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Trust Badges */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <FaCheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-sm font-medium">100% Satisfaction</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaCheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-sm font-medium">Money Back Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaCheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-sm font-medium">Lifetime Access</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaCheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-sm font-medium">Certificate Included</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LiveChat />
    </div>
  );
});

export default Home;