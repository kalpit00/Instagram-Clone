package com.example.instagramclone.service;

import com.example.instagramclone.dto.PostDTO;
import com.example.instagramclone.dto.UserDTO;
import com.example.instagramclone.model.Post;
import com.example.instagramclone.model.User;
import com.example.instagramclone.repository.LikeRepository;
import com.example.instagramclone.repository.PostRepository;
import com.example.instagramclone.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
    }

    public List<PostDTO> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(post -> convertToDTO(post, 1L)) // Using dummy userId 1 for now
                .collect(Collectors.toList());
    }

    public PostDTO getPostById(Long id, Long currentUserId) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
        return convertToDTO(post, currentUserId);
    }

    public List<PostDTO> getPostsByUserId(Long userId, Long currentUserId) {
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(post -> convertToDTO(post, currentUserId))
                .collect(Collectors.toList());
    }

    public PostDTO createPost(PostDTO postDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Post post = new Post();
        post.setImageUrl(postDTO.getImageUrl());
        post.setCaption(postDTO.getCaption());
        post.setCreatedAt(LocalDateTime.now());
        post.setUser(user);

        Post savedPost = postRepository.save(post);
        return convertToDTO(savedPost, userId);
    }

    public PostDTO updatePost(Long id, PostDTO postDTO, Long userId) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));

        if (!post.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You can only update your own posts");
        }

        post.setCaption(postDTO.getCaption());
        Post updatedPost = postRepository.save(post);
        return convertToDTO(updatedPost, userId);
    }

    public void deletePost(Long id, Long userId) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));

        if (!post.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You can only delete your own posts");
        }

        postRepository.deleteById(id);
    }

    private PostDTO convertToDTO(Post post, Long currentUserId) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setImageUrl(post.getImageUrl());
        postDTO.setCaption(post.getCaption());
        postDTO.setCreatedAt(post.getCreatedAt());

        UserDTO userDTO = new UserDTO();
        userDTO.setId(post.getUser().getId());
        userDTO.setUsername(post.getUser().getUsername());
        userDTO.setFullName(post.getUser().getFullName());
        userDTO.setProfilePicture(post.getUser().getProfilePicture());
        postDTO.setUser(userDTO);

        postDTO.setLikesCount(post.getLikes().size());
        postDTO.setCommentsCount(post.getComments().size());
        postDTO.setLikedByCurrentUser(likeRepository.existsByUserIdAndPostId(currentUserId, post.getId()));
        postDTO.setComments(Collections.emptyList()); // Will be populated by the controller if needed

        return postDTO;
    }
}
