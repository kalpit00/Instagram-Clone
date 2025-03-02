import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { getPostById, createComment, likePost, unlikePost, deletePost } from '@/utils/api';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark, FaArrowLeft, FaEllipsisH, FaTrash } from 'react-icons/fa';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const fetchPost = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await getPostById(id);
      const postData = response.data;
      
      setPost(postData);
      setLiked(postData.likedByCurrentUser);
      setLikesCount(postData.likesCount);
      setComments(postData.comments || []);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        toast.success('Post deleted successfully');
        router.push('/');
      } catch (error) {
        toast.error('Failed to delete post');
        console.error(error);
      }
    }
    setShowOptions(false);
  };

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id);
        setLikesCount(likesCount - 1);
      } else {
        await likePost(post.id);
        setLikesCount(likesCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      toast.error('Failed to update like');
      console.error(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await createComment(post.id, { content: comment });
      setComments([response.data, ...comments]);
      setComment('');
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Layout title="Loading Post...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instagram-purple"></div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Post Not Found">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">Post Not Found</h2>
          <p className="text-gray-500 mb-4">The post you're looking for doesn't exist.</p>
          <Link href="/" className="text-instagram-blue font-semibold">
            Go back to home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Post by ${post.user.username} • Instagram Clone`}>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm font-semibold mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="md:flex">
            {/* Post Image - Takes full width on mobile, half on desktop */}
            <div className="md:w-1/2 relative aspect-square">
              <Image
                src={post.imageUrl}
                alt={post.caption || "Instagram post"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            
            {/* Post Details - Takes full width on mobile, half on desktop */}
            <div className="md:w-1/2 flex flex-col">
              {/* Post Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 relative rounded-full overflow-hidden mr-3 bg-gradient-to-r from-instagram-purple to-instagram-pink p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image 
                        src={post.user.profilePicture || "https://via.placeholder.com/150"} 
                        alt={post.user.username}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <Link href={`/profile/${post.user.username}`} className="font-semibold text-sm">
                    {post.user.username}
                  </Link>
                </div>
                <div className="relative" ref={optionsRef}>
                  <button className="text-gray-700" onClick={() => setShowOptions(!showOptions)}>
                    <FaEllipsisH />
                  </button>
                  {showOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <button 
                        onClick={handleDeletePost}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FaTrash className="mr-2" /> Delete Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="flex-grow overflow-y-auto p-3 max-h-80">
                {/* Caption as first comment */}
                {post.caption && (
                  <div className="mb-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 relative rounded-full overflow-hidden mr-3">
                        <Image 
                          src={post.user.profilePicture || "https://via.placeholder.com/150"} 
                          alt={post.user.username}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-sm mr-2">{post.user.username}</span>
                        <span className="text-sm">{post.caption}</span>
                        <div className="text-gray-500 text-xs mt-1">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Comments */}
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="mb-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 relative rounded-full overflow-hidden mr-3">
                          <Image 
                            src={comment.user.profilePicture || "https://via.placeholder.com/150"} 
                            alt={comment.user.username}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-sm mr-2">{comment.user.username}</span>
                          <span className="text-sm">{comment.content}</span>
                          <div className="text-gray-500 text-xs mt-1">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
              
              {/* Post Actions */}
              <div className="border-t border-gray-200 p-3">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-4">
                    <button onClick={handleLike} className="text-2xl">
                      {liked ? <FaHeart className="text-instagram-red" /> : <FaRegHeart />}
                    </button>
                    <button className="text-2xl">
                      <FaRegComment />
                    </button>
                  </div>
                  <button className="text-2xl">
                    <FaRegBookmark />
                  </button>
                </div>
                
                {/* Likes Count */}
                <div className="font-semibold text-sm mb-2">
                  {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </div>
                
                {/* Timestamp */}
                <div className="text-gray-500 text-xs uppercase mb-3">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                
                {/* Add Comment */}
                <form onSubmit={handleComment} className="border-t border-gray-200 pt-3">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-grow bg-transparent focus:outline-none text-sm"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className={`text-instagram-blue font-semibold text-sm ${!comment.trim() ? 'opacity-50' : ''}`}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
