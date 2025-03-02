import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { createPost } from '@/utils/api';
import { toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa';

export default function CreatePost() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageUrl) {
      toast.error('Please provide an image URL');
      return;
    }

    try {
      setLoading(true);
      await createPost({ imageUrl, caption });
      toast.success('Post created successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create New Post">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <div className="flex">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          
          {imageUrl && (
            <div className="mb-6 relative aspect-square w-full rounded-md overflow-hidden">
              <img
                src={imageUrl}
                alt="Preview"
                className="object-cover w-full h-full"
                onError={() => {
                  toast.error('Invalid image URL');
                  setImageUrl('');
                }}
              />
            </div>
          )}
          
          {!imageUrl && (
            <div className="mb-6 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-500">
              <FaImage className="text-4xl mb-2" />
              <p>Enter an image URL to preview</p>
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !imageUrl}
              className={`bg-instagram-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                (loading || !imageUrl) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Posting...' : 'Share'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
