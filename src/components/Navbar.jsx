import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white py-4 px-8">
      <nav className="flex justify-between items-center">
        <div className="flex gap-8">
          <Link to="/" className="text-xl font-bold hover:underline">
            Home
          </Link>
          <Link to="/venues" className="text-xl font-bold hover:underline">
            Venues
          </Link>
        </div>
        <div className="flex gap-8">
            <p className="cursor-pointer hover:underline">Sign Up</p>
            <p className="cursor-pointer hover:underline">Login</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
