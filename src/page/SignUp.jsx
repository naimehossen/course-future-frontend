
import { lazy, memo } from 'react';
import { Link } from 'react-router-dom';
const Navber=lazy(()=>import("./../components/layout/Navber"))
const Footer=lazy(()=>import("./../components/layout/Footer"))

const SignUp = memo(() => {
  return (
    <>  
    <Navber/>
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 w-full max-w-md shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-center text-slate-900">Create Account</h2>
        <form className="space-y-4 mt-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Email Address</label>
            <input type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm">Create Account</button>
        </form>
        <p className="text-xs text-center text-slate-500 mt-6">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link></p>
      </div>
    </div>
    <Footer/>
    </>
  );
});

export default SignUp;
