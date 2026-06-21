import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <FaCalendar className="w-3 h-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {post.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
        
        <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all">
          Read More <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;