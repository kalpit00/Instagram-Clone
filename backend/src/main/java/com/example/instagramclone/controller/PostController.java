package com.example.instagramclone.controller;

import com.example.instagramclone.dto.PostDTO;
import com.example.instagramclone.service.CommentService;
import com.example.instagramclone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final CommentService commentService;

    @Autowired
    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id, @RequestParam(defaultValue = "1") Long userId) {
        PostDTO post = postService.getPostById(id, userId);
        post.setComments(commentService.getCommentsByPostId(id));
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDTO>> getPostsByUserId(@PathVariable Long userId, @RequestParam(defaultValue = "1") Long currentUserId) {
        return ResponseEntity.ok(postService.getPostsByUserId(userId, currentUserId));
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO, @RequestParam(defaultValue = "1") Long userId) {
        return new ResponseEntity<>(postService.createPost(postDTO, userId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO, @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(postService.updatePost(id, postDTO, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, @RequestParam(defaultValue = "1") Long userId) {
        postService.deletePost(id, userId);
        return ResponseEntity.noContent().build();
    }
}
