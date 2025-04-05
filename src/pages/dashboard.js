import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import ContentGrid from '../components/dashboard/ContentGrid';
import Button from '../components/ui/Button';

export default function Dashboard() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [contents, setContents] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/login');
      return;
    }

    if (currentUser) {
      // This would be an API call to fetch user's content in a real app
      setIsLoading(true);
      setTimeout(() => {
        const mockContents = [
          {
            id: '1',
            title: 'Quarterly Report.pdf',
            type: 'document',
            createdAt: new Date(2023, 8, 12).toISOString(),
            views: 45,
            platforms: ['email', 'slack'],
            thumbnailUrl: '/document-thumbnail',
            fileSize: '2.3 MB',
            status: 'active',
          },
          {
            id: '2',
            title: 'Marketing Campaign.jpg',
            type: 'image',
            createdAt: new Date(2023, 9, 5).toISOString(),
            views: 132,
            platforms: ['instagram', 'facebook'],
            thumbnailUrl: '/image-thumbnail',
            fileSize: '1.1 MB',
            status: 'active',
          },
          {
            id: '3',
            title: 'Product Demo.mp4',
            type: 'video',
            createdAt: new Date(2023, 9, 18).toISOString(),
            views: 78,
            platforms: ['youtube', 'linkedin'],
            thumbnailUrl: '/video-thumbnail',
            fileSize: '14.8 MB',
            status: 'active',
          },
          {
            id: '4',
            title: 'Confidential Memo.pdf',
            type: 'document',
            createdAt: new Date(2023, 7, 30).toISOString(),
            views: 12,
            platforms: ['email'],
            thumbnailUrl: '/document-thumbnail',
            fileSize: '0.5 MB',
            status: 'expired',
          },
        ];
        setContents(mockContents);
        setIsLoading(false);
      }, 1000);
    }
  }, [currentUser, loading, router]);

  const filteredContents = contents.filter(content => {
    if (activeTab === 'all') return true;
    if (activeTab === 'documents') return content.type === 'document';
    if (activeTab === 'images') return content.type === 'image';
    if (activeTab === 'videos') return content.type === 'video';
    if (activeTab === 'expired') return content.status === 'expired';
    return true;
  });

  if (loading || !currentUser) {
    return (
      <Layout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Secure Content</h1>
            <p className="text-gray-600">Manage and track your uploaded content</p>
          </div>
          <Button 
            onClick={() => router.push('/upload')}
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Upload New Content
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button 
                onClick={() => setActiveTab('all')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'all' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'documents' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Documents
              </button>
              <button 
                onClick={() => setActiveTab('images')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'images' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Images
              </button>
              <button 
                onClick={() => setActiveTab('videos')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'videos' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Videos
              </button>
              <button 
                onClick={() => setActiveTab('expired')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'expired' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Expired
              </button>
            </nav>
          </div>

          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredContents.length > 0 ? (
            <ContentGrid contents={filteredContents} />
          ) : (
            <div className="p-8 text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No content found</h3>
              <p className="mt-1 text-gray-600">
                {activeTab === 'all' 
                  ? "You haven't uploaded any content yet." 
                  : `You don't have any ${activeTab} in your library.`}
              </p>
              <Button 
                onClick={() => router.push('/upload')}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Upload Your First File
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Security Analytics</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Views</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {isLoading ? '—' : contents.reduce((sum, content) => sum + content.views, 0)}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Protected Files</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {isLoading ? '—' : contents.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Storage Used</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {isLoading ? '—' : '18.7 MB'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
