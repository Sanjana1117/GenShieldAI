import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuth();

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 z-0">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#ffe8d6] blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#ddbea9] blur-3xl"></div>
          <div className="absolute top-40 right-40 w-60 h-60 rounded-full bg-[#b7b7a4] blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-[#ffe8d6] text-[#6b705c]">
              Secure Content Sharing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3b413c] mb-6 leading-tight">
              Share Your Content Securely with GenShield
            </h1>
            <p className="text-xl text-[#6b705c] mb-8 leading-relaxed">
              A secure platform to upload and share sensitive content using invisible watermarking, 
              platform-restricted access, and digital fingerprinting — preventing unauthorized 
              reposts, leaks, and misuse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {currentUser ? (
                <Button 
                  onClick={() => router.push('/upload')}
                  className="bg-[#a5a58d] hover:bg-[#6b705c] text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Upload Secure Content
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => router.push('/register')}
                    className="bg-[#a5a58d] hover:bg-[#6b705c] text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Get Started
                  </Button>
                  <Button 
                    onClick={() => router.push('/login')}
                    className="bg-white hover:bg-[#ffe8d6] text-[#6b705c] border border-[#a5a58d] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-80 transform hover:scale-105 transition-transform duration-500 shadow-2xl rounded-2xl bg-white/40 backdrop-blur-sm p-4">
              <svg 
                viewBox="0 0 500 400" 
                className="w-full h-full drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="50" y="50" width="400" height="300" rx="15" fill="#f7f7f7" stroke="#a5a58d" strokeWidth="2"/>
                <rect x="80" y="80" width="340" height="240" rx="10" fill="#ffffff" stroke="#a5a58d" strokeWidth="1"/>
                <text x="250" y="200" fontSize="24" fontWeight="bold" fill="#6b705c" textAnchor="middle">
                  Secure Content
                </text>
                <path d="M250,230 L270,250 L230,250 Z" fill="#a5a58d"/>
                <circle cx="400" cy="80" r="15" fill="#a5a58d"/>
                <text x="400" y="85" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">
                  🛡️
                </text>
                <text x="250" y="350" fontSize="14" fill="#6b705c" textAnchor="middle" fontStyle="italic">
                  Shared via GenShield • User123
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-[#f0f0f0] text-[#6b705c]">
              Protection Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b413c]">Enhanced Security Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-[#f0f0f0] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#ffe8d6] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#6b705c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Invisible Watermarking</h3>
              <p className="text-[#6b705c]">
                Every file is embedded with an invisible digital watermark containing user ID, timestamp, and platform tags for enhanced protection.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-[#f0f0f0] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#ddbea9] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#6b705c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Platform Restrictions</h3>
              <p className="text-[#6b705c]">
                Restrict content to specific platforms and control who can access your files with unique access tokens and permissions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-[#f0f0f0] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#b7b7a4] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#6b705c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Digital Fingerprinting</h3>
              <p className="text-[#6b705c]">
                Track who accessed your content with a detailed log of IP addresses, device types, locations, and timestamps.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-20 relative z-10 bg-[#f8f9fa] rounded-3xl mx-4 my-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-[#f0f0f0] text-[#6b705c]">
              Simple Steps
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b413c]">How It Works</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center border-b border-[#e9ecef] pb-10 mb-10 hover:bg-white/50 p-6 rounded-xl transition-all duration-300">
              <div className="flex-shrink-0 bg-[#ffe8d6] rounded-full w-14 h-14 flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-md">
                <span className="text-[#6b705c] font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Upload Your Content</h3>
                <p className="text-[#6b705c]">
                  Log in and upload your files through our secure interface. You can upload images, videos, or documents with our easy-to-use uploader.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center border-b border-[#e9ecef] pb-10 mb-10 hover:bg-white/50 p-6 rounded-xl transition-all duration-300">
              <div className="flex-shrink-0 bg-[#ddbea9] rounded-full w-14 h-14 flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-md">
                <span className="text-[#6b705c] font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Apply Watermarks</h3>
                <p className="text-[#6b705c]">
                  Choose between visible and invisible watermarks. Our system embeds user ID, timestamp, and platform tags to protect your content.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center border-b border-[#e9ecef] pb-10 mb-10 hover:bg-white/50 p-6 rounded-xl transition-all duration-300">
              <div className="flex-shrink-0 bg-[#b7b7a4] rounded-full w-14 h-14 flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-md">
                <span className="text-[#6b705c] font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Set Platform Restrictions</h3>
                <p className="text-[#6b705c]">
                  Specify which platforms your content can be shared on, and generate unique access tokens for viewers with granular permission controls.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center hover:bg-white/50 p-6 rounded-xl transition-all duration-300">
              <div className="flex-shrink-0 bg-[#a5a58d] rounded-full w-14 h-14 flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-md">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#3b413c]">Track and Monitor</h3>
                <p className="text-[#6b705c]">
                  Access your dashboard to see who viewed your content, when, and where. Get detailed reports if any misuse is detected with our advanced analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ddbea9] to-[#a5a58d] opacity-90 z-0"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-[#f8f9fa] rounded-tl-[50%] rounded-tr-[50%] transform translate-y-10 z-0"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#ffe8d6] opacity-20 blur-3xl"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-sm rounded-xl p-10 shadow-xl border border-white/30">
              <div className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-white/30 text-white">
                Get Started Today
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-sm">Ready to Secure Your Content?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Start protecting your sensitive documents, images, and videos today with GenShield's advanced security features.
              </p>
              
              {currentUser ? (
                <Button 
                  onClick={() => router.push('/upload')}
                  className="bg-white hover:bg-[#ffe8d6] text-[#6b705c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 px-8 py-3 text-lg"
                >
                  Upload Now
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => router.push('/register')}
                    className="bg-white hover:bg-[#ffe8d6] text-[#6b705c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 px-8 py-3 text-lg"
                  >
                    Create Free Account
                  </Button>
                  <Button 
                    onClick={() => router.push('/login')}
                    className="bg-transparent hover:bg-white/30 text-white border-2 border-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 px-8 py-3 text-lg"
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
