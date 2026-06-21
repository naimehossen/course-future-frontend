import { FaStar, FaUsers, FaAward } from 'react-icons/fa';

const InstructorCard = ({ instructor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 text-center group">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-100 group-hover:border-blue-500 transition-colors">
        <img 
          src={instructor.image} 
          alt={instructor.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mt-4">{instructor.name}</h3>
      <p className="text-sm text-blue-600 font-medium">{instructor.title}</p>
      
      <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-600">
        <span className="flex items-center gap-1">
          <FaAward className="text-blue-500" />
          {instructor.experience}
        </span>
        <span className="flex items-center gap-1">
          <FaUsers className="text-blue-500" />
          {instructor.students}
        </span>
        <span className="flex items-center gap-1">
          <FaStar className="text-amber-500" />
          {instructor.rating}
        </span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {instructor.specialties.map((spec, idx) => (
          <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
            {spec}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InstructorCard;