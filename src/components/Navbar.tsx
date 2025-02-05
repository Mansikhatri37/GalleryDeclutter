import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Grid, Trophy, User } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Camera className="w-6 h-6" />
            PhotoDeclutter
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>Daily</span>
            </Link>
            <Link
              to="/gallery"
              className={`flex items-center gap-1 px-3 py-2 rounded-md ${
                isActive('/gallery') ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
              <span>Gallery</span>
            </Link>
            <Link
              to="/achievements"
              className={`flex items-center gap-1 px-3 py-2 rounded-md ${
                isActive('/achievements') ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>Achievements</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center gap-1 px-3 py-2 rounded-md ${
                isActive('/profile') ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;