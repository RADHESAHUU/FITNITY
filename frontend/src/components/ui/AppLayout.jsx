import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Home, Activity, User, Brain, Pizza, Crown, LogOut } from 'lucide-react';

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-white/10 text-white' 
          : 'text-white/60 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const AppLayout = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for post-login redirect
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If user is on login/signup pages while authenticated, redirect to dashboard
  if (['/login', '/signup', '/forgot-password'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <nav className="w-64 bg-card-bg p-4 space-y-2">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Fitinity</h1>
        </div>
        
        <NavLink to="/dashboard" icon={Home} label="Dashboard" />
        <NavLink to="/track" icon={Activity} label="Track Progress" />
        <NavLink to="/yoga" icon={Activity} label="Yoga" />
        <NavLink to="/nutrition" icon={Pizza} label="Nutrition" />
        <NavLink to="/assistant" icon={Brain} label="AI Assistant" />
        <NavLink to="/premium" icon={Crown} label="Premium" />
        <NavLink to="/account" icon={User} label="Account" />
        
        <button
          onClick={logout}
          className="w-full mt-auto flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;