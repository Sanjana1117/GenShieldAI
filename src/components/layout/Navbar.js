import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm backdrop-blur-sm bg-white/90 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#a5a58d]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="ml-2 text-xl font-bold text-[#3b413c]">GenShield</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/' 
                  ? 'border-[#a5a58d] text-[#3b413c]' 
                  : 'border-transparent text-[#6b705c] hover:border-[#ddbea9] hover:text-[#3b413c]'
              }`}>
                Home
              </Link>
              
              {currentUser && (
                <>
                  <Link href="/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    router.pathname === '/dashboard' 
                      ? 'border-[#a5a58d] text-[#3b413c]' 
                      : 'border-transparent text-[#6b705c] hover:border-[#ddbea9] hover:text-[#3b413c]'
                  }`}>
                    Dashboard
                  </Link>
                  <Link href="/upload" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    router.pathname === '/upload' 
                      ? 'border-[#a5a58d] text-[#3b413c]' 
                      : 'border-transparent text-[#6b705c] hover:border-[#ddbea9] hover:text-[#3b413c]'
                  }`}>
                    Upload
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="px-3 py-1 rounded-full bg-[#f7f7f7] text-sm text-[#6b705c]">
                  {currentUser.email}
                </div>
                <Button 
                  onClick={handleLogout}
                  className="bg-white hover:bg-[#ffe8d6] text-[#6b705c] border border-[#ddbea9] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium text-[#6b705c] hover:text-[#3b413c] transition-colors duration-200">
                  Sign in
                </Link>
                <Link href="/register">
                  <Button className="bg-[#a5a58d] hover:bg-[#6b705c] text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#6b705c] hover:text-[#3b413c] hover:bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a5a58d] transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg rounded-b-xl overflow-hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
              router.pathname === '/' 
                ? 'bg-[#f8f9fa] border-[#a5a58d] text-[#3b413c]' 
                : 'border-transparent text-[#6b705c] hover:bg-[#f8f9fa] hover:border-[#ddbea9] hover:text-[#3b413c]'
            }`}>
              Home
            </Link>
            
            {currentUser && (
              <>
                <Link href="/dashboard" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  router.pathname === '/dashboard' 
                    ? 'bg-[#f8f9fa] border-[#a5a58d] text-[#3b413c]' 
                    : 'border-transparent text-[#6b705c] hover:bg-[#f8f9fa] hover:border-[#ddbea9] hover:text-[#3b413c]'
                }`}>
                  Dashboard
                </Link>
                <Link href="/upload" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  router.pathname === '/upload' 
                    ? 'bg-[#f8f9fa] border-[#a5a58d] text-[#3b413c]' 
                    : 'border-transparent text-[#6b705c] hover:bg-[#f8f9fa] hover:border-[#ddbea9] hover:text-[#3b413c]'
                }`}>
                  Upload
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-[#e9ecef]">
            {currentUser ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-[#f8f9fa] mx-2 rounded-lg">
                  <p className="text-sm font-medium text-[#6b705c]">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-[#6b705c] hover:bg-[#ffe8d6] transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-3 px-4 py-2">
                <Link href="/login" className="block text-base font-medium text-[#6b705c] hover:text-[#3b413c] transition-colors duration-200">
                  Sign in
                </Link>
                <Link href="/register" className="block text-base font-medium text-[#a5a58d] hover:text-[#6b705c] transition-colors duration-200 mt-1">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
