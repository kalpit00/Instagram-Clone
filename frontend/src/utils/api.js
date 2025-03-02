import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const getUserByUsername = (username) => api.get(`/users/username/${username}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Post APIs
export const getPosts = () => api.get('/posts');
export const getPostById = (id, userId = 1) => api.get(`/posts/${id}?userId=${userId}`);
export const getPostsByUserId = (userId, currentUserId = 1) => api.get(`/posts/user/${userId}?currentUserId=${currentUserId}`);
export const createPost = (postData, userId = 1) => api.post(`/posts?userId=${userId}`, postData);
export const updatePost = (id, postData, userId = 1) => api.put(`/posts/${id}?userId=${userId}`, postData);
export const deletePost = (id, userId = 1) => api.delete(`/posts/${id}?userId=${userId}`);

// Comment APIs
export const getCommentsByPostId = (postId) => api.get(`/comments/post/${postId}`);
export const createComment = (postId, commentData, userId = 1) => api.post(`/comments/post/${postId}?userId=${userId}`, commentData);
export const updateComment = (commentId, commentData, userId = 1) => api.put(`/comments/${commentId}?userId=${userId}`, commentData);
export const deleteComment = (commentId, userId = 1) => api.delete(`/comments/${commentId}?userId=${userId}`);

// Like APIs
export const getLikesInfo = (postId, userId = 1) => api.get(`/likes/post/${postId}?userId=${userId}`);
export const likePost = (postId, userId = 1) => api.post(`/likes/post/${postId}/like?userId=${userId}`);
export const unlikePost = (postId, userId = 1) => api.delete(`/likes/post/${postId}/unlike?userId=${userId}`);

export default api;
