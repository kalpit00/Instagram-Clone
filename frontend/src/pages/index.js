import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/utils/api';
import { toast } from 'react-toastify';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout title="Instagram Clone - Home">
      <div className="max-w-md mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instagram-purple"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
            <p className="text-gray-500">Start by creating your first post!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} refreshPosts={fetchPosts} />
          ))
        )}
      </div>
    </Layout>
  );
}
