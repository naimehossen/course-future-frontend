
// react-icons থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হয়েছে
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { IoCallOutline, IoMailOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* কলাম ১: যোগাযোগ */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <IoCallOutline size={16} className="text-slate-400" /> +91-784 797 5239
            </li>
            <li className="flex items-center gap-2">
              <IoCallOutline size={16} className="text-slate-400" /> +1-307-683-1099
            </li>
            <li className="flex items-center gap-2">
              <IoMailOutline size={16} className="text-slate-400" /> info@cloudfoundation.com
            </li>
          </ul>
          
          {/* সোশ্যাল মিডিয়া আইকন */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition duration-300">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black transition duration-300">
              <FaXTwitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 transition duration-300">
              <FaLinkedinIn size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition duration-300">
              <FaYoutube size={14} />
            </a>
          </div>
        </div>

        {/* কলাম ২: কোম্পানি */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Careers</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Help & Support</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Become an Instructor</a></li>
          </ul>
        </div>

        {/* কলাম ৩: পলিসি */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Terms & Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition duration-200">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Refund Policy</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Rescheduling Policy</a></li>
          </ul>
        </div>

        {/* কলাম ৪: ডিসক্লেইমার */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Disclaimer</h3>
          <p className="text-xs leading-relaxed text-slate-500">
            PMI®, PMP®, CAPM® are trademarks of Project Management Institute, Inc. Oracle, Salesforce, Microsoft Azure, AWS are registered trademarks of their respective owners.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
        <p>Copyright © 2026 . CloudFoundation Software Solutions . All Rights Reserved .</p>
      </div>
    </footer>
  );
};

export default Footer;
