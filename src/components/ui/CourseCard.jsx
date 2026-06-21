import { Link } from 'react-router-dom';
import { FaStar, FaUser, FaClock, FaTag } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {course.level}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
          <FaClock className="inline mr-1" /> {course.duration}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
            <FaStar className="w-4 h-4" />
            {course.rating}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <FaUser className="w-4 h-4" />
            {course.students} Students
          </span>
          <span className="flex items-center gap-1">
            <FaTag className="w-4 h-4" />
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
        </div>
        
        <Link 
          to={`/course/${course.title.toLowerCase().replace(/ /g, '-')}`}
          className="w-full block text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;