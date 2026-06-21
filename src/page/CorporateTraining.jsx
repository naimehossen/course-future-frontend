import { lazy, memo, useState } from 'react';

import { 
  FaBuilding, FaUsers, FaChartLine, FaShieldAlt, 
  FaRocket,  FaArrowRight, FaStar,
  
} from 'react-icons/fa';
import { IoTimeOutline,  } from 'react-icons/io5';
import { programs,testimonialss } from '../data/coursesData.js';
const Navbar = lazy(() => import("../components/layout/Navber"));
const Footer = lazy(() => import("../components/layout/Footer"));

const CorporateTraining = memo(() => {
  const [activeTab, setActiveTab] = useState('all');
  const benefits = [
    { icon: <FaUsers className="w-6 h-6 text-blue-600" />, title: "Team Upskilling", desc: "Train your entire team efficiently" },
    { icon: <FaRocket className="w-6 h-6 text-blue-600" />, title: "Accelerated Growth", desc: "Boost productivity and innovation" },
    { icon: <FaShieldAlt className="w-6 h-6 text-blue-600" />, title: "Risk Management", desc: "Mitigate risks with expert training" },
    { icon: <FaChartLine className="w-6 h-6 text-blue-600" />, title: "ROI Guaranteed", desc: "Measurable business outcomes" }
  ];
  const filteredPrograms = activeTab === 'all' 
    ? programs 
    : programs.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-slate-900 to-blue-800 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm mb-6">
              <FaBuilding className="w-4 h-4" /> Corporate Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Workforce Today
              </span>
            </h1>
            <p className="text-slate-300 text-lg mt-6 max-w-xl leading-relaxed">
              Enterprise-grade training programs designed to upskill your teams and drive business growth.
              Customized solutions for organizations of all sizes.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 group">
                Request a Demo <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl font-medium transition-all backdrop-blur-sm">
                View Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Why Choose Corporate Training?</h2>
            <p className="text-slate-500 mt-2">Empower your teams with industry-leading expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-xl transition-all border border-slate-100">
                <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Our Corporate Programs</h2>
              <p className="text-slate-500 mt-1">Tailored solutions for your organization's needs</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Cloud', 'Security', 'DevOps', 'Data'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    {program.level}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      {program.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <IoTimeOutline className="w-4 h-4" />
                      {program.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{program.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition">
                    Request Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">What Our Corporate Clients Say</h2>
            <p className="text-slate-500 mt-2">Trusted by industry leaders worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialss.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic">"{testimonial.comment}"</p>
                <div className="mt-4">
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-blue-100 mb-8">
            Get a customized corporate training program for your organization today.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2 mx-auto group">
            Schedule a Consultation <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
});

export default CorporateTraining;