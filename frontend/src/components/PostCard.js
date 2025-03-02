import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark, FaEllipsisH, FaTrash } from 'react-icons/fa';
import { likePost, unlikePost, createComment, deletePost } from '@/utils/api';
import { toast } from 'react-toastify';

const PostCard = ({ post, refreshPosts }) => {
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

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

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        toast.success('Post deleted successfully');
        refreshPosts();
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

  return (
    <div className="bg-white border border-gray-200 rounded-md mb-6">
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

      {/* Post Image */}
      <div className="relative aspect-square">
        <Image
          src={post.imageUrl}
          alt={post.caption || "Instagram post"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="text-2xl">
              {liked ? <FaHeart className="text-instagram-red" /> : <FaRegHeart />}
            </button>
            <button onClick={() => setShowComments(!showComments)} className="text-2xl">
              <FaRegComment />
            </button>
          </div>
          <button className="text-2xl">
            <FaRegBookmark />
          </button>
        </div>

        {/* Likes Count */}
        <div className="font-semibold text-sm mb-1">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="mb-2">
            <span className="font-semibold text-sm mr-2">{post.user.username}</span>
            <span className="text-sm">{post.caption}</span>
          </div>
        )}

        {/* Comments */}
        {showComments && comments.length > 0 && (
          <div className="mt-2 mb-3">
            <div className="text-gray-500 text-xs mb-2">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </div>
            {comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="mb-1">
                <span className="font-semibold text-sm mr-2">{comment.user.username}</span>
                <span className="text-sm">{comment.content}</span>
              </div>
            ))}
            {comments.length > 3 && (
              <Link href={`/post/${post.id}`} className="text-gray-500 text-xs">
                View all {comments.length} comments
              </Link>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-gray-500 text-xs uppercase mt-1">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleComment} className="mt-3 border-t border-gray-200 pt-3">
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
  );
};

export default PostCard;
