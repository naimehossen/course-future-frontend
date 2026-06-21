import { lazy, Suspense } from "react";
import { Route, Routes,Link } from "react-router-dom";

const Home = lazy(() => import("./page/Home"));
const AllCourses = lazy(() => import("./page/AllCourses"));
const CourseDetails = lazy(() => import("./page/CourseDetails"));
const CorporateTraining = lazy(() => import("./page/CorporateTraining"));
const Blog = lazy(() => import("./page/Blog"));
const Cart = lazy(() => import("./page/Cart"));
const Gallery = lazy(() => import("./page/Gallery"));
const Checkout = lazy(() => import("./page/Checkout"));
const Login = lazy(() => import("./page/Login"));
const SignUp = lazy(() => import("./page/SignUp"));


const App = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-600 font-bold">Loading...</span>
        </div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/course/:courseName" element={<CourseDetails />} />
        <Route path="/corporate-training" element={<CorporateTraining />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
<Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <h1 className="text-6xl font-black text-slate-300">404</h1>
            <h2 className="text-2xl font-bold text-slate-900 mt-4">Page Not Found</h2>
            <p className="text-slate-500 mt-2">The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Go Home
            </Link>
          </div>
        } />
      </Routes>
    </Suspense>
  );
};

export default App;