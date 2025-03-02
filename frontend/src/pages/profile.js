import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { getUserById, getPostsByUserId } from '@/utils/api';
import { toast } from 'react-toastify';
import { FaThLarge, FaBookmark, FaUserTag } from 'react-icons/fa';

export default function Profile() {
  // For demo purposes, we're using a fixed user ID (1)
  const userId = 1;
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userResponse = await getUserById(userId);
      setUser(userResponse.data);
      
      const postsResponse = await getPostsByUserId(userId);
      setPosts(postsResponse.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Layout title="Profile">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instagram-purple"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Profile Not Found">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
          <p className="text-gray-500 mb-4">The user you're looking for doesn't exist.</p>
          <Link href="/" className="text-instagram-blue font-semibold">
            Go back to home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${user.username} • Instagram Clone`}>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          {/* Profile Picture */}
          <div className="w-24 h-24 md:w-36 md:h-36 relative rounded-full overflow-hidden mb-4 md:mb-0 md:mr-10 bg-gradient-to-r from-instagram-purple to-instagram-pink p-[3px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image 
                src={user.profilePicture || "https://via.placeholder.com/150"} 
                alt={user.username}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <h1 className="text-xl font-light mb-2 md:mb-0 md:mr-4">{user.username}</h1>
              <button className="bg-gray-100 text-sm font-semibold py-1.5 px-4 rounded">
                Edit Profile
              </button>
            </div>
            
            <div className="flex justify-center md:justify-start space-x-6 mb-4">
              <div>
                <span className="font-semibold">{posts.length}</span> posts
              </div>
              <div>
                <span className="font-semibold">0</span> followers
              </div>
              <div>
                <span className="font-semibold">0</span> following
              </div>
            </div>
            
            <div>
              <h2 className="font-semibold">{user.fullName}</h2>
              {user.bio && <p className="mt-1">{user.bio}</p>}
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex justify-center">
            <button 
              className={`flex items-center px-4 py-3 ${activeTab === 'posts' ? 'border-t border-black text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('posts')}
            >
              <FaThLarge className="mr-1" /> POSTS
            </button>
            <button 
              className={`flex items-center px-4 py-3 ${activeTab === 'saved' ? 'border-t border-black text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('saved')}
            >
              <FaBookmark className="mr-1" /> SAVED
            </button>
            <button 
              className={`flex items-center px-4 py-3 ${activeTab === 'tagged' ? 'border-t border-black text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('tagged')}
            >
              <FaUserTag className="mr-1" /> TAGGED
            </button>
          </div>
        </div>
        
        {/* Posts Grid */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.length > 0 ? (
              posts.map(post => (
                <Link href={`/post/${post.id}`} key={post.id} className="relative aspect-square">
                  <div className="w-full h-full bg-gray-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.caption || "Instagram post"}
                      fill
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 py-10 text-center">
                <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
                <p className="text-gray-500 mb-4">Start capturing and sharing your moments.</p>
                <Link href="/create" className="text-instagram-blue font-semibold">
                  Create your first post
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="col-span-3 py-10 text-center">
            <h2 className="text-xl font-semibold mb-2">No Saved Posts</h2>
            <p className="text-gray-500">When you save posts, they will appear here.</p>
          </div>
        )}
        
        {activeTab === 'tagged' && (
          <div className="col-span-3 py-10 text-center">
            <h2 className="text-xl font-semibold mb-2">No Tagged Posts</h2>
            <p className="text-gray-500">When people tag you in posts, they will appear here.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
