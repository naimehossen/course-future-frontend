import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative">
      <FaQuoteLeft className="text-blue-100 text-4xl absolute top-4 right-6" />
      
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
        />
        <div>
          <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
          <p className="text-sm text-slate-500">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex gap-1 text-amber-400 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4" />
        ))}
      </div>
      
      <p className="text-slate-600 text-sm italic leading-relaxed">
        "{testimonial.comment}"
      </p>
    </div>
  );
};

export default TestimonialCard;