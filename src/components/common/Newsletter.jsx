import { useState } from 'react';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Get the latest updates on new courses, industry trends, and exclusive offers delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="flex-1 relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:bg-white focus:text-slate-900 focus:border-white outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            Subscribe
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        {submitted && (
          <p className="text-green-300 mt-4 font-medium">
            ✅ Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;