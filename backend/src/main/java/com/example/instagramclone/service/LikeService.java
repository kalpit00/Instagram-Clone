package com.example.instagramclone.service;

import com.example.instagramclone.model.Like;
import com.example.instagramclone.model.Post;
import com.example.instagramclone.model.User;
import com.example.instagramclone.repository.LikeRepository;
import com.example.instagramclone.repository.PostRepository;
import com.example.instagramclone.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public int getLikesCountByPostId(Long postId) {
        return likeRepository.findByPostId(postId).size();
    }

    public boolean isPostLikedByUser(Long postId, Long userId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }

    @Transactional
    public void likePost(Long postId, Long userId) {
        if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
            return; // Already liked
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Like like = new Like();
        like.setCreatedAt(LocalDateTime.now());
        like.setPost(post);
        like.setUser(user);

        likeRepository.save(like);
    }

    @Transactional
    public void unlikePost(Long postId, Long userId) {
        if (!likeRepository.existsByUserIdAndPostId(userId, postId)) {
            return; // Not liked yet
        }

        likeRepository.deleteByUserIdAndPostId(userId, postId);
    }
}
