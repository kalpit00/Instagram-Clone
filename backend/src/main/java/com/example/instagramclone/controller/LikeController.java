package com.example.instagramclone.controller;

import com.example.instagramclone.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Map<String, Object>> getLikesInfo(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "1") Long userId) {
        Map<String, Object> response = new HashMap<>();
        response.put("count", likeService.getLikesCountByPostId(postId));
        response.put("liked", likeService.isPostLikedByUser(postId, userId));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/post/{postId}/like")
    public ResponseEntity<Void> likePost(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "1") Long userId) {
        likeService.likePost(postId, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/post/{postId}/unlike")
    public ResponseEntity<Void> unlikePost(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "1") Long userId) {
        likeService.unlikePost(postId, userId);
        return ResponseEntity.ok().build();
    }
}
